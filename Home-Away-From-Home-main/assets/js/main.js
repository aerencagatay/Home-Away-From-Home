/* ============================================
   Main JS — Interactive view navigation
   ============================================ */

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

  // ─── View navigation ───
  function showView(id) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const target = document.getElementById('view-' + id);
    if (!target) return;
    target.classList.add('active');
    current = id;
    const focusable = target.querySelector('button, a, [tabindex]');
    if (focusable) focusable.focus({ preventScroll: true });
  }

  // INFO button → menu
  document.getElementById('btn-info')?.addEventListener('click', () => showView('menu'));

  // Close button → home
  document.getElementById('btn-close')?.addEventListener('click', () => showView('home'));

  // Menu items → section
  document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
      const target = item.dataset.target;
      if (target) showView(target);
    });
  });

  // Back buttons
  document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const back = btn.dataset.back || 'menu';
      showView(back);
    });
  });

  // data-target buttons (About CTA, OC apply btn, etc.)
  document.querySelectorAll('[data-target]').forEach(el => {
    if (el.classList.contains('menu-item')) return;
    el.addEventListener('click', () => {
      const target = el.dataset.target;
      if (target) showView(target);
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      // Close bio overlay if open
      const overlay = document.getElementById('bio-overlay');
      if (overlay && !overlay.hidden) {
        overlay.hidden = true;
        return;
      }
      if (current !== 'home' && current !== 'menu') {
        showView('menu');
      } else if (current === 'menu') {
        showView('home');
      }
    }
  });

  // ─── Bio overlay ───
  function openBio(name, role) {
    document.getElementById('bio-name').textContent = name;
    document.getElementById('bio-role').textContent = role;
    const bioEl = document.querySelector('.bio-text');
    const text = bios[name] || 'Bio coming soon.';
    bioEl.textContent = text;
    const overlay = document.getElementById('bio-overlay');
    overlay.hidden = false;
    document.getElementById('bio-close')?.focus();
  }

  // Expose globally for inline onclick handlers
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

  function createWorkBlock() {
    workCount++;
    const index = workCount;
    const block = document.createElement('div');
    block.className = 'work-block';
    block.dataset.index = index;

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
        <div class="field-wrap">
          <label class="field-label">Image <span class="req">*</span></label>
          <label class="image-upload-zone">
            <input type="file" name="work${index}_image" accept="image/jpeg,image/png,image/tiff" hidden>
            <span class="upload-icon">↑</span>
            <span class="upload-zone-text"><span class="upload-choose image-label">Choose image</span> or drag here</span>
            <span class="upload-hint">JPG, PNG or TIFF · max 10 MB · min 1500px</span>
          </label>
        </div>
        <div class="form-grid-2">
          <div class="field-wrap">
            <label class="field-label">Title <span class="req">*</span></label>
            <input type="text" name="work${index}_title" placeholder="Work title">
          </div>
          <div class="field-wrap">
            <label class="field-label">Year <span class="req">*</span></label>
            <input type="text" name="work${index}_year" placeholder="2024">
          </div>
          <div class="field-wrap">
            <label class="field-label">Medium <span class="req">*</span></label>
            <input type="text" name="work${index}_medium" placeholder="Oil on canvas, video, steel...">
          </div>
          <div class="field-wrap">
            <label class="field-label">Type</label>
            <select name="work${index}_type">
              <option value="">Select...</option>
              <option>Unique work</option>
              <option>Edition</option>
              <option>Performance or durational</option>
              <option>Site-specific</option>
            </select>
          </div>
        </div>
        <div class="field-wrap">
          <label class="field-label">Dimensions (cm) &amp; weight (kg)</label>
          <div class="dimensions-row">
            <input type="text" name="work${index}_w" placeholder="W">
            <input type="text" name="work${index}_h" placeholder="H">
            <input type="text" name="work${index}_d" placeholder="D">
            <input type="text" name="work${index}_kg" placeholder="kg">
          </div>
        </div>
        <div class="field-wrap">
          <label class="field-label">Installation requirements</label>
          <textarea name="work${index}_notes" placeholder="Wall mount, plinth, power, darkened room, sound..." rows="3"></textarea>
        </div>
      </div>
    `;

    // Image upload feedback
    const imgInput = block.querySelector('input[type="file"]');
    const imgZone = block.querySelector('.image-upload-zone');
    const imgLabel = block.querySelector('.image-label');
    imgInput.addEventListener('change', () => {
      if (imgInput.files.length > 0) {
        imgZone.classList.add('has-file');
        if (imgLabel) imgLabel.textContent = imgInput.files[0].name;
      }
    });

    // Toggle collapse
    block.querySelector('.work-toggle-btn').addEventListener('click', () => {
      const body = block.querySelector('.work-body');
      body.classList.toggle('collapsed');
    });

    // Remove block
    block.querySelector('.work-remove-btn').addEventListener('click', () => {
      block.remove();
      updateAddBtn();
    });

    return block;
  }

  function updateAddBtn() {
    const btn = document.getElementById('add-work-btn');
    if (!btn) return;
    const count = document.querySelectorAll('.work-block').length;
    btn.style.display = count >= 3 ? 'none' : '';
  }

  document.getElementById('add-work-btn')?.addEventListener('click', () => {
    const container = document.getElementById('work-blocks');
    const count = container.querySelectorAll('.work-block').length;
    if (count >= 3) return;
    container.appendChild(createWorkBlock());
    updateAddBtn();
  });

  // Add first work block on page load
  const workContainer = document.getElementById('work-blocks');
  if (workContainer) {
    workContainer.appendChild(createWorkBlock());
  }

  // ─── CV / Portfolio upload feedback ───
  document.querySelectorAll('.upload-zone').forEach(zone => {
    const input = zone.querySelector('input[type="file"]');
    const filenameEl = zone.querySelector('.upload-filename');
    const chooseEl = zone.querySelector('.upload-choose');
    if (!input) return;
    input.addEventListener('change', () => {
      if (input.files.length > 0) {
        zone.classList.add('has-file');
        if (filenameEl) filenameEl.textContent = input.files[0].name;
        if (chooseEl) chooseEl.textContent = 'Change file';
      }
    });
  });

  // ─── Privacy checkbox enables submit ───
  const privacyCheckbox = document.getElementById('privacy-checkbox');
  const submitBtn = document.getElementById('apply-submit');
  if (privacyCheckbox && submitBtn) {
    privacyCheckbox.addEventListener('change', () => {
      submitBtn.disabled = !privacyCheckbox.checked;
    });
  }

});
