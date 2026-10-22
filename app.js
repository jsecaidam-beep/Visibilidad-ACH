// Keep links from the initial multi-product prototype on the institutional landing.
if (/^#(portadas|portafolio|difusion|fichas)(\/.*)?$/.test(location.hash)) {
  history.replaceState(null, '', location.pathname + location.search + '#que-hacemos');
}
document.querySelectorAll('details').forEach(item => item.addEventListener('toggle', () => {
  if (item.open) document.querySelectorAll('details').forEach(other => { if (other !== item) other.open = false; });
}));

document.querySelectorAll('[data-year]').forEach(button => button.addEventListener('click', () => {
 const year = button.dataset.year;
 document.querySelectorAll('[data-year]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
 document.querySelectorAll('[data-map-year]').forEach(dot => { dot.style.display = year === 'all' || dot.dataset.mapYear === year ? '' : 'none'; });
 document.querySelectorAll('[data-municipality-year]').forEach(row => { row.hidden = !(year === 'all' || row.dataset.municipalityYear === year); });
}));

// Decorative motion never blocks the content or the standard navigation.
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
const natureCursor = document.querySelector('#nature-cursor');
let cursorShape = 'leaf';
let cursorFrame = 0;
let latestX = 0, latestY = 0;
document.body.dataset.cursor = cursorShape;
document.querySelectorAll('[data-cursor-choice]').forEach(button => button.addEventListener('click', () => {
  cursorShape = button.dataset.cursorChoice;
  document.body.dataset.cursor = cursorShape;
  document.querySelectorAll('[data-cursor-choice]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
}));
if (finePointer.matches && !reducedMotion.matches && natureCursor) {
  document.addEventListener('pointermove', event => {
    if (event.pointerType && event.pointerType !== 'mouse') return;
    latestX = event.clientX; latestY = event.clientY;
    document.body.classList.add('nature-cursor-ready');
    natureCursor.style.opacity = '1';
    natureCursor.classList.toggle('is-link', !!event.target.closest('a,button,summary'));
    if (!cursorFrame) cursorFrame = requestAnimationFrame(() => {
      natureCursor.style.transform = `translate3d(${latestX - 8}px,${latestY - 5}px,0)`;
      cursorFrame = 0;
    });
  }, {passive:true});
  document.documentElement.addEventListener('pointerleave', () => { natureCursor.style.opacity = '0'; document.body.classList.remove('nature-cursor-ready'); });
  window.addEventListener('blur', () => { natureCursor.style.opacity = '0'; document.body.classList.remove('nature-cursor-ready'); });
}
if (!reducedMotion.matches && 'IntersectionObserver' in window) {
  document.querySelectorAll('.intro,.section-head,.area-layout,.map-layout,.values article,.photo-grid figure,.alliance-grid,.contact>div,.social-card').forEach(el => el.classList.add('reveal'));
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {entry.target.classList.add('is-visible'); observer.unobserve(entry.target);}
  }), {threshold:0.08});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  document.body.classList.add('motion-ready');
}
const progress = document.querySelector('.scroll-progress');
let scrollFrame = 0;
function updateProgress() {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? scrollY/max : 0})`;
  scrollFrame = 0;
}
window.addEventListener('scroll', () => {if (!scrollFrame) scrollFrame = requestAnimationFrame(updateProgress);}, {passive:true});
window.addEventListener('resize', updateProgress, {passive:true});
updateProgress();
