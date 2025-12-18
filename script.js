// Category Filtering
document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    // Filter function
    function filterMenu(category) {
        menuCategories.forEach(section => {
            if (category === 'all' || section.dataset.category === category) {
                section.style.display = 'block';
                section.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                section.style.display = 'none';
            }
        });
    }
    
    // Add click events to category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get category from data attribute
            const category = this.dataset.category;
            
            // Filter menu
            filterMenu(category);
            
            // Smooth scroll to menu section
            document.querySelector('.menu-grid').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
    
    // Optional: Search functionality
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = '🔍 Search menu items...';
    searchInput.style.cssText = `
        padding: 12px 20px;
        margin: 20px auto;
        display: block;
        width: 80%;
        max-width: 500px;
        border: 2px solid #8B4513;
        border-radius: 30px;
        font-size: 16px;
        outline: none;
        transition: all 0.3s ease;
        box-shadow: 0 4px 8px rgba(139, 69, 19, 0.1);
    `;
    
    // Insert search bar after hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.parentNode.insertBefore(searchInput, hero.nextSibling);
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            // If search is empty, show all items
            if (searchTerm === '') {
                menuCategories.forEach(category => {
                    category.style.display = 'block';
                    const items = category.querySelectorAll('.menu-item');
                    items.forEach(item => item.style.display = 'flex');
                });
                return;
            }
            
            // Search through items
            let foundItems = false;
            menuCategories.forEach(category => {
                const items = category.querySelectorAll('.menu-item');
                let categoryHasVisibleItems = false;
                
                items.forEach(item => {
                    const itemName = item.querySelector('h3').textContent.toLowerCase();
                    const itemDesc = item.querySelector('p').textContent.toLowerCase();
                    
                    if (itemName.includes(searchTerm) || itemDesc.includes(searchTerm)) {
                        item.style.display = 'flex';
                        categoryHasVisibleItems = true;
                        foundItems = true;
                    } else {
                        item.style.display = 'none';
                    }
                });
                
                // Show/hide entire category based on visible items
                category.style.display = categoryHasVisibleItems ? 'block' : 'none';
            });
            
            // Visual feedback for no results
            if (!foundItems && searchTerm !== '') {
                searchInput.style.borderColor = '#ff6b6b';
                searchInput.style.boxShadow = '0 4px 8px rgba(255, 107, 107, 0.2)';
            } else {
                searchInput.style.borderColor = '#8B4513';
                searchInput.style.boxShadow = '0 4px 8px rgba(139, 69, 19, 0.1)';
            }
        });
        
        // Reset search on escape key
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.value = '';
                this.dispatchEvent(new Event('input'));
            }
        });
    }
    
    // Add cart simulation on double-click
    function simulateAddToCart(itemName, price) {
        // Remove existing notification
        const existingNotification = document.querySelector('.cart-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create new notification
        const cartNotification = document.createElement('div');
        cartNotification.className = 'cart-notification';
        cartNotification.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: #4CAF50;
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 10px;
                animation: slideInRight 0.5s ease;
            ">
                <i class="fas fa-check-circle" style="font-size: 1.2rem;"></i>
                <div>
                    <strong>Added to cart!</strong><br>
                    <small>${itemName} - ${price}</small>
                </div>
            </div>
        `;
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(cartNotification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (cartNotification.parentNode) {
                cartNotification.style.animation = 'slideInRight 0.5s ease reverse';
                setTimeout(() => cartNotification.remove(), 500);
            }
        }, 3000);
    }
    
    // Add double-click event to menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('dblclick', function() {
            const itemName = this.querySelector('h3').textContent;
            const price = this.querySelector('.item-price').textContent;
            simulateAddToCart(itemName, price);
        });
        
        // Visual feedback on click
        item.addEventListener('click', function(e) {
            if (e.detail === 1) { // Single click
                this.style.backgroundColor = '#FFF8E1';
                setTimeout(() => {
                    if (this.style.backgroundColor === 'rgb(255, 248, 225)') {
                        this.style.backgroundColor = '';
                    }
                }, 300);
            }
        });
    });
    
    // Initialize with all items visible
    filterMenu('all');
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
});