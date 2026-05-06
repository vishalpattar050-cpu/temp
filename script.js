// Shopping Cart Functionality
let cart = [];
let cartCount = 0;

// DOM Elements
const cartIcon = document.querySelector('.cart-icon');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.querySelector('.close-cart');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCountElement = document.querySelector('.cart-count');
const tabButtons = document.querySelectorAll('.tab-button');
const productGrids = document.querySelectorAll('.product-grid');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    updateCartDisplay();
});

// Setup Event Listeners
function setupEventListeners() {
    // Cart modal
    cartIcon.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartModal);
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            closeCartModal();
        }
    });

    // Collection tabs
    tabButtons.forEach(button => {
        button.addEventListener('click', switchCollection);
    });

    // Add to cart buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Collection switching
function switchCollection(e) {
    const collection = e.target.dataset.collection;

    // Update tab buttons
    tabButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    // Update product grids
    productGrids.forEach(grid => grid.classList.remove('active'));
    document.getElementById(`${collection}-collection`).classList.add('active');
}

// Add to cart functionality
function addToCart(e) {
    const productCard = e.target.closest('.product-card');
    const productName = productCard.querySelector('h3').textContent;
    const productPrice = parseFloat(productCard.querySelector('.price').textContent.replace('$', '').replace(',', ''));
    const productImage = productCard.querySelector('img').src;

    // Check if product already in cart
    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        });
    }

    cartCount++;
    updateCartDisplay();
    showAddToCartAnimation(e.target);
}

// Show add to cart animation
function showAddToCartAnimation(button) {
    button.textContent = 'Added!';
    button.style.backgroundColor = '#4CAF50';
    setTimeout(() => {
        button.textContent = 'Add to Cart';
        button.style.backgroundColor = '';
    }, 1000);
}

// Update cart display
function updateCartDisplay() {
    cartCountElement.textContent = cartCount;
    cartItems.innerHTML = '';

    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <div>
                <p>$${itemTotal.toFixed(2)}</p>
                <button class="remove-item" data-index="${index}">Remove</button>
            </div>
        `;
        cartItems.appendChild(cartItemElement);
    });

    cartTotal.textContent = total.toFixed(2);

    // Add remove event listeners
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

// Remove from cart
function removeFromCart(e) {
    const index = parseInt(e.target.dataset.index);
    const item = cart[index];

    cartCount -= item.quantity;
    cart.splice(index, 1);

    updateCartDisplay();
}

// Open cart modal
function openCart() {
    cartModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close cart modal
function closeCartModal() {
    cartModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Smooth scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.product-card, .review-card, .stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Hero text animation
document.querySelector('.hero-content h2').style.animation = 'fadeInUp 1s ease-out';
document.querySelector('.hero-content p').style.animation = 'fadeInUp 1s ease-out 0.3s both';
document.querySelector('.cta-button').style.animation = 'fadeInUp 1s ease-out 0.6s both';

// Parallax effect for hero (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
    }
});

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Checkout functionality (placeholder)
document.querySelector('.checkout-btn').addEventListener('click', () => {
    alert('Checkout functionality would be implemented here with payment integration.');
    // In a real application, this would redirect to a checkout page or open a payment modal
});