/* Volare menu overlay — injected into every page, handles drilldown navigation. */
(function () {
  'use strict';

  const chev = '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 6l6 6-6 6"/></svg>';
  const chevBack = '<svg class="chev-back" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M15 6l-6 6 6 6"/></svg>';
  const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14M13 5l7 7-7 7"/></svg>';
  const hex = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12,2 20,7 20,17 12,22 4,17 4,7"/></svg>';

  function tile(key, label) {
    return '<button class="menu-tile" data-nav-to="' + key + '"><span class="label">' + label + '</span>' + chev + '</button>';
  }
  function sec(label, active) {
    return '<a href="' + (active || '#') + '" class="menu-sec' + (active ? '' : ' inactive') + '">' + label + '</a>';
  }
  function subLink(label, href) {
    return '<li><a href="' + (href || '#') + '" class="' + (href ? 'active' : 'inactive') + '"><span class="label">' + label + '</span></a></li>';
  }
  function carCard(key, variants, photo, primaryHref, primaryLabel, disclaimer) {
    const tabs = variants.map((v, i) =>
      '<button' + (i === 0 ? ' class="active"' : '') + '>' + v + '</button>'
    ).join('');
    return '<article class="menu-car-card' + (key === 'aurelio' ? ' active' : '') + '" data-car="' + key + '">' +
      '<nav class="variant-tabs">' + tabs + '</nav>' +
      '<div class="car-image-row"><div class="car-photo" style="background-image: url(\'' + photo + '\');"></div></div>' +
      '<div class="car-cta-row">' +
        '<a href="' + primaryHref + '" class="btn-gold">' + primaryLabel + hex + '</a>' +
        '<a href="models.html" class="btn-white">Explore the model <span class="arrow-right"></span></a>' +
      '</div>' +
      '<div class="menu-disclaimer">' + disclaimer + '</div>' +
    '</article>';
  }

  const MENU_HTML =
    '<div class="menu-overlay" id="menuOverlay" aria-hidden="true" role="dialog" aria-label="Main menu">' +
      '<div class="menu-header">' +
        '<button class="menu-close" data-menu-close>' +
          '<span class="x" aria-hidden="true"></span>' +
          '<span>Menu</span>' +
        '</button>' +
        '<a href="index.html" class="brand-bull">' +
          '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.4">' +
            '<path d="M32 4l24 8v18c0 14-10 24-24 30C18 54 8 44 8 30V12l24-8z"/>' +
            '<path d="M20 26c3-4 7-6 12-6s9 2 12 6M24 32c2 3 5 4 8 4s6-1 8-4M28 40c1 2 2 3 4 3s3-1 4-3" />' +
          '</svg>' +
        '</a>' +
        '<div class="menu-header-right">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 3h12v18l-6-4-6 4z"/></svg>' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>' +
        '</div>' +
      '</div>' +

      '<div class="menu-viewport">' +

        // Root view — 3×3 tiles + 3×3 secondary
        '<div class="menu-view active" data-view="root"><div class="menu-root">' +
          '<div class="menu-tiles">' +
            tile('models', 'Models') + tile('ownership', 'Ownership') + tile('dealerships', 'Dealerships') +
            tile('beyond', 'Beyond') + tile('company', 'Company') + tile('motorsport', 'Motorsport') +
            tile('museum', 'Museum') + tile('store', 'Store') + tile('news', 'News') +
          '</div>' +
          '<hr class="menu-divider" />' +
          '<div class="menu-secondary">' +
            sec('Design') + sec('Sustainability') + sec('History') +
            sec('Financial services') + sec('Warranty extension') + sec('Driving programs', 'motorsport.html') +
            sec('Lounge') + sec('Club') + sec('Podcast') +
          '</div>' +
        '</div></div>' +

        // Models sub-view — sidebar + car pane
        '<div class="menu-view" data-view="models">' +
          '<div class="menu-sub-head">' +
            '<button class="menu-back" data-nav-back>' + chevBack + '<span class="title">Models</span></button>' +
            '<a href="models.html" class="menu-overview">Overview ' + arrow + '</a>' +
          '</div>' +
          '<div class="menu-models-grid">' +
            '<ul class="menu-model-list">' +
              '<li><button data-model="aurelio" class="active"><span class="name">Aurelio V12</span><span class="view-all">View all</span></button></li>' +
              '<li><button data-model="tempesta"><span class="name">Tempesta</span><span class="view-all">View all</span></button></li>' +
              '<li><button data-model="corsa"><span class="name">Corsa GT3</span><span class="view-all">View all</span></button></li>' +
              '<li><button class="inactive"><span class="name">Pre-Owned</span></button></li>' +
              '<li><button class="inactive"><span class="name">Few-Off</span></button></li>' +
              '<li><button class="inactive"><span class="name">Concept</span></button></li>' +
              '<li><button class="inactive"><span class="name">Customization</span></button></li>' +
            '</ul>' +
            '<div class="menu-car-pane">' +
              carCard('aurelio', ['Aurelio V12', 'Aurelio Spyder', 'Aurelio SVJ'],
                'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1800&q=85',
                'models.html', 'Start configuration',
                '6.5L naturally aspirated V12 · 830 cv · 2.4 s · 365 km/h. Homologation varies by market. Your performance may vary.') +
              carCard('tempesta', ['Tempesta', 'Tempesta Performante', 'Tempesta S'],
                'https://images.unsplash.com/photo-1566473965997-3de9c817e938?auto=format&fit=crop&w=1800&q=85',
                'models.html', 'Start configuration',
                'Combined consumption (electricity + gasoline): 48 MPGe; gasoline only: 20 MPG. Values for reference only.') +
              carCard('corsa', ['Corsa GT3', 'Corsa Super Trofeo', 'Corsa EVO'],
                'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=85',
                'motorsport.html', 'Customer programme',
                'FIA GT3 homologated racing car. Not intended for road use. Three championships won in 2025.') +
            '</div>' +
          '</div>' +
        '</div>' +

        // Ownership
        '<div class="menu-view" data-view="ownership">' +
          '<div class="menu-sub-head"><button class="menu-back" data-nav-back>' + chevBack + '<span class="title">Ownership</span></button></div>' +
          '<div class="menu-sub-body"><ul class="menu-sub-list">' +
            subLink('Contact us', 'contact.html') +
            subLink('My Volare') +
            subLink('Service &amp; parts') +
            subLink('Warranty') +
            subLink('Financing') +
            subLink('Unica app') +
          '</ul></div>' +
        '</div>' +

        // Motorsport
        '<div class="menu-view" data-view="motorsport">' +
          '<div class="menu-sub-head">' +
            '<button class="menu-back" data-nav-back>' + chevBack + '<span class="title">Motorsport</span></button>' +
            '<a href="motorsport.html" class="menu-overview">Overview ' + arrow + '</a>' +
          '</div>' +
          '<div class="menu-sub-body"><ul class="menu-sub-list">' +
            subLink('Squadra Corse', 'motorsport.html') +
            subLink('Race calendar', 'motorsport.html') +
            subLink('Super Trofeo') +
            subLink('Drivers') +
            subLink('GT3 customer programme') +
          '</ul></div>' +
        '</div>' +

        // Store
        '<div class="menu-view" data-view="store">' +
          '<div class="menu-sub-head">' +
            '<button class="menu-back" data-nav-back>' + chevBack + '<span class="title">Store</span></button>' +
            '<a href="store.html" class="menu-overview">Go to the store ' + arrow + '</a>' +
          '</div>' +
          '<div class="menu-sub-body"><ul class="menu-sub-list">' +
            subLink('Apparel', 'store.html') +
            subLink('Accessories', 'store.html') +
            subLink('Scale models', 'store.html') +
            subLink('Books &amp; prints', 'store.html') +
            subLink('Lifestyle', 'store.html') +
            subLink('Private label') +
          '</ul></div>' +
        '</div>' +

        // Beyond
        '<div class="menu-view" data-view="beyond">' +
          '<div class="menu-sub-head"><button class="menu-back" data-nav-back>' + chevBack + '<span class="title">Beyond</span></button></div>' +
          '<div class="menu-sub-body"><ul class="menu-sub-list">' +
            subLink('Collaborations') + subLink('Yacht') + subLink('Real estate') + subLink('Experiences') +
          '</ul></div>' +
        '</div>' +

        // Company
        '<div class="menu-view" data-view="company">' +
          '<div class="menu-sub-head"><button class="menu-back" data-nav-back>' + chevBack + '<span class="title">Company</span></button></div>' +
          '<div class="menu-sub-body"><ul class="menu-sub-list">' +
            subLink('About Volare') + subLink('Sustainability') + subLink('Careers') + subLink('Press') + subLink('Investors') +
          '</ul></div>' +
        '</div>' +

        // Dealerships
        '<div class="menu-view" data-view="dealerships">' +
          '<div class="menu-sub-head"><button class="menu-back" data-nav-back>' + chevBack + '<span class="title">Dealerships</span></button></div>' +
          '<div class="menu-sub-body"><ul class="menu-sub-list">' +
            subLink('Find a dealer') +
            subLink('Book a test drive') +
            subLink('Private tour') +
            subLink('Contact us', 'contact.html') +
          '</ul></div>' +
        '</div>' +

        // Museum
        '<div class="menu-view" data-view="museum">' +
          '<div class="menu-sub-head"><button class="menu-back" data-nav-back>' + chevBack + '<span class="title">Museum</span></button></div>' +
          '<div class="menu-sub-body"><ul class="menu-sub-list">' +
            subLink("Visit Sant'Agata") + subLink('Heritage') + subLink('Collection') + subLink('Exhibitions') +
          '</ul></div>' +
        '</div>' +

        // News
        '<div class="menu-view" data-view="news">' +
          '<div class="menu-sub-head"><button class="menu-back" data-nav-back>' + chevBack + '<span class="title">News</span></button></div>' +
          '<div class="menu-sub-body"><ul class="menu-sub-list">' +
            subLink('Latest stories') + subLink('Press releases') + subLink('Events') + subLink('Newsletter') +
          '</ul></div>' +
        '</div>' +

      '</div>' +

      '<div class="menu-footer">' +
        '<span>© 2026 Automobili Volare S.p.A.</span>' +
        "<span>Sant'Agata Bolognese · Italia</span>" +
        '<span>EN · IT · DE · FR · JP</span>' +
      '</div>' +
    '</div>';

  // Inject menu overlay at end of body
  function init() {
    document.body.insertAdjacentHTML('beforeend', MENU_HTML);
    wire();
  }

  function wire() {
    const overlay = document.getElementById('menuOverlay');
    if (!overlay) return;

    const openers = document.querySelectorAll('[data-menu-open]');
    const closers = overlay.querySelectorAll('[data-menu-close]');

    function open() {
      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.classList.add('menu-open');
    }
    function close() {
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('menu-open');
      setTimeout(() => showView('root'), 320);
    }
    openers.forEach(b => b.addEventListener('click', open));
    closers.forEach(b => b.addEventListener('click', close));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && overlay.classList.contains('open')) close();
    });

    function showView(name) {
      overlay.querySelectorAll('.menu-view').forEach(v => {
        v.classList.toggle('active', v.dataset.view === name);
      });
    }

    overlay.querySelectorAll('[data-nav-to]').forEach(b => {
      b.addEventListener('click', () => showView(b.dataset.navTo));
    });
    overlay.querySelectorAll('[data-nav-back]').forEach(b => {
      b.addEventListener('click', () => showView('root'));
    });

    // Model picker
    const modelBtns = overlay.querySelectorAll('.menu-model-list button[data-model]');
    const modelCards = overlay.querySelectorAll('.menu-car-card[data-car]');
    modelBtns.forEach(btn => btn.addEventListener('click', () => {
      const key = btn.dataset.model;
      modelBtns.forEach(b => b.classList.toggle('active', b === btn));
      modelCards.forEach(c => c.classList.toggle('active', c.dataset.car === key));
    }));

    // Variant tabs (visual)
    overlay.querySelectorAll('.variant-tabs').forEach(row => {
      const tabs = row.querySelectorAll('button');
      tabs.forEach(t => t.addEventListener('click', () => {
        tabs.forEach(x => x.classList.toggle('active', x === t));
      }));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
