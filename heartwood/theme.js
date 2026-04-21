/* Heartwood theme toggle — persists across pages via localStorage. */
(function () {
  const KEY = 'heartwood-theme';
  const body = document.body;

  function apply(theme) {
    if (theme === 'dark') body.classList.add('dark');
    else body.classList.remove('dark');
  }

  function current() {
    return body.classList.contains('dark') ? 'dark' : 'light';
  }

  const toggles = document.querySelectorAll('.theme-toggle');
  toggles.forEach(btn => {
    btn.setAttribute('aria-label', 'Toggle dark mode');
    btn.setAttribute('aria-pressed', current() === 'dark' ? 'true' : 'false');
    btn.addEventListener('click', () => {
      const next = current() === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
      toggles.forEach(b => b.setAttribute('aria-pressed', next === 'dark' ? 'true' : 'false'));
    });
  });

  window.addEventListener('storage', e => {
    if (e.key === KEY && (e.newValue === 'dark' || e.newValue === 'light')) {
      apply(e.newValue);
      toggles.forEach(b => b.setAttribute('aria-pressed', e.newValue === 'dark' ? 'true' : 'false'));
    }
  });
})();
