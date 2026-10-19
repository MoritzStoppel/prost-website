// Zahlen im Fakten-Abschnitt hoch- bzw. runterzählen, sobald sie sichtbar werden.
(function () {
  const counters = document.querySelectorAll('.stat-num[data-to]');
  if (!counters.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) return; // Endwerte stehen bereits im HTML

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

  function animate(el) {
    const from = Number(el.dataset.from || 0);
    const to = Number(el.dataset.to);
    const start = performance.now();

    function frame(now) {
      const t = Math.min((now - start) / DURATION, 1);
      el.textContent = format(from + (to - from) * easeOutCubic(t), el);
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  // Startwert setzen, damit die Zahl nicht erst kurz den Endwert zeigt
  counters.forEach((el) => { el.textContent = format(Number(el.dataset.from || 0), el); });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animate(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.6 });

  counters.forEach((el) => observer.observe(el));
})();
