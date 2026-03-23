/* ============================================
   Main JS — Interactive view navigation
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  let current = 'home';

  function showView(id) {
    // Hide all views
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));

    // Show target
    const target = document.getElementById('view-' + id);
    if (!target) return;
    target.classList.add('active');
    current = id;

    // Focus management: move focus into view
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

  // About CTA → open-call
  document.querySelectorAll('[data-target]').forEach(el => {
    if (el.classList.contains('menu-item')) return; // already handled
    el.addEventListener('click', () => {
      const target = el.dataset.target;
      if (target) showView(target);
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (current !== 'home' && current !== 'menu') {
        showView('menu');
      } else if (current === 'menu') {
        showView('home');
      }
    }
  });

  // ─── Application Form ───
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxH-MspuCGbtZ0ibRE7215OUmgEAVnFGdziucRuCFEEWlWn9THZp0Us4MFCLfe4OnMf/exec';

  // File upload visual feedback
  document.querySelectorAll('.upload-field input[type="file"]').forEach(input => {
    input.addEventListener('change', () => {
      const label = input.closest('.upload-field');
      const nameSpan = label.querySelector('.upload-name');
      if (input.files.length > 0) {
        label.classList.add('has-file');
        nameSpan.textContent = input.files[0].name;
      } else {
        label.classList.remove('has-file');
      }
    });
  });

  // Form submit
  const applyForm = document.getElementById('apply-form');
  if (applyForm) {
    applyForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = applyForm.querySelector('.apply-submit');
      submitBtn.textContent = 'Submitting...';
      submitBtn.disabled = true;

      try {
        const data = {};

        // Collect text fields
        const formData = new FormData(applyForm);
        for (const [key, value] of formData.entries()) {
          if (typeof value === 'string') data[key] = value;
        }

        // Collect file fields as base64
        const fileInputs = applyForm.querySelectorAll('input[type="file"]');
        for (const input of fileInputs) {
          const file = input.files[0];
          if (file) {
            if (file.size > 5 * 1024 * 1024) {
              throw new Error(input.name + ' is too large. Maximum 5 MB.');
            }
            data[input.name] = {
              name: file.name,
              type: file.type,
              data: await toBase64(file)
            };
          }
        }

        if (!SCRIPT_URL) {
          throw new Error('Form backend not configured yet.');
        }

        await fetch(SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          body: JSON.stringify(data)
        });

        // Success
        applyForm.style.display = 'none';
        const intro = document.querySelector('.apply-intro');
        if (intro) intro.style.display = 'none';
        document.getElementById('apply-success').hidden = false;

      } catch (err) {
        alert(err.message || 'Something went wrong. Please try again.');
        submitBtn.textContent = 'Apply Now!';
        submitBtn.disabled = false;
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
});
