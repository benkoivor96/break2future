/* ================================================================
   BREAK2FUTURE — Shared Components
   Injects footer + mobile-nav, wires up hamburger
   ================================================================ */

(function () {

  // ── Footer ─────────────────────────────────────────────────────
  const footerSlot = document.getElementById('site-footer');
  if (footerSlot) {
    footerSlot.outerHTML = `
<footer>
  <div class="footer-collab">
    <div class="footer-logo">BREAK<span>2</span>FUTURE</div>
    <div class="footer-x">×</div>
    <img src="photos/tala-logo.png" alt="Tala Ple(j)s" class="footer-partner-logo">
  </div>
  <div class="social-links">
    <a href="https://www.instagram.com/break2future.hr/" target="_blank" rel="noopener" class="social-link">Instagram</a>
  </div>
  <div class="footer-info">
    Zagreb · Croatia<br>
    breaking culture<br>
    break2future.hr
  </div>
</footer>`;
  }

  // ── Mobile Nav ─────────────────────────────────────────────────
  const navDiv = document.createElement('div');
  navDiv.innerHTML = `
<div class="mobile-nav" id="mobile-nav">
  <a href="index.html">Home</a>
  <a href="about.html">O Nama</a>
  <div class="mob-dropdown">
    <button class="mob-dropdown-btn" id="mob-archive-btn">Archive</button>
    <div class="mob-dropdown-items" id="mob-archive-items">
      <a href="b2f-2026.html">2026</a>
      <a href="b2f-2025.html">2025</a>
      <a href="b2f-2024.html">2024</a>
      <a href="b2f-2022.html">2022</a>
    </div>
  </div>
  <div class="lang-toggle">
    <button class="lang-btn" data-lang="hr" id="mob-lang-hr">HR</button>
    <button class="lang-btn" data-lang="en" id="mob-lang-en">EN</button>
  </div>
</div>`;
  document.body.appendChild(navDiv.firstElementChild);

  const mobileNav  = document.getElementById('mobile-nav');
  const hamburger  = document.getElementById('hamburger');

  // ── Archive dropdown ────────────────────────────────────────────
  const archiveBtn   = document.getElementById('mob-archive-btn');
  const archiveItems = document.getElementById('mob-archive-items');
  if (archiveBtn) {
    archiveBtn.addEventListener('click', () => {
      const isOpen = archiveItems.classList.toggle('open');
      archiveBtn.classList.toggle('open', isOpen);
    });
  }

  // Sync active lang state into mobile buttons
  const currentLang = localStorage.getItem('b2f-lang') || 'en';
  mobileNav.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === currentLang);
    b.addEventListener('click', () => {
      const l = b.dataset.lang;
      // each page exposes either applyLang() or setLang()
      if (typeof window.applyLang === 'function') window.applyLang(l);
      else if (typeof window.setLang  === 'function') window.setLang(l);
      // keep all lang-btn elements in sync (desktop + mobile)
      document.querySelectorAll('.lang-btn').forEach(x =>
        x.classList.toggle('active', x.dataset.lang === l)
      );
    });
  });

  // ── Hamburger ──────────────────────────────────────────────────
  if (!hamburger) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on nav link click
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

})();
