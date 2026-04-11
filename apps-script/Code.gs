/* ============================================================
   Home Away From Home 2026 — Submissions Backend
   Google Apps Script  (deploy as Web App)
   ============================================================

   USAGE
   1. Open https://script.google.com with homeawayfromhome.art@gmail.com
   2. Create a new project, paste this entire file into Code.gs
   3. Run  setupDrive()  once  (it will ask for Drive + Sheets permissions)
   4. Deploy > New deployment > Web app
        Execute as: Me
        Who has access: Anyone
   5. Copy the Web App URL, paste it into assets/js/main.js  APPS_SCRIPT_URL
   ============================================================ */

// ─── Configuration ───────────────────────────────────────────
const CONFIG = {
  ROOT_FOLDER:   'Home Away From Home 2026',
  APPS_FOLDER:   '01_Applications',
  SHORT_FOLDER:  '02_Shortlist',
  SELECT_FOLDER: '03_Selected',
  ADMIN_FOLDER:  '04_Admin',
  EXHIB_FOLDER:  '05_Exhibition',
  SHEET_NAME:    '_Master_Applications',
  TEMP_FOLDER:   '_temp',
  ID_PREFIX:     'HAFH-',
  ID_PAD:        4,
  TZ:            'Europe/Rome'
};

const HEADERS = [
  'Submission ID', 'Submitted At', 'Folder',
  'First Name', 'Last Name', 'Artist Name',
  'Email', 'Phone', 'Instagram',
  'Milan Connection', '# Works',
  'Work 1 (Title / Medium / Year)',
  'Work 2 (Title / Medium / Year)',
  'Work 3 (Title / Medium / Year)',
  'Portfolio', 'CV', 'Website',
  'Status', 'Reviewer', 'Notes'
];


/* ============================================================
   1.  ONE-TIME SETUP  —  run this manually once
   ============================================================ */

function setupDrive() {
  // ── Folders ──
  const root = _getOrCreateFolder(DriveApp.getRootFolder(), CONFIG.ROOT_FOLDER);
  const apps = _getOrCreateFolder(root, CONFIG.APPS_FOLDER);
  _getOrCreateFolder(root, CONFIG.SHORT_FOLDER);
  _getOrCreateFolder(root, CONFIG.SELECT_FOLDER);
  _getOrCreateFolder(root, CONFIG.ADMIN_FOLDER);
  _getOrCreateFolder(root, CONFIG.EXHIB_FOLDER);

  // ── Master Sheet ──
  let ss;
  const existing = apps.getFilesByName(CONFIG.SHEET_NAME);
  if (existing.hasNext()) {
    ss = SpreadsheetApp.openById(existing.next().getId());
  } else {
    ss = SpreadsheetApp.create(CONFIG.SHEET_NAME);
    DriveApp.getFileById(ss.getId()).moveTo(apps);
  }

  const sheet = ss.getSheets()[0];
  sheet.setName('Applications');

  // Headers
  if (!sheet.getRange(1, 1).getValue()) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }

  // Formatting
  const hdr = sheet.getRange(1, 1, 1, HEADERS.length);
  hdr.setFontWeight('bold').setBackground('#f3f3f3');
  sheet.setFrozenRows(1);

  // Status dropdown  (column R = index 18)
  const sCol = HEADERS.indexOf('Status') + 1;
  const sRange = sheet.getRange(2, sCol, sheet.getMaxRows() - 1, 1);
  sRange.setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList(['New', 'Under Review', 'Shortlisted', 'Rejected', 'Selected'], true)
      .setAllowInvalid(false)
      .build()
  );

  // Conditional formatting — colour entire row by Status
  const dataRange = sheet.getRange(2, 1, sheet.getMaxRows() - 1, HEADERS.length);
  const colours = {
    'New':          '#e8eaed',
    'Under Review': '#d4e6f1',
    'Shortlisted':  '#fff3cd',
    'Rejected':     '#f8d7da',
    'Selected':     '#d4edda'
  };
  const rules = Object.entries(colours).map(([status, bg]) =>
    SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied('=$' + _colLetter(sCol) + '2="' + status + '"')
      .setBackground(bg)
      .setRanges([dataRange])
      .build()
  );
  sheet.setConditionalFormatRules(rules);

  // Column widths
  const widths = { 'Milan Connection': 400, 'Notes': 300,
    'Work 1 (Title / Medium / Year)': 250,
    'Work 2 (Title / Medium / Year)': 250,
    'Work 3 (Title / Medium / Year)': 250 };
  Object.entries(widths).forEach(([name, w]) => {
    const i = HEADERS.indexOf(name);
    if (i >= 0) sheet.setColumnWidth(i + 1, w);
  });

  // Remove extra columns
  if (sheet.getMaxColumns() > HEADERS.length) {
    sheet.deleteColumns(HEADERS.length + 1, sheet.getMaxColumns() - HEADERS.length);
  }

  Logger.log('Setup complete!');
  Logger.log('Root folder : ' + root.getUrl());
  Logger.log('Master sheet: ' + ss.getUrl());
}


/* ============================================================
   2.  WEB APP ENDPOINTS
   ============================================================ */

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);

    if (body.action === 'upload')   return _json(handleUpload(body));
    if (body.action === 'finalize') return _json(handleFinalize(body));

    return _json({ ok: false, error: 'Unknown action: ' + body.action });
  } catch (err) {
    console.error(err);
    return _json({ ok: false, error: String(err.message || err) });
  }
}

function doGet(e) {
  const p = e ? e.parameter : {};

  // Status check: /exec?check=<tempId>
  if (p.check) {
    try {
      const apps = _getAppsFolder();
      // Look for a folder whose name contains the tempId or the finalized version
      const ss    = _getMasterSheet();
      const sheet = ss.getSheets()[0];
      const last  = sheet.getLastRow();
      if (last >= 2) {
        // Check if the most recent submission came from this temp batch
        // We store tempId in a script property during finalize
        const props = PropertiesService.getScriptProperties();
        const stored = props.getProperty('last_temp_' + p.check);
        if (stored) {
          props.deleteProperty('last_temp_' + p.check);
          return _json({ ok: true, submissionId: stored });
        }
      }
      return _json({ ok: false, status: 'pending' });
    } catch (err) {
      return _json({ ok: false, error: String(err.message || err) });
    }
  }

  return HtmlService.createHtmlOutput(
    'Home Away From Home — submission endpoint — OK'
  );
}


/* ────────────────────────────────────────────────────────────
   handleUpload  —  receives ONE file per call
   payload: { tempId, path, name, mime, base64 }
   ──────────────────────────────────────────────────────────── */

function handleUpload(p) {
  if (!p.tempId || !p.path || !p.base64) {
    return { ok: false, error: 'Missing tempId / path / base64' };
  }

  const apps     = _getAppsFolder();
  const tempRoot = _getOrCreateFolder(apps, CONFIG.TEMP_FOLDER);
  const tempDir  = _getOrCreateFolder(tempRoot, p.tempId);

  // path may contain sub-folders, e.g. "work-01_Untitled/image-01.jpg"
  const parts    = p.path.split('/');
  const fileName = parts.pop();
  let target     = tempDir;
  for (const part of parts) {
    target = _getOrCreateFolder(target, part);
  }

  const bytes = Utilities.base64Decode(p.base64);
  const blob  = Utilities.newBlob(bytes, p.mime || 'application/octet-stream', fileName || p.name);
  target.createFile(blob);

  return { ok: true };
}


/* ────────────────────────────────────────────────────────────
   handleFinalize  —  rename folder, write metadata, append row
   payload: { tempId, data: { firstName, lastName, ... work1, work2, work3 } }
   ──────────────────────────────────────────────────────────── */

function handleFinalize(p) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    const apps     = _getAppsFolder();
    const tempRoot = _getOrCreateFolder(apps, CONFIG.TEMP_FOLDER);
    const iter     = tempRoot.getFoldersByName(p.tempId);
    if (!iter.hasNext()) {
      return { ok: false, error: 'Temp folder not found. Upload files first.' };
    }
    const folder = iter.next();
    const d      = p.data || {};

    // ── Submission ID ──
    const ss    = _getMasterSheet();
    const sheet = ss.getSheets()[0];
    const nextNum = _nextSubmissionNumber(sheet);
    const subId   = CONFIG.ID_PREFIX + String(nextNum).padStart(CONFIG.ID_PAD, '0');

    // ── Timestamps ──
    const now        = new Date();
    const dateStr    = Utilities.formatDate(now, CONFIG.TZ, 'yyyy-MM-dd');
    const timeStr    = Utilities.formatDate(now, CONFIG.TZ, 'HHmm');
    const submitted  = Utilities.formatDate(now, CONFIG.TZ, 'yyyy-MM-dd HH:mm');

    // ── Rename & move folder ──
    const slug = _slugify(d.firstName, d.lastName);
    folder.setName(dateStr + '_' + timeStr + '_' + subId + '_' + slug);
    folder.moveTo(apps);

    // ── Write metadata files ──
    folder.createFile(Utilities.newBlob(
      JSON.stringify(d, null, 2), 'application/json', '00_application.json'
    ));
    folder.createFile(Utilities.newBlob(
      _buildSummary(subId, submitted, d), 'text/plain', '00_application.txt'
    ));

    // ── Build sheet row ──
    const phone = [(d.phoneCode ? '+' + d.phoneCode : ''), d.phone || '']
                    .filter(Boolean).join(' ');

    const works = [];
    for (let i = 1; i <= 3; i++) {
      const w = d['work' + i];
      if (w && w.title) {
        works.push([w.title, w.medium, w.year].filter(Boolean).join(' / '));
      } else {
        works.push('');
      }
    }

    const portfolioFile = _findByRegex(folder, /^portfolio\./i);
    const cvFile        = _findByRegex(folder, /^cv\./i);
    const folderUrl     = folder.getUrl();

    const row = [
      subId,
      submitted,
      '=HYPERLINK("' + folderUrl + '","Open folder")',
      d.firstName  || '',
      d.lastName   || '',
      d.artistName || '',
      d.email      || '',
      phone,
      d.instagram  || '',
      _truncate(d.biography || '', 200),
      works.filter(Boolean).length,
      works[0],
      works[1],
      works[2],
      portfolioFile ? '=HYPERLINK("' + portfolioFile.getUrl() + '","Portfolio")' : '',
      cvFile        ? '=HYPERLINK("' + cvFile.getUrl()        + '","CV")'        : '',
      d.portfolioUrl || '',
      'New',
      '',
      ''
    ];

    sheet.insertRowBefore(2);
    sheet.getRange(2, 1, 1, row.length).setValues([row]);

    // Store tempId → subId mapping so doGet(?check=tempId) can verify
    PropertiesService.getScriptProperties()
      .setProperty('last_temp_' + p.tempId, subId);

    return { ok: true, submissionId: subId, folderUrl: folderUrl };

  } finally {
    lock.releaseLock();
  }
}


/* ============================================================
   3.  CLEANUP  —  delete orphaned temp folders older than 24 h
       Run manually or set a daily time-driven trigger
   ============================================================ */

function cleanupTempFolders() {
  const apps     = _getAppsFolder();
  const tmpIter  = apps.getFoldersByName(CONFIG.TEMP_FOLDER);
  if (!tmpIter.hasNext()) return;
  const tempRoot = tmpIter.next();

  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const folders = tempRoot.getFolders();
  let count = 0;
  while (folders.hasNext()) {
    const f = folders.next();
    if (f.getDateCreated() < cutoff) { f.setTrashed(true); count++; }
  }
  Logger.log('Cleaned up ' + count + ' orphaned temp folder(s).');
}


/* ============================================================
   4.  INTERNAL HELPERS
   ============================================================ */

function _json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function _getOrCreateFolder(parent, name) {
  const it = parent.getFoldersByName(name);
  return it.hasNext() ? it.next() : parent.createFolder(name);
}

function _getAppsFolder() {
  const root = _getOrCreateFolder(DriveApp.getRootFolder(), CONFIG.ROOT_FOLDER);
  return _getOrCreateFolder(root, CONFIG.APPS_FOLDER);
}

function _getMasterSheet() {
  const apps = _getAppsFolder();
  const it   = apps.getFilesByName(CONFIG.SHEET_NAME);
  if (!it.hasNext()) throw new Error('Master sheet not found. Run setupDrive() first.');
  return SpreadsheetApp.openById(it.next().getId());
}

function _nextSubmissionNumber(sheet) {
  const last = sheet.getLastRow();
  if (last < 2) return 1;
  // Row 2 is always the most recent (we insert at 2)
  const val = String(sheet.getRange(2, 1).getValue());
  const num = parseInt(val.replace(CONFIG.ID_PREFIX, ''), 10);
  return (isNaN(num) ? 0 : num) + 1;
}

function _findByRegex(folder, regex) {
  const it = folder.getFiles();
  while (it.hasNext()) {
    const f = it.next();
    if (regex.test(f.getName())) return f;
  }
  return null;
}

function _slugify(first, last) {
  const s = [first, last].filter(Boolean).join('-')
    .replace(/[^a-zA-Z0-9-]/g, '').substring(0, 40);
  return s || 'Anonymous';
}

function _truncate(s, n) {
  s = String(s || '').trim();
  return s.length > n ? s.substring(0, n) + '...' : s;
}

function _colLetter(colNum) {
  let letter = '';
  while (colNum > 0) {
    colNum--;
    letter = String.fromCharCode(65 + (colNum % 26)) + letter;
    colNum = Math.floor(colNum / 26);
  }
  return letter;
}

function _buildSummary(id, submitted, d) {
  const lines = [
    'HOME AWAY FROM HOME 2026 — APPLICATION',
    '='.repeat(50),
    'Submission ID : ' + id,
    'Submitted     : ' + submitted,
    '',
    'ABOUT',
    '-'.repeat(50),
    'Name          : ' + [d.firstName, d.lastName].filter(Boolean).join(' '),
    d.artistName ? 'Artist name   : ' + d.artistName : null,
    'Email         : ' + (d.email || ''),
    'Phone         : ' + (d.phoneCode ? '+' + d.phoneCode + ' ' : '') + (d.phone || ''),
    d.instagram  ? 'Instagram     : ' + d.instagram  : null,
    d.portfolioUrl ? 'Website       : ' + d.portfolioUrl : null,
    '',
    'BIOGRAPHY',
    '-'.repeat(50),
    d.biography || '',
    ''
  ];

  for (let i = 1; i <= 3; i++) {
    const w = d['work' + i];
    if (!w || !w.title) continue;
    lines.push('WORK ' + i, '-'.repeat(50));
    lines.push('Title          : ' + (w.title || ''));
    lines.push('Year           : ' + (w.year || ''));
    lines.push('Classification : ' + (w.classification || ''));
    lines.push('Medium         : ' + (w.medium || ''));
    const dims = [w.h, w.w, w.d].filter(Boolean).join(' x ');
    if (dims) lines.push('Dimensions     : ' + dims + ' cm');
    if (w.kg) lines.push('Weight         : ' + w.kg + ' kg');
    if (w.hasEquipment) lines.push('Own equipment  : YES');
    lines.push('');
    lines.push('About:');
    lines.push(w.about || '');
    if (w.installation) {
      lines.push('');
      lines.push('Installation:');
      lines.push(w.installation);
    }
    lines.push('');
  }

  return lines.filter(l => l !== null).join('\n');
}
