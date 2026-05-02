// =============================
//  SHOP.JS — Full Filter, Sort, Load More, Layout Toggle
// =============================

let currentCategory = 'All';
let currentMaxPrice = 500;
let currentSort = 'latest';
let shownCount = 8;
let filteredProducts = [];

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial filter + render
    applyFilters();

    // 2. Check URL search param
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    if (searchQuery) {
        filteredProducts = products.filter(p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        const searchTitle = document.getElementById('searchResultsTitle');
        const searchText = document.getElementById('searchQueryText');
        if (searchTitle) searchTitle.style.display = 'block';
        if (searchText) searchText.innerText = `"${searchQuery}"`;

        document.querySelectorAll('#category-filters a').forEach(a => a.classList.remove('active'));
        shownCount = 8;
        renderShopProducts(filteredProducts.slice(0, shownCount));
        buildFilterPills();
    }


    // Category from URL param (from category cards)
const catParam = new URLSearchParams(window.location.search).get('cat');
if (catParam) {
  currentCategory = catParam;
  const matchLink = [...document.querySelectorAll('#category-filters a')]
    .find(a => a.textContent.trim().toLowerCase().includes(catParam.toLowerCase()));
  if (matchLink) {
    document.querySelectorAll('#category-filters a').forEach(a => a.classList.remove('active'));
    matchLink.classList.add('active');
  }
}

    // 3. Price range
    const priceRange = document.getElementById('price-range');
    const priceDisplay = document.getElementById('price-display');
    if (priceRange) {
        priceRange.addEventListener('input', () => {
            currentMaxPrice = parseInt(priceRange.value);
            if (priceDisplay) priceDisplay.textContent = `$${currentMaxPrice}`;
            shownCount = 8;
            applyFilters();
        });
    }

    // 4. Sort dropdown
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            currentSort = sortSelect.value;
            shownCount = 8;
            applyFilters();
        });
    }

    // 5. Load More
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            shownCount += 4;
            renderShopProducts(filteredProducts.slice(0, shownCount));
            updateLoadMoreBtn();
            // Smooth scroll to new items
            setTimeout(() => {
                const cards = document.querySelectorAll('#shop-grid .pro-card');
                if (cards.length > 0) {
                    cards[cards.length - Math.min(4, cards.length)].scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        });
    }

    // 6. Layout toggle
    const gridBtn = document.getElementById('layout-grid');
    const galleryBtn = document.getElementById('layout-gallery');
    const savedLayout = localStorage.getItem('st_layout') || 'grid';
    if (savedLayout === 'gallery') {
        document.getElementById('shop-grid')?.classList.add('gallery-mode');
        if (galleryBtn) galleryBtn.classList.add('active');
        if (gridBtn) gridBtn.classList.remove('active');
    }

    if (gridBtn) {
        gridBtn.addEventListener('click', () => {
            document.getElementById('shop-grid')?.classList.remove('gallery-mode');
            gridBtn.classList.add('active');
            galleryBtn?.classList.remove('active');
            localStorage.setItem('st_layout', 'grid');
        });
    }
    if (galleryBtn) {
        galleryBtn.addEventListener('click', () => {
            document.getElementById('shop-grid')?.classList.add('gallery-mode');
            galleryBtn.classList.add('active');
            gridBtn?.classList.remove('active');
            localStorage.setItem('st_layout', 'gallery');
        });
    }
});

// =============================
//  APPLY ALL FILTERS
// =============================
function applyFilters() {
    // 1. Category filter
    let result = currentCategory === 'All' ? [...products] : products.filter(p => p.category === currentCategory);

    // 2. Price filter
    result = result.filter(p => {
        const price = p.starting_price || p.price;
        return price <= currentMaxPrice;
    });

    // 3. Sort
    switch (currentSort) {
        case 'price-asc':
            result.sort((a, b) => (a.starting_price || a.price) - (b.starting_price || b.price));
            break;
        case 'price-desc':
            result.sort((a, b) => (b.starting_price || b.price) - (a.starting_price || a.price));
            break;
        case 'name-az':
            result.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'latest':
        default:
            break;
    }

    filteredProducts = result;
    renderShopProducts(filteredProducts.slice(0, shownCount));
    updateLoadMoreBtn();
    buildFilterPills();
}

// =============================
//  RENDER PRODUCT CARDS
// =============================
function renderShopProducts(productsToRender) {
    const grid = document.getElementById('shop-grid');
    const noResults = document.getElementById('no-results');
    const countText = document.getElementById('productCountText');

    if (!grid) return;
    grid.innerHTML = '';

    if (countText) {
        countText.innerText = `Showing ${productsToRender.length} of ${filteredProducts.length} products`;
    }

    if (productsToRender.length === 0) {
        if (noResults) noResults.style.display = 'block';
        return;
    }
    if (noResults) noResults.style.display = 'none';

    productsToRender.forEach((prod, index) => {
        const delay = (index % 4) * 0.08;
        const cardClass = getCardTierClass(prod.product_type);
        const badgeText = getCardBadgeText(prod.product_type);
        const wishlistActive = isInWishlistCheck(prod.id) ? 'active' : '';
        const priceDisplay = prod.starting_price ? `From $${prod.starting_price.toFixed(2)}` : `$${prod.price.toFixed(2)}`;

        let extraHTML = '';

        // Tier-specific extras
        if (prod.product_type === 'apparel' && prod.colors) {
            const swatches = prod.colors.map(c => `<span class="color-swatch" style="background:${c}"></span>`).join('');
            const dots = (prod.sizes || []).slice(0, 4).map(s => `<span class="size-dot">${s}</span>`).join('');
            extraHTML = `<div class="color-swatches">${swatches}</div><div class="size-dots">${dots}</div>`;
        }
        if (prod.product_type === 'print') {
            extraHTML = `<span class="resolution-badge">8K · 300DPI</span>`;
            if (prod.frame_options) {
                const frames = prod.frame_options.slice(0, 3).map(f => `<span class="frame-opt">${f}</span>`).join('');
                extraHTML += `<div class="frame-options">${frames}</div>`;
            }
        }
        if (prod.product_type === 'service') {
            extraHTML = `<div class="turnaround-info">
                <span><i class="fa-solid fa-clock"></i> ${prod.turnaround_days} days</span>
                <span><i class="fa-solid fa-rotate"></i> ${prod.revision_rounds} revisions</span>
            </div>`;
        }

        const ctaText = prod.product_type === 'service' ? 'Request Custom Art' : 'View Details';
        const ctaHref = prod.product_type === 'service' ? 'customize.html' : `product.html?id=${prod.id}`;

        grid.innerHTML += `
            <div class="pro-card ${cardClass} reveal active" style="transition-delay:${delay}s;" data-type="${prod.product_type}">
                <span class="card-badge">${badgeText}</span>
                <button class="wishlist-heart ${wishlistActive}" onclick="event.stopPropagation(); toggleWishlist('${prod.id}', this)">
                    <i class="fa-solid fa-heart"></i>
                </button>
                <div class="card-overlay">
                    <button class="overlay-btn" onclick="openQuickView('${prod.id}')" title="Quick View">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                    <button class="overlay-btn" onclick="location.href='${ctaHref}'" title="View">
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
                <img src="${prod.image}" alt="${prod.name}" onclick="location.href='product.html?id=${prod.id}'" style="cursor:pointer;">
                <h3 onclick="location.href='product.html?id=${prod.id}'" style="cursor:pointer;">${prod.name}</h3>
                <p style="color:var(--text-light);font-size:18px;font-weight:600;margin-bottom:5px;">${priceDisplay}</p>
                ${extraHTML}
                <button class="btn-pro btn-outline" style="width:100%;padding:12px;font-size:13px;margin-top:auto;"
                    onclick="location.href='${ctaHref}'">${ctaText}</button>
            </div>
        `;
    });
}

function getCardTierClass(type) {
    switch (type) {
        case 'apparel': return 'card-apparel';
        case 'print': return 'card-print';
        case 'service': return 'card-service';
        case 'gaming': return 'card-print';
        case 'accessory': return '';
        default: return '';
    }
}

function getCardBadgeText(type) {
    switch (type) {
        case 'apparel': return 'WEARABLE ART';
        case 'print': return 'DIGITAL ORIGINAL · PRINTABLE';
        case 'service': return 'COMMISSION';
        case 'gaming': return 'GAMING GEAR';
        case 'accessory': return 'ACCESSORY';
        default: return 'PRODUCT';
    }
}

function isInWishlistCheck(id) {
    const wl = JSON.parse(localStorage.getItem('soulthread_wishlist')) || [];
    return wl.includes(id);
}

// =============================
//  LOAD MORE
// =============================
function updateLoadMoreBtn() {
    const btn = document.getElementById('load-more-btn');
    if (!btn) return;
    if (shownCount >= filteredProducts.length) {
        btn.style.display = 'none';
    } else {
        btn.style.display = 'inline-block';
    }
}

// =============================
//  CATEGORY FILTER
// =============================
window.filterCategory = function(category, element) {
    event.preventDefault();
    currentCategory = category;
    shownCount = 8;

    document.querySelectorAll('#category-filters a').forEach(a => a.classList.remove('active'));
    if (element) element.classList.add('active');

    const searchTitle = document.getElementById('searchResultsTitle');
    if (searchTitle) searchTitle.style.display = 'none';
    window.history.replaceState({}, document.title, window.location.pathname);

    applyFilters();
};

// =============================
//  FILTER PILLS
// =============================
function buildFilterPills() {
    const container = document.getElementById('filter-pills');
    if (!container) return;
    container.innerHTML = '';

    if (currentCategory !== 'All') {
        container.innerHTML += `<div class="filter-pill">Category: ${currentCategory} <button onclick="clearCategoryFilter()">×</button></div>`;
    }
    if (currentMaxPrice < 500) {
        container.innerHTML += `<div class="filter-pill">Max: $${currentMaxPrice} <button onclick="clearPriceFilter()">×</button></div>`;
    }
    if (currentSort !== 'latest') {
        const sortLabels = { 'price-asc': 'Price ↑', 'price-desc': 'Price ↓', 'name-az': 'A-Z' };
        container.innerHTML += `<div class="filter-pill">Sort: ${sortLabels[currentSort] || currentSort} <button onclick="clearSortFilter()">×</button></div>`;
    }
}

window.clearCategoryFilter = function() {
    currentCategory = 'All';
    document.querySelectorAll('#category-filters a').forEach(a => a.classList.remove('active'));
    const allLink = document.querySelector('#category-filters a[onclick*="All"]');
    if (allLink) allLink.classList.add('active');
    shownCount = 8;
    applyFilters();
};

window.clearPriceFilter = function() {
    currentMaxPrice = 500;
    const priceRange = document.getElementById('price-range');
    const priceDisplay = document.getElementById('price-display');
    if (priceRange) priceRange.value = 500;
    if (priceDisplay) priceDisplay.textContent = '$500';
    shownCount = 8;
    applyFilters();
};

window.clearSortFilter = function() {
    currentSort = 'latest';
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) sortSelect.value = 'latest';
    shownCount = 8;
    applyFilters();
};
