let menuButton = document.querySelector('.menu-button');
let primaryNav = document.getElementById('primary-nav');

function toggleMenu() {
  if (!primaryNav || !menuButton) return;
  const isHidden = primaryNav.classList.toggle('hide');
  menuButton.setAttribute('aria-expanded', String(!isHidden));
}

function initMenuToggle() {
  menuButton = document.querySelector('.menu-button');
  primaryNav = document.getElementById('primary-nav');
  if (!menuButton || !primaryNav) return;
  // Ensure nav is hidden by default on small screens
  if (!primaryNav.classList.contains('hide')) {
    primaryNav.classList.add('hide');
  }
  menuButton.addEventListener('click', toggleMenu);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMenuToggle);
} else {
  initMenuToggle();
}

function handleResize() {
  // use the actual nav element ID used in the markup
  const menu = document.getElementById('primary-nav');
  if (!menu) return; // nothing to do if nav isn't present
  // match the CSS breakpoint (700px) so the JS behavior aligns with styles
  if (window.innerWidth >= 700) {
    menu.classList.remove('hide');
  } else {
    menu.classList.add('hide');
  }
}

// initialize and keep in sync on resize
window.addEventListener('resize', handleResize);
handleResize();

// --------------------
// --------------------
// Modal Viewer Feature (static viewer element)
// --------------------
function initStaticViewer() {
  const gallery = document.querySelector('.gallery');
  const viewer = document.getElementById('viewer');
  const viewerImg = document.getElementById('viewer-img');
  const thumbsContainer = document.getElementById('viewer-thumbs');
  const closeBtn = viewer ? viewer.querySelector('.close-viewer') : null;
  if (!gallery || !viewer || !viewerImg || !thumbsContainer || !closeBtn) return;

  // build thumbs from gallery images
  const thumbs = Array.from(gallery.querySelectorAll('img'));
  thumbsContainer.innerHTML = '';
  thumbs.forEach((img, idx) => {
    const t = document.createElement('img');
    t.src = img.src;
    t.alt = img.alt || `thumb-${idx+1}`;
    t.dataset.index = idx;
    t.addEventListener('click', () => {
      openViewerAtIndex(idx);
    });
    thumbsContainer.appendChild(t);
  });

  let currentIndex = 0;
  let lastFocused = null;

  function openViewerAtIndex(index) {
    const thumb = thumbs[index];
    if (!thumb) return;
    lastFocused = document.activeElement;
    // map small to full by naming convention: replace '-sm' with '-full'
    const fullSrc = thumb.src.replace('-sm', '-full');
    viewerImg.src = fullSrc;
    viewerImg.alt = thumb.alt || '';
    viewer.classList.add('open');
    viewer.setAttribute('aria-hidden','false');
    viewer.focus();
    document.body.classList.add('no-scroll');
    currentIndex = index;
    // highlight active thumb
    updateActiveThumb();
  }

  function closeViewer() {
    viewer.classList.remove('open');
    viewer.setAttribute('aria-hidden','true');
    viewerImg.src = '';
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    document.body.classList.remove('no-scroll');
  }

  function updateActiveThumb(){
    thumbsContainer.querySelectorAll('img').forEach((t,i)=>{
      t.style.opacity = i===currentIndex? '1': '0.6';
      t.style.transform = i===currentIndex? 'translateY(-4px)': 'none';
    });
  }

  // open when gallery image clicked
  gallery.addEventListener('click', (e)=>{
    const clicked = e.target;
    if (clicked.tagName !== 'IMG') return;
    const idx = thumbs.indexOf(clicked);
    if (idx === -1) return;
    openViewerAtIndex(idx);
  });

  // close button
  closeBtn.addEventListener('click', closeViewer);

  // click outside to close
  viewer.addEventListener('click', (e)=>{ if (e.target === viewer) closeViewer(); });

  // keyboard nav
  document.addEventListener('keydown', (e)=>{
    if (!viewer.classList.contains('open')) return;
    if (e.key === 'Escape') closeViewer();
    if (e.key === 'ArrowRight') openViewerAtIndex(Math.min(currentIndex+1, thumbs.length-1));
    if (e.key === 'ArrowLeft') openViewerAtIndex(Math.max(currentIndex-1, 0));
  });
}

// initialize viewer after DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initStaticViewer);
} else {
  initStaticViewer();
}