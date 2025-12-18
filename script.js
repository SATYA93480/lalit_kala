// Mobile Menu Toggle Functionality
const menuToggle = document.getElementById('menuToggle');
const headerTopNav = document.querySelector('.header_top_nav');

if (menuToggle && headerTopNav) {
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        headerTopNav.classList.toggle('active');
    });
}

// Close menu when clicking nav links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth <= 640) {
            if (menuToggle && headerTopNav) {
                menuToggle.classList.remove('active');
                headerTopNav.classList.remove('active');
            }
        }
    });
});

// Search Functionality
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', function() {
        const searchQuery = searchInput.value.trim();
        if (searchQuery) {
            console.log('Search Query:', searchQuery);
            // Add your search logic here
        } else {
            searchInput.focus();
        }
    });

    // Allow Enter key to trigger search
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
}

// Language Switching
const langButtons = document.querySelectorAll('.btn-lang');

langButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const selectedLang = this.getAttribute('data-lang');
        
        // Remove active class from all buttons
        langButtons.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Store language preference
        localStorage.setItem('preferredLanguage', selectedLang);
        
        console.log('Language changed to:', selectedLang === 'en' ? 'English' : 'Odia');
    });
});

// Set saved language on page load
window.addEventListener('load', function() {
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    const savedButton = document.querySelector(`[data-lang="${savedLang}"]`);
    if (savedButton) {
        langButtons.forEach(b => b.classList.remove('active'));
        savedButton.classList.add('active');
    }
});

// Close mobile menu on window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 640 && headerTopNav) {
        if (menuToggle) {
            menuToggle.classList.remove('active');
            headerTopNav.classList.remove('active');
        }
    }
});

// Logo images error handling
document.addEventListener('DOMContentLoaded', function() {
    const logoImages = document.querySelectorAll('.logo-circle img');
    logoImages.forEach((img, index) => {
        img.addEventListener('error', function() {
            console.warn(`Logo ${index + 1} failed to load: ${this.src}`);
        });
        img.addEventListener('load', function() {
            console.log(`Logo ${index + 1} loaded successfully`);
        });
    });
});
// ===== DROPDOWN MENU - CLICK TO OPEN/CLOSE =====
document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            const parentItem = this.closest('.nav-item.dropdown');
            const isActive = parentItem.classList.contains('active');
            
            // Close all other dropdowns
            document.querySelectorAll('.nav-item.dropdown').forEach(item => {
                item.classList.remove('active');
            });
            
            // Toggle current dropdown
            if (!isActive) {
                parentItem.classList.add('active');
            }
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-item.dropdown')) {
            document.querySelectorAll('.nav-item.dropdown').forEach(item => {
                item.classList.remove('active');
            });
        }
    });
    
    // Close dropdown when clicking a dropdown link
    const dropdownLinks = document.querySelectorAll('.dropdown-link');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function() {
            document.querySelectorAll('.nav-item.dropdown').forEach(item => {
                item.classList.remove('active');
            });
        });
    });
});
// ===== HERO SECTION - AUTO-ROTATE NEWS ITEMS (ONE AT A TIME) =====
document.addEventListener('DOMContentLoaded', function() {
    const newsItems = document.querySelectorAll('.news-ticker-item');
    
    if (newsItems.length > 0) {
        let currentIndex = 0;
        const intervalTime = 3000; // 3 seconds per item (matches animation duration)
        
        function showNextNews() {
            // Remove active class from current item
            newsItems[currentIndex].classList.remove('active');
            
            // Move to next item
            currentIndex = (currentIndex + 1) % newsItems.length;
            
            // Add active class to next item
            newsItems[currentIndex].classList.add('active');
        }
        
        // Auto-rotate every 6 seconds
        setInterval(showNextNews, intervalTime);
        
        // Optional: Pause on hover
        // const tickerContainer = document.querySelector('.news-ticker-inline');
        // let rotationInterval;
        
        // if (tickerContainer) {
        //     tickerContainer.addEventListener('mouseenter', function() {
        //         clearInterval(rotationInterval);
        //     });
            
        //     tickerContainer.addEventListener('mouseleave', function() {
        //         rotationInterval = setInterval(showNextNews, intervalTime);
        //     });
        // }
    }
});


