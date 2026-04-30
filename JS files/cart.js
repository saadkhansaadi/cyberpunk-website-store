// =============================
//  CART.JS — Full Cart Engine with Toast & Shipping Progress
// =============================

function addToCart(id, name, price, imagePath, productType) {
    let cart = JSON.parse(localStorage.getItem('soulthread_cart')) || [];
    let existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, image: imagePath, quantity: 1, product_type: productType || 'apparel' });
    }
    localStorage.setItem('soulthread_cart', JSON.stringify(cart));
    if (typeof updateCartCountUI === 'function') updateCartCountUI();
}

// Button click handler with visual feedback
window.handleAdd = function(btnElement, id, name, price, img, productType) {
    addToCart(id, name, price, img, productType);
    if (typeof showToast === 'function') {
        showToast(`${name} added to cart!`, 'success');
    }
    let originalText = btnElement.innerHTML;
    btnElement.innerHTML = '<i class="fa-solid fa-check"></i> Added!';
    btnElement.classList.remove('btn-glow');
    btnElement.style.background = 'var(--accent)';
    btnElement.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.5)';
    setTimeout(() => {
        btnElement.innerHTML = originalText;
        btnElement.classList.add('btn-glow');
        btnElement.style.background = '';
        btnElement.style.boxShadow = '';
    }, 1500);
};

function renderCartItems() {
    const cartContainer = document.getElementById('cart-items-container');
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');
    const shippingEl = document.getElementById('cart-shipping');
    const shippingProgress = document.getElementById('shipping-progress-section');

    if (!cartContainer) return;

    let cart = JSON.parse(localStorage.getItem('soulthread_cart')) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="pro-card" style="text-align:center;padding:60px 20px;">
                <i class="fa-solid fa-cart-arrow-down" style="font-size:60px;color:var(--border-light);margin-bottom:20px;"></i>
                <h2>Your Cart is Empty</h2>
                <p style="color:var(--text-muted);margin-top:10px;margin-bottom:30px;">Looks like you haven't added any premium gear yet.</p>
                <a href="shop.html" class="btn-pro btn-glow">Return to Arsenal</a>
            </div>`;
        if (subtotalEl) subtotalEl.textContent = "$0.00";
        if (totalEl) totalEl.textContent = "$0.00";
        if (shippingEl) shippingEl.textContent = "$0.00";
        if (shippingProgress) shippingProgress.style.display = 'none';
        return;
    }

    let html = '';
    let subtotal = 0;

    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        html += `
            <div class="pro-card" style="display:flex;flex-direction:row;align-items:center;gap:20px;margin-bottom:20px;padding:20px;flex-wrap:wrap;">
                <img src="${item.image}" alt="${item.name}" style="width:100px;height:100px;object-fit:cover;border-radius:12px;margin-bottom:0;">
                <div style="flex:1;min-width:150px;text-align:left;">
                    <h3 style="font-size:18px;margin-bottom:5px;">${item.name}</h3>
                    <p style="color:var(--primary);font-weight:600;font-size:16px;margin:0;">$${item.price.toFixed(2)}</p>
                </div>
                <div style="display:flex;align-items:center;gap:15px;background:rgba(0,0,0,0.5);padding:5px 15px;border-radius:50px;border:1px solid var(--border-light);">
                    <button onclick="updateQuantity('${item.id}', -1)" style="background:transparent;border:none;color:var(--text-muted);cursor:pointer;font-size:18px;padding:0 5px;">-</button>
                    <span style="font-size:16px;font-weight:bold;width:20px;text-align:center;">${item.quantity}</span>
                    <button onclick="updateQuantity('${item.id}', 1)" style="background:transparent;border:none;color:var(--text-light);cursor:pointer;font-size:18px;padding:0 5px;">+</button>
                </div>
                <div style="width:90px;text-align:right;">
                    <p style="font-weight:800;font-size:18px;">$${itemTotal.toFixed(2)}</p>
                </div>
                <button onclick="removeFromCart('${item.id}')" style="background:transparent;border:none;color:#ef4444;cursor:pointer;padding:10px;font-size:18px;transition:0.3s;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>`;
    });

    cartContainer.innerHTML = html;

    if (subtotalEl) subtotalEl.textContent = "$" + subtotal.toFixed(2);
    let shipping = subtotal > 50 ? 0 : 15;
    if (shippingEl) shippingEl.textContent = shipping === 0 ? "Free" : "$" + shipping.toFixed(2);
    let total = subtotal + shipping;
    if (totalEl) totalEl.textContent = "$" + total.toFixed(2);

    // Update shipping progress bar
    if (shippingProgress) {
        if (subtotal >= 50) {
            shippingProgress.innerHTML = `
                <div class="shipping-progress">
                    <p style="font-size:13px;color:var(--accent);margin:0;"><i class="fa-solid fa-check-circle"></i> You qualify for FREE shipping!</p>
                    <div class="shipping-progress-bar"><div class="shipping-progress-fill" style="width:100%"></div></div>
                </div>`;
        } else {
            const remaining = (50 - subtotal).toFixed(2);
            const pct = Math.min((subtotal / 50) * 100, 100);
            shippingProgress.innerHTML = `
                <div class="shipping-progress">
                    <p style="font-size:13px;color:var(--text-muted);margin:0;">Add <strong style="color:var(--primary);">$${remaining}</strong> more for <strong style="color:var(--accent);">FREE shipping</strong></p>
                    <div class="shipping-progress-bar"><div class="shipping-progress-fill" style="width:${pct}%"></div></div>
                </div>`;
        }
        shippingProgress.style.display = 'block';
    }
}

window.updateQuantity = function(id, change) {
    let cart = JSON.parse(localStorage.getItem('soulthread_cart')) || [];
    let existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += change;
        if (existingItem.quantity <= 0) {
            cart = cart.filter(item => item.id !== id);
        }
    }
    localStorage.setItem('soulthread_cart', JSON.stringify(cart));
    if (typeof updateCartCountUI === 'function') updateCartCountUI();
    renderCartItems();
};

window.removeFromCart = function(id) {
    let cart = JSON.parse(localStorage.getItem('soulthread_cart')) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('soulthread_cart', JSON.stringify(cart));
    if (typeof updateCartCountUI === 'function') updateCartCountUI();
    if (typeof showToast === 'function') showToast('Item removed from cart', 'info');
    renderCartItems();
};

document.addEventListener("DOMContentLoaded", () => {
    renderCartItems();
});
