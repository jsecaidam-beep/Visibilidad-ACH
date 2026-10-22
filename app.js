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
