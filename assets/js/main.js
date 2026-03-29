/* ============================================
   Main JS — Interactive view navigation
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  let current = 'home';

  function showView(id) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const target = document.getElementById('view-' + id);
    if (!target) return;
    target.classList.add('active');
    current = id;
    const focusable = target.querySelector('button, a, input, [tabindex]');
    if (focusable) focusable.focus({ preventScroll: true });
  }

  // Hamburger / INFO → menu
  document.getElementById('btn-info')?.addEventListener('click', () => showView('menu'));

  // Close button → home
  document.getElementById('btn-close')?.addEventListener('click', () => showView('home'));

  // Menu items
  document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
      const target = item.dataset.target;
      if (target) showView(target);
    });
  });

  // Back buttons
  document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', () => showView(btn.dataset.back || 'menu'));
  });

  // data-target buttons (accent-link, oc-apply-btn, etc.)
  document.querySelectorAll('[data-target]').forEach(el => {
    if (el.classList.contains('menu-item')) return;
    el.addEventListener('click', () => {
      const t = el.dataset.target;
      if (t) showView(t);
    });
  });

  // Keyboard
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const overlay = document.getElementById('bio-overlay');
      if (overlay && !overlay.hidden) { closeBio(); return; }
      if (current !== 'home' && current !== 'menu') showView('menu');
      else if (current === 'menu') showView('home');
    }
  });

  // ─── Bio Overlay ───
  function openBio(name, role) {
    document.getElementById('bio-name').textContent = name;
    document.getElementById('bio-role').textContent = role;
    const overlay = document.getElementById('bio-overlay');
    overlay.hidden = false;
    document.getElementById('bio-close')?.focus();
  }

  function closeBio() {
    document.getElementById('bio-overlay').hidden = true;
  }

  document.getElementById('bio-close')?.addEventListener('click', closeBio);

  document.querySelectorAll('.contributor-row, .board-member').forEach(el => {
    el.addEventListener('click', () => openBio(el.dataset.bioName, el.dataset.bioRole));
  });

  // ─── Work Blocks ───
  let workCount = 1;
  const MAX_WORKS = 3;
  const worksContainer = document.getElementById('works-container');
  const addWorkBtn = document.getElementById('add-work-btn');

  function createWorkBlock(index) {
    const block = document.createElement('div');
    block.className = 'work-block';
    block.dataset.workIndex = index;
    block.innerHTML = `
      <div class="work-header">
        <div class="work-header-left">
          <span class="work-dot"></span>
          <span class="work-label">Work ${index}</span>
        </div>
        <div class="work-header-right">
          <button type="button" class="work-remove-btn">Remove</button>
          <button type="button" class="work-toggle-btn" aria-label="Toggle">⌃</button>
        </div>
      </div>
      <div class="work-body">
        <label class="image-upload-zone">
          <input type="file" name="work${index}_image" accept="image/*" hidden>
          <span class="image-label">Click to upload image</span>
        </label>
        <div class="form-grid-2">
          <input type="text" name="work${index}_title" placeholder="Title">
          <input type="text" name="work${index}_year" placeholder="Year">
          <input type="text" name="work${index}_medium" placeholder="Medium">
          <select name="work${index}_type">
            <option value="">Type</option>
            <option>Unique work</option>
            <option>Edition</option>
            <option>Performance or durational</option>
            <option>Site-specific</option>
          </select>
        </div>
        <div class="dimensions-row">
          <input type="text" name="work${index}_w" placeholder="W">
          <input type="text" name="work${index}_h" placeholder="H">
          <input type="text" name="work${index}_d" placeholder="D">
          <input type="text" name="work${index}_kg" placeholder="kg">
          <span class="dim-label">cm / kg</span>
        </div>
        <textarea name="work${index}_notes" placeholder="Installation notes" rows="3" class="form-full"></textarea>
      </div>
    `;

    // Toggle collapse on header click
    block.querySelector('.work-header').addEventListener('click', e => {
      if (e.target.classList.contains('work-remove-btn')) return;
      block.classList.toggle('collapsed');
    });

    // Remove block
    block.querySelector('.work-remove-btn').addEventListener('click', () => {
      block.remove();
      workCount--;
      updateWorkUI();
    });

    // Image upload feedback
    const imgInput = block.querySelector('input[type="file"]');
    const imgZone = block.querySelector('.image-upload-zone');
    const imgLabel = block.querySelector('.image-label');
    imgInput.addEventListener('change', () => {
      if (imgInput.files.length > 0) {
        imgZone.classList.add('has-file');
        imgLabel.textContent = imgInput.files[0].name;
      }
    });

    return block;
  }

  function updateWorkUI() {
    const blocks = worksContainer.querySelectorAll('.work-block');
    blocks.forEach(b => {
      b.querySelector('.work-remove-btn').style.display = blocks.length <= 1 ? 'none' : '';
    });
    if (addWorkBtn) addWorkBtn.style.display = workCount >= MAX_WORKS ? 'none' : '';
  }

  if (worksContainer) {
    worksContainer.appendChild(createWorkBlock(1));
    updateWorkUI();

    addWorkBtn?.addEventListener('click', () => {
      if (workCount < MAX_WORKS) {
        workCount++;
        worksContainer.appendChild(createWorkBlock(workCount));
        updateWorkUI();
      }
    });
  }

  // ─── Privacy checkbox ───
  const privacyCheck = document.getElementById('privacy-checkbox');
  const submitBtn = document.getElementById('apply-submit');
  privacyCheck?.addEventListener('change', () => {
    if (submitBtn) submitBtn.disabled = !privacyCheck.checked;
  });

  // ─── Material upload zones feedback ───
  document.querySelectorAll('.upload-zone').forEach(zone => {
    const input = zone.querySelector('input[type="file"]');
    const filenameSpan = zone.querySelector('.upload-filename');
    if (!input) return;
    input.addEventListener('change', () => {
      if (input.files.length > 0) {
        zone.classList.add('has-file');
        if (filenameSpan) filenameSpan.textContent = input.files[0].name;
      }
    });
  });

  // ─── Application Form Submit ───
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwcZAtL1tjVLLLyJbWAv6ElCSE--eqW9mbq_DGHnL9CyNQAzmjuRCUm_Ns2WKYJVqAb/exec';

  const applyForm = document.getElementById('apply-form');
  if (applyForm) {
    applyForm.addEventListener('submit', async e => {
      e.preventDefault();
      if (submitBtn) { submitBtn.textContent = 'Submitting…'; submitBtn.disabled = true; }

      try {
        const data = {};
        for (const [key, value] of new FormData(applyForm).entries()) {
          if (typeof value === 'string') data[key] = value;
        }

        for (const input of applyForm.querySelectorAll('input[type="file"]')) {
          const file = input.files[0];
          if (file) {
            if (file.size > 10 * 1024 * 1024) throw new Error(`${input.name} exceeds 10 MB.`);
            data[input.name] = { name: file.name, type: file.type, data: await toBase64(file) };
          }
        }

        await submitViaForm(SCRIPT_URL, data);
        applyForm.hidden = true;
        document.getElementById('apply-success').hidden = false;

      } catch (err) {
        alert(err.message || 'Something went wrong. Please try again.');
        if (submitBtn) { submitBtn.textContent = 'Submit your work'; submitBtn.disabled = false; }
      }
    });
  }

  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function submitViaForm(url, data) {
    return new Promise(resolve => {
      const iframe = document.createElement('iframe');
      iframe.name = 'submit_iframe_' + Date.now();
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = url;
      form.target = iframe.name;

      const field = document.createElement('input');
      field.type = 'hidden';
      field.name = 'payload';
      field.value = JSON.stringify(data);
      form.appendChild(field);

      document.body.appendChild(form);
      form.submit();

      setTimeout(() => {
        document.body.removeChild(form);
        document.body.removeChild(iframe);
        resolve();
      }, 3000);
    });
  }
});
