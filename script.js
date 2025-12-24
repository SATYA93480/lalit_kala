// =====================
// MOBILE MENU TOGGLE – MAIN NAV ONLY
// =====================
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.querySelector('.header-nav');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function () {
        menuToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
    });
}

// Close main mobile menu when clicking links
const mainNavLinks = document.querySelectorAll('.nav-link-main:not(.more-toggle), .dropdown-link');
mainNavLinks.forEach(link => {
    link.addEventListener('click', function () {
        if (window.innerWidth <= 900 && menuToggle && mainNav) {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
        }
    });
});

// Close main menu on desktop resize
window.addEventListener('resize', function () {
    if (window.innerWidth > 900 && menuToggle && mainNav) {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
    }
});

// =====================
// MORE SLIDER MENU – DESKTOP ONLY
// =====================
// =====================
// SLIDER MENU - Desktop and Mobile
// =====================
// =====================
// SLIDER MENU - Desktop and Mobile with Click-to-Expand
// =====================
document.addEventListener('DOMContentLoaded', function () {
    const moreToggle = document.getElementById('moreToggle');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const moreSlider = document.getElementById('moreSlider');
    const moreClose = document.getElementById('moreClose');
    const moreOverlay = document.getElementById('moreOverlay');

    let scrollPosition = 0;

    function closeSlider() {
        if (moreToggle) moreToggle.classList.remove('active');
        if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
        moreSlider.classList.remove('active');
        moreOverlay.classList.remove('active');

        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, scrollPosition);
    }

    function openSlider() {
        scrollPosition = window.pageYOffset;
        
        moreSlider.classList.add('active');
        moreOverlay.classList.add('active');

        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollPosition}px`;
    }

    // Desktop More Toggle
    if (moreToggle) {
        moreToggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            if (moreSlider.classList.contains('active')) {
                closeSlider();
            } else {
                this.classList.add('active');
                openSlider();
            }
        });
    }

    // Mobile Menu Toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            if (moreSlider.classList.contains('active')) {
                closeSlider();
            } else {
                this.classList.add('active');
                openSlider();
            }
        });
    }

    // Close button
    if (moreClose) {
        moreClose.addEventListener('click', closeSlider);
    }

    // Overlay click
    moreOverlay.addEventListener('click', closeSlider);

    // ESC key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && moreSlider.classList.contains('active')) {
            closeSlider();
        }
    });

    // Section toggle - CLICK TO EXPAND (Both Desktop and Mobile)
    const sections = document.querySelectorAll('.slider-section');
    sections.forEach(section => {
        const heading = section.querySelector('h4');
        const list = section.querySelector('ul');

        if (!heading || !list) return;

        heading.addEventListener('click', function () {
            const isActive = list.classList.contains('active');

            // Toggle current section
            if (isActive) {
                list.classList.remove('active');
                heading.classList.remove('active');
            } else {
                list.classList.add('active');
                heading.classList.add('active');
            }
        });
    });

    // Close slider when clicking links
    const sliderLinks = moreSlider.querySelectorAll('a');
    sliderLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeSlider();
        });
    });
});

// Keep your other JavaScript (search, language, news ticker, etc.)

// Keep your other JavaScript (search, language, news ticker, etc.)

// =====================
// SEARCH FUNCTIONALITY
// =====================
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', function () {
        const searchQuery = searchInput.value.trim();
        if (searchQuery) {
            console.log('Search Query:', searchQuery);
            alert('Searching for: ' + searchQuery);
        } else {
            searchInput.focus();
        }
    });

    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
}

// =====================
// LANGUAGE SWITCHING
// =====================
const langButtons = document.querySelectorAll('.btn-lang');

langButtons.forEach(btn => {
    btn.addEventListener('click', function () {
        const selectedLang = this.getAttribute('data-lang');
        langButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        localStorage.setItem('preferredLanguage', selectedLang);
        console.log('Language changed to:', selectedLang === 'en' ? 'English' : 'Odia');
    });
});

window.addEventListener('load', function () {
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    const savedButton = document.querySelector(`[data-lang="${savedLang}"]`);
    if (savedButton) {
        langButtons.forEach(b => b.classList.remove('active'));
        savedButton.classList.add('active');
    }
});

// =====================
// HERO NEWS TICKER
// =====================
document.addEventListener('DOMContentLoaded', function () {
    const newsItems = document.querySelectorAll('.news-ticker-item');

    if (newsItems.length > 0) {
        let currentIndex = 0;
        const intervalTime = 6000;

        function showNextNews() {
            newsItems[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % newsItems.length;
            newsItems[currentIndex].classList.add('active');
        }

        setInterval(showNextNews, intervalTime);
    }
});

// =====================
// HEADER LOGOS CLICKABLE
// =====================
document.addEventListener('DOMContentLoaded', function () {
    const headerLogos = document.querySelector('.header-logos');

    if (headerLogos) {
        headerLogos.style.cursor = 'pointer';
        headerLogos.title = 'Go to Home';

        headerLogos.addEventListener('click', function (e) {
            if (e.target === headerLogos || e.target.closest('.logo-circle')) {
                window.location.href = 'index.html';
            }
        });
    }
});

// =====================
// LOGO ERROR HANDLING
// =====================
document.addEventListener('DOMContentLoaded', function () {
    const logoImages = document.querySelectorAll('.logo-circle img');
    logoImages.forEach((img, index) => {
        img.addEventListener('error', function () {
            console.warn(`Logo ${index + 1} failed to load: ${this.src}`);
        });
        img.addEventListener('load', function () {
            console.log(`Logo ${index + 1} loaded successfully`);
        });
    });
});
