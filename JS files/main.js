document.addEventListener("DOMContentLoaded", async () => {
    // 1. Load Components
    await loadComponents();

    // 2. Initialize Scroll Reveals
    initScrollReveals();

    // 3. Initialize Sticky Header
    initStickyHeader();

    // 4. Update Cart Count initially
    updateCartCountUI();

    // 5. Initialize Live Carousel
    initCarousel();

    // 6. FOMO Alert
    initFomoAlert();

    // 7. Cursor Glow
    initCursorGlow();

    // 8. Quick View Modal
    initQuickView();

    // 9. Wishlist
    initWishlist();

    // 10. Toast Container
    initToastContainer();

    // 11. Mobile Nav
    initMobileNav();

    // 12. Typewriter Effect
    initTypewriter();

    // 13. FAQ Accordion
    initFAQ();

    // 14. Page Load Transition (Cyber Preloader)
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
                document.body.classList.add('loaded');
            }, 600);
        } else {
            document.body.classList.add('loaded');
        }
    }, 1800); 

    // 15. Support Button
    initSupportButton();
});

// =============================
//  COMPONENT LOADER
// =============================
async function loadComponents() {
    try {
        const navPlaceholder = document.getElementById('navbar-placeholder');
        if (navPlaceholder) {
            const navRes = await fetch('Components/navbar.html');
            if (navRes.ok) {
                navPlaceholder.innerHTML = await navRes.text();
                highlightActiveNav();
                updateCartCountUI();
                updateWishlistUI();
            }
        }

        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            const footerRes = await fetch('Components/footer.html');
            if (footerRes.ok) {
                footerPlaceholder.innerHTML = await footerRes.text();
                const scripts = footerPlaceholder.querySelectorAll('script');
                scripts.forEach(script => {
                    const newScript = document.createElement('script');
                    newScript.text = script.innerText;
                    document.body.appendChild(newScript);
                });
            }
        }
    } catch (e) {
        console.error("Error loading components", e);
    }
}

function highlightActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        if (item.getAttribute('data-page') === currentPage) {
            item.style.color = 'var(--text-light)';
            item.style.borderBottom = '2px solid var(--primary)';
        } else {
            item.style.color = 'var(--text-muted)';
            item.style.borderBottom = 'none';
        }
    });
}

// =============================
//  SCROLL REVEAL
// =============================
function initScrollReveals() {
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        let windowHeight = window.innerHeight;
        let elementVisible = 50;
        reveals.forEach(el => {
            let elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); 
}

// =============================
//  STICKY HEADER
// =============================
function initStickyHeader() {
    window.addEventListener('scroll', () => {
        const dynHeader = document.querySelector('.header');
        if (dynHeader) {
            if (window.scrollY > 50) {
                dynHeader.style.background = 'rgba(9, 9, 11, 0.98)';
                dynHeader.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
            } else {
                dynHeader.style.background = 'var(--glass-bg)';
                dynHeader.style.boxShadow = 'none';
            }
        }
    });
}

// =============================
//  CART COUNT UI
// =============================
function updateCartCountUI() {
    const cartCountEl = document.getElementById('cartCount');
    if (cartCountEl) {
        const cart = JSON.parse(localStorage.getItem('soulthread_cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountEl.textContent = totalItems;
        cartCountEl.style.transform = 'scale(1.3)';
        setTimeout(() => cartCountEl.style.transform = 'scale(1)', 200);
    }
}

// =============================
//  CAROUSEL
// =============================
function initCarousel() {
    const carousel = document.getElementById('productCarousel');
    if (!carousel) return;
    
    let autoScrollSpeed = 1;
    let autoScrollInterval;

    const startAutoScroll = () => {
        autoScrollInterval = setInterval(() => {
            carousel.scrollLeft += autoScrollSpeed;
            if (carousel.scrollLeft >= (carousel.scrollWidth - carousel.clientWidth)) {
                carousel.scrollLeft = 0;
            }
        }, 20);
    };

    const stopAutoScroll = () => clearInterval(autoScrollInterval);

    startAutoScroll();
    carousel.addEventListener('mouseenter', stopAutoScroll);
    carousel.addEventListener('mouseleave', startAutoScroll);

    window.jumpCarouselStart = () => { carousel.scrollLeft = 0; };
    window.jumpCarouselEnd = () => { carousel.scrollLeft = carousel.scrollWidth; };
}

// =============================
//  FOMO ALERT
// =============================
function initFomoAlert() {
    if (window.location.pathname.includes('offers.html') || window.location.pathname.includes('cart.html')) return;

    const fomoHTML = `
        <div class="fomo-alert" id="fomoAlert" onclick="location.href='offers.html'">
            <i class="fa-solid fa-xmark fomo-close" onclick="event.stopPropagation(); this.parentElement.style.display='none';"></i>
            <img src="../products/hoodie_prod_1777238758809.png" alt="Flash Sale">
            <div class="fomo-alert-text">
                <h4>Cyber Week Drop!</h4>
                <p>Up to 50% OFF - Grab Now <i class="fa-solid fa-arrow-right"></i></p>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', fomoHTML);
    setTimeout(() => {
        const alert = document.getElementById('fomoAlert');
        if(alert) alert.classList.add('show');
    }, 3000);
}

// =============================
//  TOAST NOTIFICATION SYSTEM
// =============================
function initToastContainer() {
    if (!document.querySelector('.toast-container')) {
        const container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
}

window.showToast = function(message, type = 'info') {
    const container = document.querySelector('.toast-container');
    if (!container) return;

    const icons = {
        success: 'fa-circle-check',
        error: 'fa-circle-xmark',
        info: 'fa-circle-info'
    };

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<i class="fa-solid ${icons[type] || icons.info}"></i><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

// =============================
//  CURSOR GLOW EFFECT
// =============================
function initCursorGlow() {
    if (window.innerWidth < 768) return;

    const glow = document.createElement('div');
    glow.id = 'cursor-glow';
    document.body.appendChild(glow);

    const dot = document.createElement('div');
    dot.id = 'cursor-dot';
    document.body.appendChild(dot);

    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
    });
}

// =============================
//  QUICK VIEW MODAL
// =============================
function initQuickView() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'quick-view-overlay';
    overlay.id = 'quickViewOverlay';
    overlay.innerHTML = `
        <button class="quick-view-close" onclick="closeQuickView()">
            <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="quick-view-modal">
            <img id="qvImage" src="" alt="">
            <div class="quick-view-details" id="qvDetails"></div>
        </div>
    `;
    document.body.appendChild(overlay);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeQuickView();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeQuickView();
    });
}

window.openQuickView = function(productId) {
    if (typeof getProductById !== 'function') return;
    const product = getProductById(productId);
    if (!product) return;

    const overlay = document.getElementById('quickViewOverlay');
    document.getElementById('qvImage').src = product.image;

    const priceDisplay = product.starting_price
        ? `From $${product.starting_price.toFixed(2)}`
        : `$${product.price.toFixed(2)}`;

    let badgesHTML = '';
    if (product.product_type === 'print') {
        badgesHTML = `
            <div style="display:flex;gap:6px;flex-wrap:wrap;margin:10px 0;">
                <span class="art-badge badge-digital"><i class="fa-solid fa-pen-nib"></i> Created Digitally</span>
                <span class="art-badge badge-resolution">${product.resolution || '8K'} · ${product.dpi || 300}DPI</span>
            </div>`;
    }
    if (product.product_type === 'service') {
        badgesHTML = `
            <div style="display:flex;gap:6px;flex-wrap:wrap;margin:10px 0;">
                <span class="art-badge badge-digital"><i class="fa-solid fa-wand-magic-sparkles"></i> Commission</span>
                <span class="art-badge badge-resolution"><i class="fa-solid fa-clock"></i> ${product.turnaround_days} days</span>
            </div>`;
    }

    const ctaText = product.product_type === 'service' ? 'Request Custom Art' : 'Add to Cart';
    const ctaAction = product.product_type === 'service'
        ? `location.href='customize.html'`
        : `handleAdd(this, '${product.id}', '${product.name}', ${product.price}, '${product.image}'); closeQuickView();`;

    document.getElementById('qvDetails').innerHTML = `
        <span style="color:var(--primary);text-transform:uppercase;letter-spacing:2px;font-size:12px;font-weight:bold;">${product.category}</span>
        <h2 style="font-size:32px;margin:10px 0;">${product.name}</h2>
        ${badgesHTML}
        <p style="font-size:28px;color:var(--text-light);font-weight:300;margin:15px 0;">${priceDisplay}</p>
        <p style="color:var(--text-muted);line-height:1.6;margin-bottom:25px;">${product.description}</p>
        <button class="btn-pro btn-glow" style="width:100%;padding:16px;" onclick="${ctaAction}">
            <i class="fa-solid fa-cart-plus" style="margin-right:8px;"></i> ${ctaText}
        </button>
        <a href="product.html?id=${product.id}" style="display:block;text-align:center;margin-top:15px;color:var(--text-muted);font-size:14px;">View Full Details →</a>
    `;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
};

window.closeQuickView = function() {
    const overlay = document.getElementById('quickViewOverlay');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
};

// =============================
//  WISHLIST SYSTEM
// =============================
function initWishlist() {
    // Nothing to init — functions are global
}

window.toggleWishlist = function(productId, btnElement) {
    let wishlist = JSON.parse(localStorage.getItem('soulthread_wishlist')) || [];
    const index = wishlist.indexOf(productId);

    if (index > -1) {
        wishlist.splice(index, 1);
        if (btnElement) btnElement.classList.remove('active', 'wishlist-active');
        showToast('Removed from wishlist', 'info');
    } else {
        wishlist.push(productId);
        if (btnElement) btnElement.classList.add('active', 'wishlist-active');
        showToast('Added to wishlist!', 'success');
    }

    localStorage.setItem('soulthread_wishlist', JSON.stringify(wishlist));
    updateWishlistUI();
};

function isInWishlist(productId) {
    const wishlist = JSON.parse(localStorage.getItem('soulthread_wishlist')) || [];
    return wishlist.includes(productId);
}

function updateWishlistUI() {
    const badge = document.getElementById('wishlistCount');
    if (badge) {
        const wishlist = JSON.parse(localStorage.getItem('soulthread_wishlist')) || [];
        badge.textContent = wishlist.length;
        badge.style.display = wishlist.length > 0 ? 'flex' : 'none';
    }
}

// =============================
//  MOBILE NAV
// =============================
function initMobileNav() {
    document.addEventListener('click', (e) => {
        if (e.target.closest('#hamburger-btn')) {
            const overlay = document.getElementById('mobileNavOverlay');
            if (overlay) overlay.classList.add('active');
        }
        if (e.target.closest('.mobile-nav-close')) {
            const overlay = document.getElementById('mobileNavOverlay');
            if (overlay) overlay.classList.remove('active');
        }
    });
}
// =============================
//  TYPEWRITER EFFECT (FIXED & FASTER)
// =============================
function initTypewriter() {
    const target = document.getElementById('typewriter');
    if (!target) return;

    const words = ["Identity.", "Future.", "Culture.", "Vision."];
    let wordIndex = 0;

    async function type() {
        const word = words[wordIndex];
        
        // Typing phase
        for (let i = 0; i <= word.length; i++) {
            target.textContent = word.substring(0, i);
            await new Promise(r => setTimeout(r, 70)); // Fast typing
        }

        await new Promise(r => setTimeout(r, 2000)); // Pause at end

        // Erasing phase (Rapid erasure)
        for (let i = word.length; i >= 0; i--) {
            target.textContent = word.substring(0, i);
            await new Promise(r => setTimeout(r, 20)); // Extremely fast erase
        }

        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500); // Pause before next word
    }
    type();
}

// =============================
//  FAQ ACCORDION (SMOOTH TRANSITION)
// =============================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all others with animation
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });

            // Toggle current
            if (!isActive) {
                item.classList.add('active');
                // Use scrollHeight for perfect smooth transition
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                item.classList.remove('active');
                answer.style.maxHeight = null;
            }
        });
    });
}

// =============================
//  SUPPORT BUTTON LOGIC
// =============================
function initSupportButton() {
    const btnHTML = `
        <a href="contact.html" class="support-trigger" id="supportBtn">
            <i class="fa-solid fa-headset"></i>
            <span>Contact Support</span>
        </a>
    `;
    document.body.insertAdjacentHTML('beforeend', btnHTML);
}

// =============================
//  NEWSLETTER SUBSCRIPTION
// =============================
window.subscribeNewsletter = function() {
    const emailInput = document.getElementById('newsletterEmail');
    if (!emailInput) return;

    const email = emailInput.value.trim();
    if (!email || !email.includes('@')) {
        if (typeof showToast === 'function') {
            showToast('Please enter a valid digital identifier (Email).', 'error');
        } else {
            alert('Please enter a valid email.');
        }
        return;
    }

    // Redirect to the success "pixel perfect" page
    window.location.href = 'welcome-grid.html';
};
