// Product Data
const products = [
    {
        id: 1,
        name: "Rolex Submariner",
        category: "watches",
        price: 12500,
        image: "attached_assets/stock_images/luxury_rolex_watch_o_aae01201.jpg",
        description: "Iconic luxury diving watch with exceptional craftsmanship and timeless design.",
        featured: true
    },
    {
        id: 2,
        name: "Ferrari 488 GTB",
        category: "cars",
        price: 100000,
        image: "attached_assets/stock_images/red_ferrari_sports_c_543791a2.jpg",
        description: "High-performance Italian sports car with breathtaking acceleration and style.",
        featured: true
    },
    {
        id: 3,
        name: "MacBook Pro 16\"",
        category: "electronics",
        price: 6500,
        image: "attached_assets/stock_images/apple_macbook_pro_la_4b7d6eff.jpg",
        description: "Professional laptop with M2 Pro chip, perfect for creative professionals.",
        featured: true
    },
    {
        id: 4,
        name: "Diamond Tennis Necklace",
        category: "jewelry",
        price: 25000,
        image: "attached_assets/stock_images/diamond_necklace_jew_76dddd81.jpg",
        description: "Exquisite diamond necklace with brilliant cut stones and elegant design.",
        featured: true
    },
    {
        id: 5,
        name: "Designer Leather Sofa",
        category: "furniture",
        price: 10000,
        image: "attached_assets/stock_images/designer_leather_sof_0c2e531b.jpg",
        description: "Premium Italian leather sofa with contemporary design and superior comfort.",
        featured: false
    },
    {
        id: 6,
        name: "Lamborghini Huracán",
        category: "cars",
        price: 125000,
        image: "attached_assets/stock_images/lamborghini_yellow_s_9eb2eebf.jpg",
        description: "Exotic supercar with V10 engine and stunning performance capabilities.",
        featured: true
    },
    {
        id: 7,
        name: "Omega Seamaster",
        category: "watches",
        price: 10000,
        image: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Professional diving watch with Co-Axial movement and ceramic bezel.",
        featured: false
    },
    {
        id: 8,
        name: "Sony A7R V Camera",
        category: "electronics",
        price: 7500,
        image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "High-resolution mirrorless camera with advanced autofocus system.",
        featured: false
    },
    {
        id: 9,
        name: "Cartier Love Bracelet",
        category: "jewelry",
        price: 16500,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Iconic gold bracelet symbolizing eternal love with distinctive design.",
        featured: false
    },
    {
        id: 10,
        name: "Herman Miller Chair",
        category: "furniture",
        price: 5000,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Ergonomic office chair with premium materials and superior comfort.",
        featured: false
    },
    {
        id: 11,
        name: "Designer Evening Gown",
        category: "fashion",
        price: 15000,
        image: "https://images.unsplash.com/photo-1753550577438-63a3dac4bced?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Elegant designer gown perfect for special occasions and events.",
        featured: false
    },
    {
        id: 12,
        name: "Porsche 911 Turbo",
        category: "cars",
        price: 83000,
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Legendary sports car with turbo engine and exceptional handling.",
        featured: true
    }
];

// Application State
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let currentCategory = 'all';
let currentSort = 'featured';

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const cartBtn = document.getElementById('cart-btn');
const wishlistBtn = document.getElementById('wishlist-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const wishlistSidebar = document.getElementById('wishlist-sidebar');
const overlay = document.getElementById('overlay');
const productModal = document.getElementById('product-modal');
const checkoutModal = document.getElementById('checkout-modal');
const cartCount = document.getElementById('cart-count');
const wishlistCount = document.getElementById('wishlist-count');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    updateCartCount();
    updateWishlistCount();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    // Navigation
    cartBtn.addEventListener('click', () => openSidebar('cart'));
    wishlistBtn.addEventListener('click', () => openSidebar('wishlist'));
    
    // Close buttons
    document.getElementById('close-cart').addEventListener('click', closeSidebar);
    document.getElementById('close-wishlist').addEventListener('click', closeSidebar);
    document.getElementById('close-modal').addEventListener('click', closeModal);
    document.getElementById('close-checkout-modal').addEventListener('click', closeCheckoutModal);
    overlay.addEventListener('click', closeAllModals);
    
    // Search and sort
    searchInput.addEventListener('input', handleSearch);
    sortSelect.addEventListener('change', handleSort);
    
    // Category filters
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', handleCategoryFilter);
    });
    
    // Category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            setActiveCategory(category);
            displayProducts();
        });
    });
    
    // Hero CTA
    document.querySelector('.hero-cta').addEventListener('click', function() {
        document.querySelector('.products-section').scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    // Checkout button
    document.getElementById('checkout-btn').addEventListener('click', openCheckoutModal);
}

// Display Products
function displayProducts() {
    let filteredProducts = filterProducts();
    filteredProducts = sortProducts(filteredProducts);
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
                <p style="font-size: 1.2rem; color: var(--text-secondary);">No products found</p>
                <p style="color: var(--text-secondary);">Try adjusting your filters or search terms</p>
            </div>
        `;
        return;
    }
    
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <button class="wishlist-btn-card ${isInWishlist(product.id) ? 'active' : ''}" 
                        onclick="toggleWishlist(${product.id})">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
            <div class="product-info">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">₹${product.price}<span class="product-price-period">/day</span></div>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="openProductModal(${product.id})">
                        <i class="fas fa-calendar-alt"></i> Rent Now
                    </button>
                    <button class="btn btn-secondary" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter Products
function filterProducts() {
    let filtered = products;
    
    // Category filter
    if (currentCategory !== 'all') {
        filtered = filtered.filter(p => p.category === currentCategory);
    }
    
    // Search filter
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm) ||
            getCategoryName(p.category).toLowerCase().includes(searchTerm)
        );
    }
    
    return filtered;
}

// Sort Products
function sortProducts(products) {
    switch (currentSort) {
        case 'price-low':
            return [...products].sort((a, b) => a.price - b.price);
        case 'price-high':
            return [...products].sort((a, b) => b.price - a.price);
        case 'newest':
            return [...products].sort((a, b) => b.id - a.id);
        case 'featured':
        default:
            return [...products].sort((a, b) => {
                if (a.featured && !b.featured) return -1;
                if (!a.featured && b.featured) return 1;
                return a.id - b.id;
            });
    }
}

// Category Management
function handleCategoryFilter(e) {
    const category = e.target.dataset.category;
    setActiveCategory(category);
    displayProducts();
}

function setActiveCategory(category) {
    currentCategory = category;
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });
}

function getCategoryName(category) {
    const names = {
        watches: 'Luxury Watches',
        cars: 'Luxury Cars',
        electronics: 'Electronics',
        furniture: 'Furniture',
        jewelry: 'Jewelry',
        fashion: 'Fashion'
    };
    return names[category] || category;
}

// Search and Sort
function handleSearch() {
    displayProducts();
}

function handleSort(e) {
    currentSort = e.target.value;
    displayProducts();
}

// Cart Management
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCart();
    showNotification('Added to cart!', 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    showNotification('Removed from cart', 'info');
}

function updateCartQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
    cartCount.classList.toggle('show', count > 0);
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartFooter = document.getElementById('cart-footer');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        cartFooter.style.display = 'none';
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">₹${item.price}/day</div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
    
    document.getElementById('cart-total').textContent = total;
    cartFooter.style.display = 'block';
}

// Wishlist Management
function toggleWishlist(productId) {
    const isInList = isInWishlist(productId);
    
    if (isInList) {
        wishlist = wishlist.filter(id => id !== productId);
        showNotification('Removed from wishlist', 'info');
    } else {
        wishlist.push(productId);
        showNotification('Added to wishlist!', 'success');
    }
    
    updateWishlist();
}

function isInWishlist(productId) {
    return wishlist.includes(productId);
}

function updateWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    updateWishlistDisplay();
    // Update wishlist buttons on product cards
    displayProducts();
}

function updateWishlistCount() {
    wishlistCount.textContent = wishlist.length;
    wishlistCount.classList.toggle('show', wishlist.length > 0);
}

function updateWishlistDisplay() {
    const wishlistItems = document.getElementById('wishlist-items');
    
    if (wishlist.length === 0) {
        wishlistItems.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-heart"></i>
                <p>Your wishlist is empty</p>
            </div>
        `;
        return;
    }
    
    const wishlistProducts = products.filter(p => wishlist.includes(p.id));
    
    wishlistItems.innerHTML = wishlistProducts.map(product => `
        <div class="cart-item">
            <img src="${product.image}" alt="${product.name}">
            <div class="cart-item-info">
                <div class="cart-item-title">${product.name}</div>
                <div class="cart-item-price">₹${product.price}/day</div>
                <button class="btn btn-primary" style="margin-top: 0.5rem; padding: 0.5rem 1rem;" 
                        onclick="addToCart(${product.id}); closeSidebar();">
                    Add to Cart
                </button>
            </div>
            <button class="remove-item" onclick="toggleWishlist(${product.id})">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `).join('');
}

// Modal Management
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <div class="product-modal-content">
            <div class="product-modal-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-modal-info">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <div class="product-modal-price">₹${product.price}<span>/day</span></div>
                
                <div class="form-group">
                    <label>Rental Duration</label>
                    <div class="rental-duration">
                        <div>
                            <label>Start Date</label>
                            <input type="date" id="start-date" min="${new Date().toISOString().split('T')[0]}">
                        </div>
                        <div>
                            <label>End Date</label>
                            <input type="date" id="end-date" min="${new Date().toISOString().split('T')[0]}">
                        </div>
                    </div>
                    <div class="duration-summary" id="duration-summary" style="display: none;">
                        <strong>Total: <span id="total-cost">$0</span></strong>
                    </div>
                </div>
                
                <div class="product-actions" style="margin-top: 2rem;">
                    <button class="btn btn-primary" onclick="rentNow(${product.id})" style="flex: 2;">
                        <i class="fas fa-calendar-check"></i> Rent Now
                    </button>
                    <button class="btn btn-secondary" onclick="addToCart(${product.id}); closeModal();">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                    <button class="btn btn-secondary ${isInWishlist(product.id) ? 'active' : ''}" 
                            onclick="toggleWishlist(${product.id}); updateWishlistButton(this, ${product.id});">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Setup date change listeners
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    
    startDateInput.addEventListener('change', updateRentalCost);
    endDateInput.addEventListener('change', updateRentalCost);
    
    function updateRentalCost() {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);
        const durationSummary = document.getElementById('duration-summary');
        const totalCost = document.getElementById('total-cost');
        
        if (startDate && endDate && endDate > startDate) {
            const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
            const cost = days * product.price;
            totalCost.textContent = `₹${cost} (${days} day${days > 1 ? 's' : ''})`;
            durationSummary.style.display = 'block';
        } else {
            durationSummary.style.display = 'none';
        }
    }
    
    openModal();
}

function rentNow(productId) {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    
    if (!startDate || !endDate) {
        showNotification('Please select rental dates', 'error');
        return;
    }
    
    const product = products.find(p => p.id === productId);
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const days = Math.ceil((endDateObj - startDateObj) / (1000 * 60 * 60 * 24));
    
    // Store rental details for checkout
    window.rentalDetails = {
        product,
        startDate,
        endDate,
        days,
        totalCost: days * product.price
    };
    
    closeModal();
    openCheckoutModal();
}

function updateWishlistButton(button, productId) {
    button.classList.toggle('active', isInWishlist(productId));
}

// Checkout Modal
function openCheckoutModal() {
    let checkoutItems = [];
    
    if (window.rentalDetails) {
        // Single item rental
        checkoutItems = [window.rentalDetails];
    } else {
        // Cart checkout
        checkoutItems = cart.map(item => ({
            product: item,
            days: 1, // Default to 1 day for cart items
            totalCost: item.price * item.quantity
        }));
    }
    
    if (checkoutItems.length === 0) {
        showNotification('No items to checkout', 'error');
        return;
    }
    
    showCheckoutStep(1, checkoutItems);
    openCheckoutModalElement();
}

function showCheckoutStep(step, items) {
    const content = document.getElementById('checkout-content');
    const steps = document.querySelectorAll('.step');
    
    // Update step indicators
    steps.forEach((stepEl, index) => {
        stepEl.classList.toggle('active', index + 1 <= step);
    });
    
    switch (step) {
        case 1:
            content.innerHTML = renderRentalDetailsStep(items);
            break;
        case 2:
            content.innerHTML = renderPersonalInfoStep(items);
            break;
        case 3:
            content.innerHTML = renderPaymentStep(items);
            break;
    }
}

function renderRentalDetailsStep(items) {
    const totalCost = items.reduce((sum, item) => sum + item.totalCost, 0);
    
    return `
        <div class="order-summary">
            <h3>Order Summary</h3>
            ${items.map(item => `
                <div class="summary-row">
                    <span>${item.product.name} ${item.days ? `(${item.days} day${item.days > 1 ? 's' : ''})` : ''}</span>
                    <span>₹${item.totalCost}</span>
                </div>
            `).join('')}
            <div class="summary-row summary-total">
                <span>Total</span>
                <span>₹${totalCost}</span>
            </div>
        </div>
        
        <div class="form-group">
            <label>Special Instructions (Optional)</label>
            <textarea id="special-instructions" rows="3" 
                      placeholder="Any special requests or delivery instructions..."></textarea>
        </div>
        
        <button class="btn btn-primary" onclick="showCheckoutStep(2, ${JSON.stringify(items).replace(/"/g, '&quot;')})">
            Continue to Personal Information
        </button>
    `;
}

function renderPersonalInfoStep(items) {
    return `
        <div class="form-group">
            <label>Full Name *</label>
            <input type="text" id="full-name" required>
        </div>
        
        <div class="form-group">
            <label>Email Address *</label>
            <input type="email" id="email" required>
        </div>
        
        <div class="form-group">
            <label>Phone Number *</label>
            <input type="tel" id="phone" required>
        </div>
        
        <div class="form-group">
            <label>Delivery Address *</label>
            <textarea id="address" rows="3" required></textarea>
        </div>
        
        <div style="display: flex; gap: 1rem;">
            <button class="btn btn-secondary" onclick="showCheckoutStep(1, ${JSON.stringify(items).replace(/"/g, '&quot;')})">
                Back
            </button>
            <button class="btn btn-primary" onclick="validatePersonalInfo() && showCheckoutStep(3, ${JSON.stringify(items).replace(/"/g, '&quot;')})">
                Continue to Payment
            </button>
        </div>
    `;
}

function renderPaymentStep(items) {
    const totalCost = items.reduce((sum, item) => sum + item.totalCost, 0);
    
    return `
        <div class="order-summary">
            <h3>Final Order Summary</h3>
            ${items.map(item => `
                <div class="summary-row">
                    <span>${item.product.name}</span>
                    <span>₹${item.totalCost}</span>
                </div>
            `).join('')}
            <div class="summary-row summary-total">
                <span>Total</span>
                <span>₹${totalCost}</span>
            </div>
        </div>
        
        <div class="form-group">
            <label>Payment Method</label>
            <select id="payment-method">
                <option value="credit">Credit Card</option>
                <option value="debit">Debit Card</option>
                <option value="paypal">PayPal</option>
            </select>
        </div>
        
        <div class="form-group">
            <label>Card Number *</label>
            <input type="text" id="card-number" placeholder="1234 5678 9012 3456" required>
        </div>
        
        <div class="rental-duration">
            <div class="form-group">
                <label>Expiry Date *</label>
                <input type="text" id="expiry" placeholder="MM/YY" required>
            </div>
            <div class="form-group">
                <label>CVV *</label>
                <input type="text" id="cvv" placeholder="123" required>
            </div>
        </div>
        
        <div style="display: flex; gap: 1rem;">
            <button class="btn btn-secondary" onclick="showCheckoutStep(2, ${JSON.stringify(items).replace(/"/g, '&quot;')})">
                Back
            </button>
            <button class="btn btn-primary" onclick="processPayment()">
                Complete Rental - ₹${totalCost}
            </button>
        </div>
    `;
}

function validatePersonalInfo() {
    const requiredFields = ['full-name', 'email', 'phone', 'address'];
    let isValid = true;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            field.style.borderColor = 'var(--accent-color)';
            isValid = false;
        } else {
            field.style.borderColor = 'var(--border-color)';
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all required fields', 'error');
    }
    
    return isValid;
}

function processPayment() {
    // Simulate payment processing
    const paymentFields = ['card-number', 'expiry', 'cvv'];
    let isValid = true;
    
    paymentFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            field.style.borderColor = 'var(--accent-color)';
            isValid = false;
        } else {
            field.style.borderColor = 'var(--border-color)';
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all payment fields', 'error');
        return;
    }
    
    // Simulate successful payment
    setTimeout(() => {
        showNotification('Payment successful! Your rental is confirmed.', 'success');
        cart = [];
        updateCart();
        window.rentalDetails = null;
        closeCheckoutModal();
        
        // Show success message
        alert('🎉 Rental Confirmed!\n\nThank you for your rental. You will receive a confirmation email shortly with pickup/delivery details.');
    }, 1500);
    
    showNotification('Processing payment...', 'info');
}

// Sidebar Management
function openSidebar(type) {
    closeSidebar();
    
    if (type === 'cart') {
        updateCartDisplay();
        cartSidebar.classList.add('open');
    } else if (type === 'wishlist') {
        updateWishlistDisplay();
        wishlistSidebar.classList.add('open');
    }
    
    overlay.classList.add('open');
}

function closeSidebar() {
    cartSidebar.classList.remove('open');
    wishlistSidebar.classList.remove('open');
    overlay.classList.remove('open');
}

// Modal Management
function openModal() {
    productModal.classList.add('open');
    overlay.classList.add('open');
}

function closeModal() {
    productModal.classList.remove('open');
    overlay.classList.remove('open');
}

function openCheckoutModalElement() {
    checkoutModal.classList.add('open');
    overlay.classList.add('open');
}

function closeCheckoutModal() {
    checkoutModal.classList.remove('open');
    overlay.classList.remove('open');
    window.rentalDetails = null;
}

function closeAllModals() {
    closeSidebar();
    closeModal();
    closeCheckoutModal();
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-lg);
        z-index: 9999;
        transform: translateX(100%);
        transition: var(--transition);
        max-width: 300px;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeAllModals();
    }
});

// Scroll to top functionality
window.addEventListener('scroll', function() {
    const scrollTop = document.createElement('button');
    if (!document.getElementById('scroll-top')) {
        scrollTop.id = 'scroll-top';
        scrollTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollTop.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            width: 3rem;
            height: 3rem;
            cursor: pointer;
            box-shadow: var(--shadow-lg);
            transition: var(--transition);
            opacity: ${window.scrollY > 500 ? '1' : '0'};
            pointer-events: ${window.scrollY > 500 ? 'auto' : 'none'};
            z-index: 998;
        `;
        
        scrollTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        document.body.appendChild(scrollTop);
    } else {
        const existing = document.getElementById('scroll-top');
        existing.style.opacity = window.scrollY > 500 ? '1' : '0';
        existing.style.pointerEvents = window.scrollY > 500 ? 'auto' : 'none';
    }
});