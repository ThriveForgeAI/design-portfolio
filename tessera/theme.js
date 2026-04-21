/* Tessera theme toggle — persists across pages via localStorage.
   Works with the inline head-script that pre-applies the class before paint. */
(function () {
  const KEY = 'tessera-theme';
  const body = document.body;

  function apply(theme) {
    if (theme === 'dark') body.classList.add('dark');
    else body.classList.remove('dark');
  }

  function current() {
    return body.classList.contains('dark') ? 'dark' : 'light';
  }

  // Wire up every .theme-toggle on the page
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

  // Sync across tabs: if another tab changes the theme, update this one too.
  window.addEventListener('storage', e => {
    if (e.key === KEY && (e.newValue === 'dark' || e.newValue === 'light')) {
      apply(e.newValue);
      toggles.forEach(b => b.setAttribute('aria-pressed', e.newValue === 'dark' ? 'true' : 'false'));
    }
  });
})();
