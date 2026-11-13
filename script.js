const plans = [
  { name: 'Starter', tier: 'basic', icon: '🌱', monthly: 9,
    desc: 'A first home for a personal site or small project.',
    features: ['1 website', '10 GB storage', 'Free SSL certificate', 'Email support'] },
  { name: 'Growth', tier: 'basic', icon: '🚀', monthly: 19,
    desc: 'More room for a growing blog or small shop.',
    features: ['5 websites', '50 GB storage', 'Daily backups', 'Priority email support'] },
  { name: 'Pro', tier: 'premium', icon: '⭐', monthly: 39, popular: true,
    desc: 'Fast hosting for busy sites and client work.',
    features: ['25 websites', '200 GB storage', 'Global CDN', 'Live chat support'] },
  { name: 'Studio', tier: 'premium', icon: '🏢', monthly: 79,
    desc: 'Everything an agency needs to host at scale.',
    features: ['Unlimited websites', '1 TB storage', 'Staging environments', '24/7 phone support'] }
];

let yearly = false, filter = 'all', selected = null;
const grid = document.getElementById('cards');
const toggle = document.getElementById('toggle');

// Yearly billing = 10 x monthly price (2 months free)
const priceOf = p => (yearly ? p.monthly * 10 : p.monthly);

function render() {
  grid.innerHTML = plans
    .filter(p => filter === 'all' || p.tier === filter)
    .map(p => `
      <article class="card ${p.popular ? 'popular' : ''}">
        ${p.popular ? '<span class="badge">Most Popular</span>' : ''}
        <div class="icon" aria-hidden="true">${p.icon}</div>
        <h2>${p.name}</h2>
        <p class="desc">${p.desc}</p>
        <p class="price"><b>$${priceOf(p)}</b><span> / ${yearly ? 'year' : 'month'}</span></p>
        <ul>${p.features.map(f => `<li>${f}</li>`).join('')}</ul>
        <button class="btn ${selected === p.name ? 'selected' : ''}" data-name="${p.name}">
          ${selected === p.name ? 'Selected ✓' : 'Choose ' + p.name}
        </button>
      </article>`).join('');
}

toggle.addEventListener('click', () => {
  yearly = !yearly;
  toggle.setAttribute('aria-checked', yearly);
  document.getElementById('lbl-m').classList.toggle('on', !yearly);
  document.getElementById('lbl-y').classList.toggle('on', yearly);
  render();
});

document.querySelector('.filters').addEventListener('click', e => {
  const btn = e.target.closest('.filter');
  if (!btn) return;
  filter = btn.dataset.filter;
  document.querySelectorAll('.filter').forEach(b => b.classList.toggle('active', b === btn));
  render();
});

grid.addEventListener('click', e => {
  const btn = e.target.closest('.btn');
  if (!btn) return;
  selected = btn.dataset.name;
  render();
});

render();
