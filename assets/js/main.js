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
});
