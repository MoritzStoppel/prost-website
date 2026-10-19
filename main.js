(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return; // Endzustand steht bereits im HTML

  // Ausfallsicher einblenden: Ein Element wird erst versteckt, wenn feststeht, dass es
  // noch unterhalb des sichtbaren Bereichs liegt. Sichtbare Abschnitte bleiben unangetastet.
  function inView(el, threshold) {
    const r = el.getBoundingClientRect();
    const visible = Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0);
    return visible > Math.min(r.height, window.innerHeight) * threshold;
  }

  function reveal(el, threshold, onPrepare, onShow) {
    if (inView(el, threshold)) return; // schon sichtbar: nichts verstecken, Endzustand zeigen
    onPrepare();
    // Scroll-Ereignis plus kurze Zeitabfrage als Sicherheitsnetz
    const poll = setInterval(check, 250);
    function check() {
      if (!inView(el, threshold)) return;
      clearInterval(poll);
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
      setTimeout(onShow, 60); // Startzustand kurz rendern lassen, dann animieren
    }
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
  }

  // Zahlen hoch- bzw. runterzählen
  const DURATION = 1800;
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  function format(value, el) {
    const decimals = Number(el.dataset.decimals || 0);
    const abs = Math.abs(value).toLocaleString('de-DE', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    const sign = value < 0 && Math.abs(value) >= Math.pow(10, -decimals) / 2 ? '−' : '';
    return (el.dataset.prefix || '') + sign + abs + (el.dataset.suffix || '');
  }

  document.querySelectorAll('[data-to]').forEach((el) => {
    const from = Number(el.dataset.from || 0);
    const to = Number(el.dataset.to);
    const delay = el.closest('.map-counter') ? 1900 : 0; // passend zu den aufploppenden Flaschen
    reveal(el, 0.6,
      () => { el.textContent = format(from, el); },
      () => setTimeout(() => {
        const start = Date.now();
        const timer = setInterval(() => {
          const t = Math.min((Date.now() - start) / DURATION, 1);
          el.textContent = format(from + (to - from) * easeOutCubic(t), el);
          if (t >= 1) clearInterval(timer);
        }, 30);
      }, delay)
    );
  });

  // iPhones einfahren lassen, Badges aufploppen
  const phones = document.querySelector('.phones');
  if (phones) reveal(phones, 0.25, () => phones.classList.add('is-ready'), () => phones.classList.add('is-visible'));

  // Karte: Punkte, offene und gesammelte Flaschen nacheinander einblenden
  const map = document.querySelector('.map');
  if (map) reveal(map, 0.35, () => map.classList.add('is-ready'), () => map.classList.add('is-visible'));
})();
