async function updateCartCount() {
  try {
    const res = await fetch('/cart.js');
    const cart = await res.json();
    document.querySelectorAll('[data-cart-count]').forEach(el => {
      el.textContent = cart.item_count;
      el.hidden = cart.item_count === 0;
    });
  } catch(e) {}
}
document.addEventListener('DOMContentLoaded', updateCartCount);
const menuBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');
if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('hidden');
    menuBtn.setAttribute('aria-expanded', String(!open));
  });
}
const dismissBtn = document.getElementById('dismiss-announcement');
const annBar = document.getElementById('announcement-bar');
if (dismissBtn && annBar) {
  dismissBtn.addEventListener('click', () => { annBar.style.display = 'none'; sessionStorage.setItem('ann-dismissed','1'); });
  if (sessionStorage.getItem('ann-dismissed')) annBar.style.display = 'none';
}
document.addEventListener('submit', async (e) => {
  const form = e.target.closest('form[action="/cart/add"]');
  if (!form) return;
  e.preventDefault();
  const btn = form.querySelector('[type="submit"]');
  const orig = btn.textContent;
  btn.textContent = '✓ Added!';
  btn.disabled = true;
  try { await fetch('/cart/add.js', { method:'POST', body: new FormData(form) }); await updateCartCount(); } catch(_) {}
  setTimeout(() => { btn.textContent = orig; btn.disabled = false; }, 1500);
});
