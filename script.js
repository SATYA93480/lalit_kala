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

    // Click on "Who We Are" only opens/closes the menu
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault(); // stop navigation only for the toggle

            const parentItem = this.closest('.nav-item.dropdown');
            const isActive = parentItem.classList.contains('active');

            document.querySelectorAll('.nav-item.dropdown').forEach(item => {
                item.classList.remove('active');
            });

            if (!isActive) {
                parentItem.classList.add('active');
            }
        });
    });

    // Clicking outside closes dropdown
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-item.dropdown')) {
            document.querySelectorAll('.nav-item.dropdown').forEach(item => {
                item.classList.remove('active');
            });
        }
    });

    // Dropdown links (Mission, History...) CLOSE menu but STILL navigate
    const dropdownLinks = document.querySelectorAll('.dropdown-link');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function() {
            document.querySelectorAll('.nav-item.dropdown').forEach(item => {
                item.classList.remove('active');
            });
            // no preventDefault() here – browser will follow href
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
// ===== PHOTO GALLERY VIEW MORE / LESS =====
document.addEventListener('DOMContentLoaded', function() {
    const extraPhotos = document.querySelectorAll('.extra-photo');
    const toggleBtn = document.getElementById('photoToggleBtn');

    if (toggleBtn && extraPhotos.length > 0) {
        let expanded = false;

        toggleBtn.addEventListener('click', function() {
            expanded = !expanded;

            extraPhotos.forEach(card => {
                card.style.display = expanded ? 'block' : 'none';
            });

            toggleBtn.textContent = expanded ? 'View Less' : 'View More';
        });
    }
});
// ===== VIDEO GALLERY NEXT / PREVIOUS =====
document.addEventListener('DOMContentLoaded', function() {
    const videoElement = document.getElementById('galleryVideo');
    const btnPrev = document.getElementById('videoPrev');
    const btnNext = document.getElementById('videoNext');

    if (!videoElement || !btnPrev || !btnNext) return;

    // List of video files (currently same video repeated)
    const videos = [
        'LALITAKALA_ACADEMY.mp4',
        'LALITAKALA_ACADEMY.mp4', // replace with another file later
        'LALITAKALA_ACADEMY.mp4'
    ];

    let currentIndex = 0;

    function loadVideo(index) {
        currentIndex = (index + videos.length) % videos.length;
        videoElement.pause();
        videoElement.setAttribute('src', videos[currentIndex]);
        videoElement.load();
        videoElement.play().catch(() => {});
    }

    btnNext.addEventListener('click', function() {
        loadVideo(currentIndex + 1);
    });

    btnPrev.addEventListener('click', function() {
        loadVideo(currentIndex - 1);
    });
});
// ===== AWARDS TABS =====
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.awards-tab');
    const panels = document.querySelectorAll('.awards-panel');

    if (!tabs.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');

            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            this.classList.add('active');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
});
// ===== EVENT IMAGE CAROUSELS =====
document.addEventListener('DOMContentLoaded', function () {
    const galleries = document.querySelectorAll('.event-gallery');

    galleries.forEach(gallery => {
        const images = gallery.querySelectorAll('.event-images img');
        const prevBtn = gallery.querySelector('.event-arrow.prev');
        const nextBtn = gallery.querySelector('.event-arrow.next');

        if (!images.length) return;

        let currentIndex = 0;

        function showImage(index) {
            images.forEach(img => img.classList.remove('active'));
            currentIndex = (index + images.length) % images.length;
            images[currentIndex].classList.add('active');
        }

        // For mobile (where only one image is shown)
        const mq = window.matchMedia('(max-width: 1024px)');

        function updateVisibility() {
            if (mq.matches) {
                // mobile/tablet: show only current image
                images.forEach((img, idx) => {
                    img.style.display = idx === currentIndex ? 'block' : 'none';
                });
            } else {
                // desktop: show all images
                images.forEach(img => {
                    img.style.display = 'block';
                });
            }
        }

        mq.addEventListener('change', updateVisibility);
        updateVisibility();

        prevBtn.addEventListener('click', function () {
            showImage(currentIndex - 1);
            updateVisibility();
        });

        nextBtn.addEventListener('click', function () {
            showImage(currentIndex + 1);
            updateVisibility();
        });
    });
});

// ===== EVENTS PAGINATION =====
document.addEventListener('DOMContentLoaded', function () {
    const pages = document.querySelectorAll('.events-page');
    const pageButtons = document.querySelectorAll('.page-number');
    const prevBtn = document.querySelector('.page-prev');
    const nextBtn = document.querySelector('.page-next');

    if (!pages.length || !pageButtons.length) return;

    function showPage(page) {
        pages.forEach(p => {
            p.classList.toggle('active', p.dataset.page === String(page));
        });
        pageButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.page === String(page));
        });

        const firstPage = Number(pageButtons[0].dataset.page);
        const lastPage = Number(pageButtons[pageButtons.length - 1].dataset.page);

        prevBtn.disabled = page <= firstPage;
        nextBtn.disabled = page >= lastPage;
        prevBtn.dataset.page = String(page - 1);
        nextBtn.dataset.page = String(page + 1);
    }

    pageButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const p = Number(this.dataset.page);
            showPage(p);
        });
    });

    prevBtn.addEventListener('click', function () {
        if (this.disabled) return;
        const p = Number(this.dataset.page);
        showPage(p);
    });

    nextBtn.addEventListener('click', function () {
        if (this.disabled) return;
        const p = Number(this.dataset.page);
        showPage(p);
    });

    // initial
    showPage(1);
});





