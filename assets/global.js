// ── Cart Drawer ───────────────────────────────────────────────────────────────

function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('cart-backdrop');
  if (!drawer) return;
  drawer.classList.remove('translate-x-full');
  if (backdrop) {
    backdrop.classList.remove('opacity-0', 'pointer-events-none');
  }
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('cart-backdrop');
  if (!drawer) return;
  drawer.classList.add('translate-x-full');
  if (backdrop) {
    backdrop.classList.add('opacity-0', 'pointer-events-none');
  }
  document.body.style.overflow = '';
}

function formatMoney(cents) {
  const fmt = window.__moneyFormat || '{{amount}}';
  const amount = (cents / 100).toFixed(2);
  return fmt
    .replace('{{amount}}', amount)
    .replace('{{amount_no_decimals}}', Math.floor(cents / 100))
    .replace('{{amount_with_comma_separator}}', amount.replace('.', ','));
}

async function cartUpdateItem(key, quantity) {
  try {
    const res = await fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: key, quantity: Math.max(0, quantity) })
    });
    const cart = await res.json();

    if (quantity <= 0) {
      const itemEl = document.querySelector(`[data-cart-item="${key}"]`);
      if (itemEl) itemEl.remove();
    } else {
      const qtyEl = document.querySelector(`[data-item-qty="${key}"]`);
      if (qtyEl) qtyEl.textContent = String(quantity).padStart(2, '0');
    }

    const subtotalEl = document.getElementById('cart-drawer-subtotal');
    if (subtotalEl) subtotalEl.textContent = formatMoney(cart.total_price);

    document.querySelectorAll('[data-cart-count]').forEach(el => {
      el.textContent = cart.item_count;
      el.hidden = cart.item_count === 0;
    });

    if (cart.item_count === 0) {
      const itemsEl = document.getElementById('cart-drawer-items');
      if (itemsEl) {
        itemsEl.innerHTML = `
          <div class="flex flex-col items-center justify-center h-full gap-4 opacity-30">
            <span class="material-symbols-outlined text-6xl">shopping_bag</span>
            <p class="font-headline uppercase font-bold tracking-tighter">Your bag is empty</p>
          </div>`;
      }
      const ctaEl = document.getElementById('cart-drawer-cta');
      if (ctaEl) {
        ctaEl.innerHTML = `<a href="/collections/all" class="block w-full py-5 bg-[#353535] text-white/60 font-headline font-black uppercase text-center tracking-tighter text-lg hover:bg-[#ffb4a9] hover:text-[#410000] transition-all">SHOP NOW</a>`;
      }
    }
  } catch(e) { console.error('Cart update failed:', e); }
}

function cartRemoveItem(key) {
  cartUpdateItem(key, 0);
}

// Open drawer after add-to-cart
document.addEventListener('cart:updated', openCartDrawer);

// ── Cart Count ────────────────────────────────────────────────────────────────

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
  try { await fetch('/cart/add.js', { method:'POST', body: new FormData(form) }); await updateCartCount(); openCartDrawer(); } catch(_) {}
  setTimeout(() => { btn.textContent = orig; btn.disabled = false; }, 1500);
});
