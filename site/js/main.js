// ============================================
// Mark Glezin — Artist Portfolio
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Mobile Navigation ──
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const closeBtn  = document.querySelector('.mobile-nav .close-btn');

  function closeMobileNav() {
    mobileNav.classList.remove('open');
  }

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => mobileNav.classList.add('open'));
    if (closeBtn) closeBtn.addEventListener('click', closeMobileNav);
    // Close nav when clicking backdrop
    mobileNav.addEventListener('click', e => {
      if (e.target === mobileNav) closeMobileNav();
    });
    // Close nav when any link inside is clicked (including hash-only links)
    mobileNav.addEventListener('click', e => {
      if (e.target.closest('a')) closeMobileNav();
    });
  }

  // ── Lightbox ──
  const lightbox     = document.getElementById('lightbox');
  const lbImg        = document.getElementById('lb-img');
  const lbCaption    = document.getElementById('lb-caption');
  const lbClose      = document.querySelector('.lightbox-close');
  const lbPrev       = document.querySelector('.lightbox-prev');
  const lbNext       = document.querySelector('.lightbox-next');
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    const item  = galleryItems[index];
    const img   = item.querySelector('img');
    const title = item.dataset.title || img.alt || '';

    // Use full-size src from data attribute if available, else use src
    const fullSrc = item.dataset.full || img.src;
    lbImg.src        = fullSrc;
    lbCaption.textContent = title;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  function navigate(dir) {
    currentIndex = (currentIndex + dir + galleryItems.length) % galleryItems.length;
    openLightbox(currentIndex);
  }

  galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });

  if (lbClose)  lbClose.addEventListener('click', closeLightbox);
  if (lbPrev)   lbPrev.addEventListener('click',  () => navigate(-1));
  if (lbNext)   lbNext.addEventListener('click',  () => navigate(1));

  if (lightbox) {
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!lightbox || !lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   navigate(-1);
    if (e.key === 'ArrowRight')  navigate(1);
  });

  // ── Contact Form ──
  const form = document.getElementById('contact-form');
  const successMsg = document.querySelector('.form-success');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('.submit-btn');
      btn.textContent = 'Sending…';
      btn.disabled = true;

      // Use Formspree for email delivery (free, no backend needed)
      // Replace FORMSPREE_ID with your actual Formspree form ID
      const FORMSPREE_ENDPOINT = form.dataset.endpoint || '#';

      if (FORMSPREE_ENDPOINT === '#') {
        // Demo mode — just show success
        setTimeout(() => {
          form.style.display = 'none';
          if (successMsg) successMsg.style.display = 'block';
        }, 800);
        return;
      }

      try {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        if (res.ok) {
          form.style.display = 'none';
          if (successMsg) successMsg.style.display = 'block';
        } else {
          btn.textContent = 'Try Again';
          btn.disabled = false;
        }
      } catch {
        btn.textContent = 'Try Again';
        btn.disabled = false;
      }
    });
  }

  // ── Lazy load images ──
  if ('IntersectionObserver' in window) {
    const lazyImgs = document.querySelectorAll('img[data-src]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });
    lazyImgs.forEach(img => observer.observe(img));
  } else {
    // Fallback
    document.querySelectorAll('img[data-src]').forEach(img => {
      img.src = img.dataset.src;
    });
  }

});
