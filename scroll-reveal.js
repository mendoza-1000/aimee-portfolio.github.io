/* scroll-reveal.js — fade-in from below using IntersectionObserver.
   Adds the classes at runtime, so the HTML body stays untouched. */
(function () {
  var root = document.documentElement;
  root.classList.add('js');

  var SELECTOR = [
    'h1', 'h2', '.card', '.oc', '.tab', '.num-card', '.dark', '.shot',
    '.idxcol', '.fblob', '.tornwrap', '.sphoto', '.win',
    '.divider p', '.closing .phrase', '.closing .contact', '.page img'
  ].join(',');

  function init() {
    var all = Array.prototype.slice.call(document.querySelectorAll(SELECTOR));
    // skip elements nested inside another animated element (avoids double animation)
    var targets = all.filter(function (el) {
      return !(el.parentElement && el.parentElement.closest(SELECTOR));
    });

    // small stagger among siblings that share the same parent
    var counters = new Map();
    targets.forEach(function (el) {
      var n = counters.get(el.parentElement) || 0;
      counters.set(el.parentElement, n + 1);
      el.style.setProperty('--rd', Math.min(n, 5) * 70 + 'ms');
      el.classList.add('reveal');
    });

    function show(el) { el.classList.add('is-visible'); }

    if (!('IntersectionObserver' in window)) { targets.forEach(show); return; }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { show(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    targets.forEach(function (el) { io.observe(el); });

    // make sure everything is visible when printing / exporting to PDF
    window.addEventListener('beforeprint', function () { targets.forEach(show); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
