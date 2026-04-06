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

  // ─── Classification options ───
  const classifications = [
    'Painting', 'Drawing', 'Sculpture', 'Photography', 'Video art',
    'Installation', 'Performance', 'Digital / new media', 'Textile / fibre art',
    'Ceramics', 'Printmaking', 'Mixed media', 'Sound art',
    'Land / environmental art', 'Other'
  ];

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
    el.addEventListener('click', e => {
      e.preventDefault();
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

  function buildClassificationSelect(index) {
    let html = `<select name="work${index}_classification">`;
    html += '<option value="">Select...</option>';
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
            <input type="text" name="work${index}_title">
          </div>
          <div class="field-wrap">
            <label class="field-label">Year <span class="req">*</span></label>
            <input type="text" name="work${index}_year">
          </div>
        </div>
        <div class="form-grid-2">
          <div class="field-wrap classification-wrap">
            <label class="field-label">Classification <span class="req">*</span></label>
            ${buildClassificationSelect(index)}
            <div class="classification-other" hidden>
              <input type="text" name="work${index}_classificationOther" placeholder="Describe your medium">
              <button type="button" class="classification-back">← back to list</button>
            </div>
          </div>
          <div class="field-wrap">
            <label class="field-label">Medium <span class="req">*</span></label>
            <input type="text" name="work${index}_medium" placeholder="Oil on canvas, video, steel...">
          </div>
        </div>
        <div class="form-grid-2">
          <div class="field-wrap">
            <label class="field-label">Dimensions (cm)</label>
            <div class="dims-group">
              <input type="text" name="work${index}_h" placeholder="H">
              <input type="text" name="work${index}_w" placeholder="W">
              <input type="text" name="work${index}_d" placeholder="D">
            </div>
          </div>
          <div class="field-wrap">
            <label class="field-label">Weight (kg)</label>
            <input type="text" name="work${index}_kg" placeholder="kg">
          </div>
        </div>

        <div class="field-wrap">
          <label class="field-label">Images <span class="req">*</span> <span class="field-note">Up to 4 images per work</span></label>
          <div class="image-grid" data-work="${index}">
            <div class="image-slot image-slot--empty"><span>+</span></div>
            <div class="image-slot image-slot--empty"><span>+</span></div>
            <div class="image-slot image-slot--empty"><span>+</span></div>
            <div class="image-slot image-slot--empty"><span>+</span></div>
          </div>
          <input type="file" class="image-grid-input" accept="image/jpeg,image/png,image/tiff" multiple hidden data-work="${index}">
          <span class="upload-hint">JPG, PNG or TIFF · max 10 MB · min 1500px</span>
        </div>

        <div class="field-wrap">
          <button type="button" class="video-toggle-btn" data-work="${index}">+ Add video</button>
          <div class="video-zone" data-work="${index}" hidden>
            <label class="upload-zone video-upload-zone">
              <input type="file" name="work${index}_video" accept="video/mp4,video/quicktime" hidden>
              <span class="upload-icon">↑</span>
              <span class="upload-zone-text"><span class="upload-choose">Choose video</span> or drag here</span>
              <span class="upload-hint">MP4 or MOV · max 100 MB</span>
            </label>
            <div class="video-file-row" hidden>
              <span class="video-filename"></span>
              <button type="button" class="video-remove-btn">×</button>
            </div>
            <label class="privacy-check" style="margin-top:0.5rem">
              <input type="checkbox" name="work${index}_hasEquipment">
              <span>I can provide my own display equipment</span>
            </label>
          </div>
        </div>

        <div class="field-wrap">
          <label class="field-label">About this work <span class="req">*</span></label>
          <p class="field-hint">Describe the concept, materials, and process. If the work relates to your experience of Milan or themes of migration and belonging, let us know. <a href="guidelines.html" target="_blank" class="accent-text">See guidelines</a></p>
          <textarea name="work${index}_about" rows="4"></textarea>
        </div>

        <div class="field-wrap">
          <label class="field-label">Installation preferences</label>
          <textarea name="work${index}_installation" rows="3" placeholder="Wall mount, plinth, power, darkened room, sound..."></textarea>
          <label class="privacy-check" style="margin-top:0.5rem">
            <input type="checkbox" class="flexible-check" data-work="${index}">
            <span>I'm flexible — no specific requirements</span>
          </label>
        </div>
      </div>
    `;

    // ─── Classification "Other" swap ───
    const classSelect = block.querySelector(`select[name="work${index}_classification"]`);
    const otherWrap = block.querySelector('.classification-other');
    const otherInput = otherWrap.querySelector('input');
    const backBtn = otherWrap.querySelector('.classification-back');

    classSelect.addEventListener('change', () => {
      if (classSelect.value === 'Other') {
        classSelect.hidden = true;
        otherWrap.hidden = false;
        otherInput.focus();
      }
    });

    backBtn.addEventListener('click', () => {
      classSelect.value = '';
      classSelect.hidden = false;
      otherWrap.hidden = true;
      otherInput.value = '';
    });

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

    imageInput.addEventListener('change', () => {
      const files = Array.from(imageInput.files);
      if (!files.length) return;

      // Fill starting from the targeted slot, then fill remaining empty slots
      let startSlot = parseInt(imageInput.dataset.slotIndex || '0', 10);
      let fileIdx = 0;

      // First fill the targeted slot
      if (fileIdx < files.length && !imageFiles[startSlot]) {
        fillSlot(startSlot, files[fileIdx]);
        fileIdx++;
      }

      // Then fill remaining empty slots
      for (let i = 0; i < 4 && fileIdx < files.length; i++) {
        if (i === startSlot) continue;
        if (!imageFiles[i]) {
          fillSlot(i, files[fileIdx]);
          fileIdx++;
        }
      }

      imageInput.value = '';
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
        // Clear video
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
      removeEl.addEventListener('click', () => {
        block.remove();
        updateAddBtn();
      });
    }

    // Store imageFiles ref for form submission
    block._imageFiles = imageFiles;

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
    btn.style.display = count >= 3 ? 'none' : '';
  }

  document.getElementById('add-work-btn')?.addEventListener('click', () => {
    const container = document.getElementById('work-blocks');
    const count = container.querySelectorAll('.work-block').length;
    if (count >= 3) return;
    container.appendChild(createWorkBlock(false));
    updateAddBtn();
  });

  // Add first work block on page load (no remove button)
  const workContainer = document.getElementById('work-blocks');
  if (workContainer) {
    workContainer.appendChild(createWorkBlock(true));
  }

  // ─── CV / Portfolio upload feedback ───
  document.querySelectorAll('.upload-zone').forEach(zone => {
    // Skip video upload zones inside work blocks
    if (zone.classList.contains('video-upload-zone')) return;
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

  // ─── Form submission ───
  const applyForm = document.getElementById('apply-form');
  const applySuccess = document.getElementById('apply-success');

  if (applyForm) {
    applyForm.addEventListener('submit', e => {
      e.preventDefault();
      // Hide form, show success
      applyForm.hidden = true;
      if (applySuccess) applySuccess.hidden = false;
    });
  }

});
