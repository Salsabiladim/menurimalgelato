// Category Filtering and Search Only
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
    
    // Search functionality
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
        background: white;
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
                searchInput.style.borderColor = '#8B4513';
                searchInput.style.boxShadow = '0 4px 8px rgba(139, 69, 19, 0.1)';
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
    
    // Initialize with all items visible
    filterMenu('all');
    
    // Page load animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // Remove any cart counter if exists
    const cartCounter = document.querySelector('.cart-counter');
    if (cartCounter) {
        cartCounter.remove();
    }
    
    // Make menu items non-clickable (remove any existing click events)
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        // Remove all existing click event listeners
        const newItem = item.cloneNode(true);
        item.parentNode.replaceChild(newItem, item);
        
        // Ensure no hover effect that suggests clickability
        newItem.style.cursor = 'default';
        
        // Remove any click-related styles on hover
        newItem.addEventListener('mouseover', function() {
            this.style.transform = 'none';
            this.style.backgroundColor = '';
        });
    });
});
