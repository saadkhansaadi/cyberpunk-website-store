document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('soulthread_cart')) || [];

    if (cart.length === 0) {
        if (typeof showToast === 'function') showToast('Your cart is empty. Returning to shop.', 'error');
        setTimeout(() => { window.location.href = "shop.html"; }, 1500);
        return;
    }

    // Render Order Summary
    const itemsList = document.getElementById('checkoutItemsList');
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        itemsList.innerHTML += `
            <div class="summary-item">
                <div style="display:flex;align-items:center;gap:15px;">
                    <img src="${item.image}" alt="${item.name}">
                    <div>
                        <p style="font-size:14px;margin:0;color:var(--text-light);">${item.name}</p>
                        <p style="font-size:12px;margin:5px 0 0;color:var(--text-muted);">Qty: ${item.quantity}</p>
                    </div>
                </div>
                <div style="font-weight:bold;font-size:14px;">
                    $${(item.price * item.quantity).toFixed(2)}
                </div>
            </div>`;
    });

    const shipping = subtotal > 50 ? 0 : 15.00;
    const total = subtotal + shipping;

    document.getElementById('checkoutSubtotal').innerText = `$${subtotal.toFixed(2)}`;
    document.getElementById('checkoutTotal').innerText = `$${total.toFixed(2)}`;

    // Handle Form Submission — Save real order
    const checkoutForm = document.getElementById('checkoutForm');
    const processingModal = document.getElementById('processingModal');
    const processingText = document.getElementById('processingText');

    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        processingModal.style.display = 'flex';

        setTimeout(() => {
            processingText.innerText = "Authorizing transaction...";
        }, 1500);

        setTimeout(() => {
            processingText.style.color = "var(--secondary)";
            processingText.innerText = "Transaction Successful!";
            document.querySelector('#processingModal i').className = "fa-solid fa-circle-check";
            document.querySelector('#processingModal i').style.color = "var(--secondary)";
            document.querySelector('#processingModal i').classList.remove('fa-spin');
        }, 3000);

        setTimeout(() => {
            // Generate order ID
            const orderId = "ST-" + Date.now().toString(36).toUpperCase();

            // Build order object
            const order = {
                id: orderId,
                items: cart.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image
                })),
                subtotal: subtotal,
                shipping: shipping,
                total: total,
                date: new Date().toISOString(),
                status: 'processing'
            };

            // Save to soulthread_orders
            let orders = JSON.parse(localStorage.getItem('soulthread_orders')) || [];
            orders.unshift(order); // newest first
            localStorage.setItem('soulthread_orders', JSON.stringify(orders));

            // Clear cart
            localStorage.removeItem('soulthread_cart');

            // Redirect home
            window.location.href = "index.html";
        }, 5000);
    });
});
