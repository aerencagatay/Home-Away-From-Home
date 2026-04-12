/* ============================================
   Main JS — Interactive view navigation
   ============================================ */

// ─── Apps Script Web App URL ───
// After deploying Code.gs, paste the URL here.
// While empty, form submits skip the upload (dev mode).
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzJGHioq1VSdYzX7jxTbLVSdFFIWAG9Lz8ip3_lSSi0RBvC5CDSm0m_PPkso3Tcpq-k/exec';

const GUIDELINES_PDF = 'assets/docs/open-call-guidelines.pdf';

document.addEventListener('DOMContentLoaded', () => {
  let current = 'home';

  // ─── Bios ───
  const bios = {
    'Bethany Landrum': 'Bethany Landrum is a product manager and strategist. With more than seven years of professional experience at Apple, she led AI/ML initiatives in support of the energy grid\'s transition to renewables, helped launch Apple TV+ to over 100 countries, and supported Apple Music\'s early catalog and subscriber growth. Bethany holds a Bachelor\'s degree in Political Economy from UC Berkeley and is pursuing a Master\'s degree in Arts Management at Bocconi.',
    'Caroline Marie Duque': 'Caroline Marie Duque is a cultural heritage professional with over a decade of experience in museum practice, specializing in exhibition development, collections stewardship, and institutional initiatives. She currently serves as Curator for Fine Arts at the National Museum of the Philippines. In 2022, she received the Asian Cultural Council Individual Fellowship Grant and spent six months in the United States working with institutions including the Smithsonian Institution, the Yale Peabody Museum, and the Ellis Island National Museum of Immigration. She is currently pursuing a Master in Arts Management and Administration at SDA Bocconi.',
    'Iona Anastassiadou': 'Iona Anastassiadou holds a BA in Classics from the University of Reading and an MA in Classics from King\'s College London. Her academic interests centre on the reception of the classical world in film, literature, and visual culture, with particular emphasis on feminist reinterpretations. She has contributed to exhibition work through cataloguing, archiving, and digital outreach. She is currently a Master\'s candidate in Arts Management and Administration at SDA Bocconi.',
    'Lara Mercan Şahin': 'Lara Mercan Şahin is an arts and culture professional with experience across performing arts programming, production, and festival operations. She has worked within major cultural institutions in Turkey, including Zorlu Performing Arts Center and the Istanbul Foundation for Culture and Arts (IKSV). She also served as Assistant to the Manager at Sabancı University Performing Arts Center. She is currently a Master\'s candidate in Arts Management and Administration at SDA Bocconi.',
    'Sneha Mahato': 'Sneha is an arts management graduate student at SDA Bocconi in Milan with a background in architecture, strategy, and storytelling. She has worked across consulting, marketing, and design. Beyond her professional work, Sneha is building Maawu, an early-stage venture focused on making Indian art and craft more accessible through curated experiences and sustainable artist partnerships.',
    'Damiano Gulli': 'Bio coming soon.',
    'Dr. Sharon Hecker': 'DR. SHARON HECKER (B.A. Yale University, cum laude; M.A. and Ph.D., University of California, Berkeley) is an art historian, curator, author, educator, and consultant. A leading authority on modern and contemporary Italian art and on Medardo Rosso, she has authored over 30 publications. Dr. Hecker has curated exhibitions at institutions such as the Peggy Guggenheim Collection, Harvard University Art Museums, Pulitzer Arts Foundation, and Nasher Sculpture Center. Her work has been supported by the Getty, Mellon, and Fulbright Foundations. She is Chair of the International Catalogue Raisonné Association (ICRA) and Coordinator of the Expert Witness Pool for the Court of Arbitration for Art (CAfA).',
    'Valentina Kovalishina': 'Bio coming soon.',
    'Lorenzo Perini Natali': 'Bio coming soon.',
    'Paula Trommel': 'Paula Trommel is the Global Head of Risk and Compliance at Hauser & Wirth, with an international career spanning the art market, law, and regulatory governance. She previously held key roles at Christie\'s in London and Milan. Paula also worked at the UK Financial Conduct Authority (FCA) and The Fine Art Group, specialising in anti-money laundering, international sanctions, and financial regulation in the art market. She holds law degrees from both Germany and the United Kingdom, as well as a Master\'s in Arts Management from SDA Bocconi.'
  };

  // ─── Classification options (per v3 spec) ───
  const classifications = [
    'Ceramics', 'Collage', 'Digital / New Media', 'Drawing', 'Film',
    'Installation', 'Mixed Media', 'Painting', 'Performance', 'Photography',
    'Printmaking', 'Sculpture', 'Textile / Fiber Art', 'Video', 'Other'
  ];

  // ─── View navigation ───
  const goldNav = document.getElementById('gold-nav');
  const VALID_VIEWS = new Set([
    'home', 'menu', 'exhibition', 'advisory-board',
    'open-call', 'apply', 'thanks', 'contact'
  ]);

  function showView(id, pushHistory = true) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const target = document.getElementById('view-' + id);
    if (!target) return;
    target.classList.add('active');
    current = id;

    // Hide gold nav on menu view only
    if (goldNav) {
      if (id === 'menu') goldNav.classList.add('is-hidden');
      else goldNav.classList.remove('is-hidden');
    }

    // Reset scroll to top on navigation
    const scroll = target.querySelector('.section-scroll');
    if (scroll) scroll.scrollTop = 0;

    // Push to browser history so the back button returns to the previous view
    if (pushHistory) {
      const hash = id === 'home' ? ' ' : '#' + id;
      try {
        history.pushState({ view: id }, '', hash);
      } catch (_) {}
    }
  }

  // ─── Browser history integration ───
  // Seed the initial state (using the current hash if valid, otherwise 'home')
  const initialHash = (location.hash || '').replace('#', '');
  const initialView = VALID_VIEWS.has(initialHash) ? initialHash : 'home';
  try {
    history.replaceState({ view: initialView }, '', location.hash || ' ');
  } catch (_) {}
  if (initialView !== 'home') {
    showView(initialView, false);
  }

  // Back/forward button → swap views without pushing a new entry
  window.addEventListener('popstate', e => {
    const view = (e.state && e.state.view) || 'home';
    if (VALID_VIEWS.has(view)) {
      // Close bio overlay if it was open
      const overlay = document.getElementById('bio-overlay');
      if (overlay && !overlay.hidden) overlay.hidden = true;
      showView(view, false);
    }
  });

  // Hamburger → menu
  document.getElementById('btn-info')?.addEventListener('click', () => showView('menu'));

  // Gold nav brand → home
  document.getElementById('gold-nav-home')?.addEventListener('click', e => {
    e.preventDefault();
    showView('home');
  });

  // Close button → home
  document.getElementById('btn-close')?.addEventListener('click', () => showView('home'));

  // Menu items → section
  document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
      const target = item.dataset.target;
      if (target) showView(target);
    });
  });

  // data-target buttons (About CTA, OC apply btn, pill cta, etc.)
  document.querySelectorAll('[data-target]').forEach(el => {
    if (el.classList.contains('menu-item')) return;
    el.addEventListener('click', e => {
      e.preventDefault();
      const target = el.dataset.target;
      if (target) showView(target);
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const overlay = document.getElementById('bio-overlay');
      if (overlay && !overlay.hidden) {
        overlay.hidden = true;
        return;
      }
      if (current === 'menu') {
        showView('home');
      } else if (current !== 'home') {
        showView('menu');
      }
    }
  });

  // ─── Bio overlay ───
  function openBio(name, role) {
    const nameEl = document.getElementById('bio-name');
    const roleEl = document.getElementById('bio-role');
    const ruleEl = document.querySelector('.bio-rule');
    nameEl.textContent = name;
    const hasRole = Boolean(role && String(role).trim());
    if (hasRole) {
      roleEl.textContent = role;
      roleEl.hidden = false;
      if (ruleEl) ruleEl.hidden = false;
      nameEl.classList.remove('no-role');
    } else {
      roleEl.textContent = '';
      roleEl.hidden = true;
      if (ruleEl) ruleEl.hidden = true;
      nameEl.classList.add('no-role');
    }
    const bioEl = document.querySelector('.bio-text');
    const text = bios[name] || 'Bio coming soon.';
    bioEl.textContent = text;
    const overlay = document.getElementById('bio-overlay');
    overlay.hidden = false;
    document.getElementById('bio-close')?.focus();
  }

  window.openBio = openBio;

  document.getElementById('bio-close')?.addEventListener('click', () => {
    document.getElementById('bio-overlay').hidden = true;
  });

  document.getElementById('bio-overlay')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) {
      e.currentTarget.hidden = true;
    }
  });

  // ─── Work blocks ───
  let workCount = 0;

  function buildClassificationSelect(index) {
    let html = `<select name="work${index}_classification" required>`;
    html += '<option value="">Select type</option>';
    classifications.forEach(c => { html += `<option value="${c}">${c}</option>`; });
    html += '</select>';
    return html;
  }

  function createWorkBlock(isFirst) {
    workCount++;
    const index = workCount;
    const block = document.createElement('div');
    block.className = 'work-block';
    block.dataset.index = index;

    const removeBtn = isFirst ? '' : '<button type="button" class="work-remove-btn">Remove</button>';

    block.innerHTML = `
      <div class="work-header">
        <div class="work-header-left">
          <span class="work-dot"></span>
          <span class="work-label">Work ${index}</span>
          <span class="work-summary"></span>
        </div>
        <div class="work-header-right">
          ${removeBtn}
          <button type="button" class="work-toggle-btn" aria-label="Toggle">⌃</button>
        </div>
      </div>
      <div class="work-body">
        <div class="form-grid-2">
          <div class="field-wrap">
            <label class="field-label">Title <span class="req">*</span></label>
            <input type="text" name="work${index}_title" required>
            <span class="field-error">This field is required</span>
          </div>
          <div class="field-wrap">
            <label class="field-label">Year <span class="req">*</span></label>
            <input type="text" name="work${index}_year" required>
            <span class="field-error">This field is required</span>
          </div>
        </div>
        <div class="form-grid-2">
          <div class="field-wrap">
            <label class="field-label">Classification <span class="req">*</span></label>
            ${buildClassificationSelect(index)}
            <span class="field-error">This field is required</span>
          </div>
          <div class="field-wrap">
            <label class="field-label">Medium <span class="req">*</span></label>
            <input type="text" name="work${index}_medium" required>
            <span class="field-error">This field is required</span>
          </div>
        </div>
        <div class="form-grid-2">
          <div class="field-wrap">
            <label class="field-label">Dimensions <span class="field-note">in centimetres (cm)</span></label>
            <div class="dims-group">
              <input type="text" name="work${index}_h" placeholder="H">
              <input type="text" name="work${index}_w" placeholder="W">
              <input type="text" name="work${index}_d" placeholder="D">
            </div>
          </div>
          <div class="field-wrap">
            <label class="field-label">Weight <span class="field-note">in kilograms (kg)</span></label>
            <input type="text" name="work${index}_kg">
          </div>
        </div>

        <div class="field-wrap">
          <label class="field-label">Images <span class="req">*</span></label>
          <p class="apply-hint">Up to 4 images · JPG, PNG or TIFF · max 10 MB · min 1500px</p>
          <div class="image-grid" data-work="${index}">
            <div class="image-slot image-slot--empty"><span>+</span></div>
            <div class="image-slot image-slot--empty"><span>+</span></div>
            <div class="image-slot image-slot--empty"><span>+</span></div>
            <div class="image-slot image-slot--empty"><span>+</span></div>
          </div>
          <input type="file" class="image-grid-input" accept="image/jpeg,image/png,image/tiff" multiple hidden data-work="${index}">
          <span class="field-error">At least one image is required</span>
          <button type="button" class="video-toggle-btn" data-work="${index}">+ Add video</button>
          <div class="video-zone" data-work="${index}" hidden>
            <label class="upload-zone video-upload-zone">
              <input type="file" name="work${index}_video" accept="video/mp4" hidden>
              <span class="upload-icon">↑</span>
              <span class="upload-zone-text"><span class="upload-choose">Choose video</span> or drag here</span>
              <span class="upload-hint">MP4 · max 500 MB</span>
            </label>
            <div class="video-file-row" hidden>
              <span class="video-filename"></span>
              <button type="button" class="video-remove-btn">×</button>
            </div>
            <label class="privacy-check" style="margin-top:0.5rem">
              <input type="checkbox" name="work${index}_hasEquipment">
              <span>I will bring my own display equipment (e.g. screen, power cord)</span>
            </label>
          </div>
        </div>

        <div class="field-wrap">
          <label class="field-label">About this work <span class="req">*</span></label>
          <p class="field-hint">What it is and how it connects to the themes of Home Away From Home. Max 200 words. <a href="${GUIDELINES_PDF}" download="Open-Call-Guidelines.pdf" class="plain-link">Download guidelines</a></p>
          <textarea name="work${index}_about" rows="4" required></textarea>
          <span class="field-error">This field is required</span>
        </div>

        <div class="field-wrap">
          <label class="field-label">Installation preferences</label>
          <p class="field-hint">Please share how you'd ideally like your work displayed. Due to the nature of the venue some requests may have limitations, but if you are selected we will work with you to find the best solution.</p>
          <textarea name="work${index}_installation" rows="3"></textarea>
          <label class="privacy-check" style="margin-top:0.5rem">
            <input type="checkbox" class="flexible-check" data-work="${index}">
            <span>I'm flexible, no specific requirements</span>
          </label>
        </div>
      </div>
    `;

    // ─── Image grid ───
    const imageGrid = block.querySelector('.image-grid');
    const imageInput = block.querySelector('.image-grid-input');
    const slots = imageGrid.querySelectorAll('.image-slot');
    const imageFiles = [null, null, null, null];

    slots.forEach((slot, i) => {
      slot.addEventListener('click', () => {
        if (slot.classList.contains('image-slot--empty')) {
          imageInput.dataset.slotIndex = i;
          imageInput.click();
        }
      });
    });

    function consumeImageFiles(fileList, preferredStartSlot) {
      const files = Array.from(fileList).filter(f => /^image\//i.test(f.type));
      if (!files.length) return;

      let startSlot = preferredStartSlot != null
        ? preferredStartSlot
        : parseInt(imageInput.dataset.slotIndex || '0', 10);
      let fileIdx = 0;

      if (fileIdx < files.length && !imageFiles[startSlot]) {
        fillSlot(startSlot, files[fileIdx]);
        fileIdx++;
      }

      for (let i = 0; i < 4 && fileIdx < files.length; i++) {
        if (i === startSlot) continue;
        if (!imageFiles[i]) {
          fillSlot(i, files[fileIdx]);
          fileIdx++;
        }
      }

      imageInput.value = '';
      if (imageFiles.some(Boolean)) {
        const imagesWrap = imageInput.closest('.field-wrap');
        imagesWrap?.classList.remove('has-error');
      }
    }

    imageInput.addEventListener('change', () => {
      const files = Array.from(imageInput.files);
      if (!files.length) return;
      consumeImageFiles(files);
    });

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evName => {
      imageGrid.addEventListener(evName, e => {
        e.preventDefault();
        e.stopPropagation();
      });
    });
    imageGrid.addEventListener('dragenter', () => imageGrid.classList.add('is-dragover'));
    imageGrid.addEventListener('dragover', () => imageGrid.classList.add('is-dragover'));
    imageGrid.addEventListener('dragleave', e => {
      if (!imageGrid.contains(e.relatedTarget)) imageGrid.classList.remove('is-dragover');
    });
    imageGrid.addEventListener('drop', e => {
      imageGrid.classList.remove('is-dragover');
      const fl = e.dataTransfer && e.dataTransfer.files;
      if (fl && fl.length) consumeImageFiles(fl, 0);
    });

    function fillSlot(i, file) {
      imageFiles[i] = file;
      const slot = slots[i];
      slot.classList.remove('image-slot--empty');
      slot.classList.add('image-slot--filled');

      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      img.alt = file.name;

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'image-remove-btn';
      removeBtn.textContent = '×';
      removeBtn.addEventListener('click', e => {
        e.stopPropagation();
        clearSlot(i);
      });

      slot.innerHTML = '';
      slot.appendChild(img);
      slot.appendChild(removeBtn);
    }

    function clearSlot(i) {
      imageFiles[i] = null;
      const slot = slots[i];
      slot.classList.remove('image-slot--filled');
      slot.classList.add('image-slot--empty');
      slot.innerHTML = '<span>+</span>';
    }

    // ─── Video zone toggle ───
    const videoToggle = block.querySelector('.video-toggle-btn');
    const videoZone = block.querySelector('.video-zone');
    const videoInput = videoZone.querySelector('input[type="file"]');
    const videoUploadZone = videoZone.querySelector('.video-upload-zone');
    const videoFileRow = videoZone.querySelector('.video-file-row');
    const videoFilename = videoZone.querySelector('.video-filename');
    const videoRemoveBtn = videoZone.querySelector('.video-remove-btn');

    videoToggle.addEventListener('click', () => {
      const isOpen = !videoZone.hidden;
      if (isOpen) {
        videoZone.hidden = true;
        videoToggle.textContent = '+ Add video';
        videoInput.value = '';
        videoUploadZone.hidden = false;
        videoFileRow.hidden = true;
      } else {
        videoZone.hidden = false;
        videoToggle.textContent = '− Remove video';
      }
    });

    videoInput.addEventListener('change', () => {
      if (videoInput.files.length > 0) {
        videoFilename.textContent = videoInput.files[0].name;
        videoUploadZone.hidden = true;
        videoFileRow.hidden = false;
      }
    });

    videoRemoveBtn.addEventListener('click', () => {
      videoInput.value = '';
      videoUploadZone.hidden = false;
      videoFileRow.hidden = true;
    });

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evName => {
      videoUploadZone.addEventListener(evName, e => {
        e.preventDefault();
        e.stopPropagation();
      });
    });
    videoUploadZone.addEventListener('dragenter', () => videoUploadZone.classList.add('is-dragover'));
    videoUploadZone.addEventListener('dragover', () => videoUploadZone.classList.add('is-dragover'));
    videoUploadZone.addEventListener('dragleave', e => {
      if (!videoUploadZone.contains(e.relatedTarget)) videoUploadZone.classList.remove('is-dragover');
    });
    videoUploadZone.addEventListener('drop', e => {
      videoUploadZone.classList.remove('is-dragover');
      const fl = e.dataTransfer && e.dataTransfer.files;
      if (!fl || !fl.length) return;
      const f = fl[0];
      if (!/^video\//i.test(f.type)) return;
      const dt = new DataTransfer();
      dt.items.add(f);
      videoInput.files = dt.files;
      videoFilename.textContent = f.name;
      videoUploadZone.hidden = true;
      videoFileRow.hidden = false;
    });

    // ─── "I'm flexible" checkbox ───
    const flexCheck = block.querySelector('.flexible-check');
    const installTextarea = block.querySelector(`textarea[name="work${index}_installation"]`);

    flexCheck.addEventListener('change', () => {
      if (flexCheck.checked) {
        installTextarea.value = '';
        installTextarea.disabled = true;
      } else {
        installTextarea.disabled = false;
      }
    });

    // ─── Toggle collapse + summary ───
    block.querySelector('.work-toggle-btn').addEventListener('click', () => {
      const body = block.querySelector('.work-body');
      body.classList.toggle('collapsed');
      updateWorkSummary(block, index);
    });

    // ─── Remove block ───
    const removeEl = block.querySelector('.work-remove-btn');
    if (removeEl) {
      removeEl.addEventListener('click', e => {
        e.stopPropagation();
        block.remove();
        updateAddBtn();
      });
    }

    // Store imageFiles ref for validation + submission
    block._imageFiles = imageFiles;

    // Attach live-error clearing to inputs
    attachLiveValidation(block);

    return block;
  }

  function updateWorkSummary(block, index) {
    const summary = block.querySelector('.work-summary');
    const titleInput = block.querySelector(`input[name="work${index}_title"]`);
    const yearInput = block.querySelector(`input[name="work${index}_year"]`);
    const mediumInput = block.querySelector(`input[name="work${index}_medium"]`);

    const body = block.querySelector('.work-body');
    if (body.classList.contains('collapsed')) {
      const parts = [titleInput?.value, yearInput?.value, mediumInput?.value].filter(Boolean);
      summary.textContent = parts.length ? ' · ' + parts.join(' · ') : '';
    } else {
      summary.textContent = '';
    }
  }

  function updateAddBtn() {
    const btn = document.getElementById('add-work-btn');
    if (!btn) return;
    const count = document.querySelectorAll('.work-block').length;
    if (count >= 3) {
      btn.disabled = true;
      btn.classList.add('is-disabled');
    } else {
      btn.disabled = false;
      btn.classList.remove('is-disabled');
    }
  }

  document.getElementById('add-work-btn')?.addEventListener('click', () => {
    const container = document.getElementById('work-blocks');
    const count = container.querySelectorAll('.work-block').length;
    if (count >= 3) return;
    container.appendChild(createWorkBlock(false));
    updateAddBtn();
  });

  const workContainer = document.getElementById('work-blocks');
  if (workContainer) {
    workContainer.appendChild(createWorkBlock(true));
    updateAddBtn();
  }

  // ─── CV / Portfolio upload feedback + drag-and-drop ───
  function bindUploadZones(root) {
    (root || document).querySelectorAll('.upload-zone').forEach(zone => {
      if (zone.classList.contains('video-upload-zone')) return;
      if (zone.dataset.bound) return;
      zone.dataset.bound = '1';
      const input = zone.querySelector('input[type="file"]');
      const filenameEl = zone.querySelector('.upload-filename');
      const chooseEl = zone.querySelector('.upload-choose');
      if (!input) return;
      input.addEventListener('change', () => {
        if (input.files.length > 0) {
          zone.classList.add('has-file');
          if (filenameEl) filenameEl.textContent = input.files[0].name;
          if (chooseEl) chooseEl.textContent = 'Change file';
          const wrap = zone.closest('.field-wrap');
          wrap?.classList.remove('has-error');
        }
      });

      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evName => {
        zone.addEventListener(evName, e => {
          e.preventDefault();
          e.stopPropagation();
        });
      });
      zone.addEventListener('dragenter', () => zone.classList.add('is-dragover'));
      zone.addEventListener('dragover', () => zone.classList.add('is-dragover'));
      zone.addEventListener('dragleave', e => {
        if (!zone.contains(e.relatedTarget)) zone.classList.remove('is-dragover');
      });
      zone.addEventListener('drop', e => {
        zone.classList.remove('is-dragover');
        const fl = e.dataTransfer && e.dataTransfer.files;
        if (!fl || !fl.length) return;
        const f = fl[0];
        const ext = fileExt(f.name);
        const acc = (input.getAttribute('accept') || '').toLowerCase();
        const ok = acc.split(',').some(a => {
          const t = a.trim();
          if (t === '.pdf') return ext === '.pdf';
          if (t === '.doc') return ext === '.doc';
          if (t === '.docx') return ext === '.docx';
          return false;
        });
        if (!ok) return;
        const dt = new DataTransfer();
        dt.items.add(f);
        input.files = dt.files;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
    });
  }
  bindUploadZones(document);

  // ─── Declaration checkboxes enable submit ───
  const declarationChecks = document.querySelectorAll('.declaration-check');
  const submitBtn = document.getElementById('apply-submit');

  function updateSubmitState() {
    if (!submitBtn) return;
    const allChecked = Array.from(declarationChecks).every(cb => cb.checked);
    submitBtn.disabled = !allChecked;
  }

  declarationChecks.forEach(cb => {
    cb.addEventListener('change', updateSubmitState);
  });

  // ─── Live validation: clear errors as the user types ───
  function attachLiveValidation(root) {
    (root || document).querySelectorAll('input, textarea, select').forEach(el => {
      if (el.dataset.liveBound) return;
      el.dataset.liveBound = '1';
      const clear = () => {
        const wrap = el.closest('.field-wrap');
        if (!wrap) return;
        if (el.value && el.value.trim() !== '') {
          wrap.classList.remove('has-error');
        }
      };
      el.addEventListener('input', clear);
      el.addEventListener('change', clear);
    });
  }
  attachLiveValidation(document);

  // ─── Form validation on submit ───
  function validateForm(form) {
    const errors = [];

    // Clear previous errors
    form.querySelectorAll('.field-wrap.has-error').forEach(w => w.classList.remove('has-error'));

    // Validate required inputs/textareas/selects
    form.querySelectorAll('input[required], textarea[required], select[required]').forEach(el => {
      // Skip disabled
      if (el.disabled) return;
      const wrap = el.closest('.field-wrap');
      if (!wrap) return;
      const val = (el.value || '').trim();
      if (!val) {
        wrap.classList.add('has-error');
        errors.push(wrap);
      }
    });

    // Validate portfolio (required file)
    const portfolioInput = form.querySelector('input[name="portfolio"]');
    if (portfolioInput && portfolioInput.files.length === 0) {
      const wrap = portfolioInput.closest('.field-wrap');
      if (wrap) {
        wrap.classList.add('has-error');
        errors.push(wrap);
      }
    }

    // Validate work blocks — each must have at least one image
    form.querySelectorAll('.work-block').forEach(block => {
      const images = block._imageFiles || [];
      if (!images.some(Boolean)) {
        const imgWrap = block.querySelector('.image-grid')?.closest('.field-wrap');
        if (imgWrap) {
          imgWrap.classList.add('has-error');
          errors.push(imgWrap);
        }
      }
    });

    if (errors.length > 0) {
      // Scroll first error into view
      const scrollContainer = form.closest('.section-scroll');
      const first = errors[0];
      if (first && scrollContainer) {
        const firstRect = first.getBoundingClientRect();
        const contRect = scrollContainer.getBoundingClientRect();
        scrollContainer.scrollTop += firstRect.top - contRect.top - 80;
      }
      // Focus the first invalid input if possible
      const firstInput = first?.querySelector('input, textarea, select');
      firstInput?.focus({ preventScroll: true });
    }

    return errors.length === 0;
  }

  // ─── File helpers ───

  function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          name: file.name,
          mime: file.type,
          base64: reader.result.split(',')[1]
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function fileExt(name) {
    const m = /(\.[a-zA-Z0-9]+)$/.exec(name || '');
    return m ? m[1].toLowerCase() : '';
  }

  function slugify(s) {
    return String(s || 'untitled')
      .toLowerCase().replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '').substring(0, 40) || 'untitled';
  }

  // POST with no-cors to avoid Google's redirect CORS issue.
  // Returns opaque response — we verify success via a GET check.
  async function postToAppsScript(payload) {
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(payload),
      mode: 'no-cors'
    });
    // If we reach here without throwing, request was sent.
    return { ok: true };
  }

  // GET is CORS-friendly on Apps Script — use it to verify finalize.
  async function verifySubmission(tempId, maxAttempts) {
    for (let i = 0; i < maxAttempts; i++) {
      if (i > 0) await new Promise(r => setTimeout(r, 3000));
      try {
        const res = await fetch(APPS_SCRIPT_URL + '?check=' + encodeURIComponent(tempId));
        const data = await res.json();
        if (data.ok) return data;
        if (data.error) throw new Error(data.error);
      } catch (_) { /* retry */ }
    }
    // If verification times out, don't fail — the submission may still be processing
    return { ok: true, unverified: true };
  }

  // ─── Form submission ───

  function showThanksWithConfetti() {
    showView('thanks');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof confetti !== 'function') return;
    requestAnimationFrame(() => {
      confetti({
        particleCount: 110,
        spread: 72,
        origin: { y: 0.62 },
        colors: ['#F1C338', '#f0ece7', '#d4a828', '#ffffff']
      });
      setTimeout(() => {
        confetti({
          particleCount: 55,
          angle: 60,
          spread: 52,
          origin: { x: 0, y: 0.62 },
          colors: ['#F1C338', '#f0ece7']
        });
      }, 130);
      setTimeout(() => {
        confetti({
          particleCount: 55,
          angle: 120,
          spread: 52,
          origin: { x: 1, y: 0.62 },
          colors: ['#F1C338', '#f0ece7']
        });
      }, 260);
    });
  }

  async function submitApplication(form) {
    // Dev mode: skip upload if no URL configured
    if (!APPS_SCRIPT_URL) {
      showThanksWithConfetti();
      return;
    }

    const tempId = 'tmp_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);

    // Collect text fields
    const val = (name) => (form.querySelector('[name="' + name + '"]')?.value || '').trim();
    const data = {
      firstName:    val('firstName'),
      lastName:     val('lastName'),
      artistName:   val('artistName'),
      email:        val('email'),
      phoneCode:    val('phoneCode'),
      phone:        val('phone'),
      instagram:    val('instagram'),
      biography:    val('biography'),
      portfolioUrl: val('portfolioUrl')
    };

    // Collect files to upload: { path, file }
    const uploads = [];

    const portfolio = form.querySelector('[name="portfolio"]')?.files[0];
    if (portfolio) uploads.push({ path: 'portfolio' + fileExt(portfolio.name), file: portfolio });

    const cv = form.querySelector('[name="cv"]')?.files[0];
    if (cv) uploads.push({ path: 'cv' + fileExt(cv.name), file: cv });

    // Work blocks
    const blocks = form.querySelectorAll('.work-block');
    let workNum = 0;
    blocks.forEach(block => {
      workNum++;
      const idx = block.dataset.index;
      const g = (field) => {
        const el = block.querySelector('[name="work' + idx + '_' + field + '"]');
        if (!el) return '';
        return el.type === 'checkbox' ? el.checked : el.value.trim();
      };

      const workData = {
        title:          g('title'),
        year:           g('year'),
        classification: g('classification'),
        medium:         g('medium'),
        h: g('h'), w: g('w'), d: g('d'),
        kg:             g('kg'),
        about:          g('about'),
        installation:   g('installation'),
        hasEquipment:   g('hasEquipment')
      };
      data['work' + workNum] = workData;

      const folder = 'work-0' + workNum + '_' + slugify(workData.title);

      // Images (from _imageFiles array stored on the block element)
      const imgs = (block._imageFiles || []).filter(Boolean);
      imgs.forEach((file, i) => {
        uploads.push({
          path: folder + '/image-' + String(i + 1).padStart(2, '0') + fileExt(file.name),
          file: file
        });
      });

      // Video (optional)
      const vidInput = block.querySelector('input[type="file"][name$="_video"]');
      const vidFile = vidInput?.files[0];
      if (vidFile) {
        uploads.push({ path: folder + '/video' + fileExt(vidFile.name), file: vidFile });
      }
    });

    // ── Upload with progress ──
    const btn = document.getElementById('apply-submit');
    const originalText = btn.textContent;
    btn.disabled = true;

    const total = uploads.length + 1; // +1 for finalize step
    let done = 0;
    const progress = () => { btn.textContent = 'Uploading ' + done + '/' + total + '...'; };
    progress();

    try {
      for (const u of uploads) {
        const f = await readFileAsBase64(u.file);
        const res = await postToAppsScript({
          action: 'upload',
          tempId: tempId,
          path:   u.path,
          name:   f.name,
          mime:   f.mime,
          base64: f.base64
        });
        if (!res.ok) throw new Error(res.error || 'Upload failed');
        done++;
        progress();
      }

      // ── Finalize ──
      btn.textContent = 'Finalizing...';
      await postToAppsScript({
        action: 'finalize',
        tempId: tempId,
        data:   data
      });

      btn.textContent = originalText;
      btn.disabled = false;
      showThanksWithConfetti();
      verifySubmission(tempId, 5).catch(() => {});

    } catch (err) {
      btn.disabled = false;
      btn.textContent = originalText;
      alert(
        'Submission failed: ' + (err.message || err) +
        '\n\nPlease try again. If the problem persists, contact artists@homeawayfromhome.art'
      );
    }
  }

  const applyForm = document.getElementById('apply-form');

  if (applyForm) {
    applyForm.addEventListener('submit', e => {
      e.preventDefault();
      if (!validateForm(applyForm)) return;
      submitApplication(applyForm);
    });
  }

});
