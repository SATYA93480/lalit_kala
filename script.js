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

// Close main mobile menu when clicking links (NOT the more 3‑bar)
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
// MORE SLIDER MENU – FINAL
// =====================
document.addEventListener('DOMContentLoaded', function () {
    const moreToggle = document.getElementById('moreToggle');
    const moreSlider = document.getElementById('moreSlider');
    const moreClose  = document.getElementById('moreClose');

    // Create overlay if not present
    let overlay = document.querySelector('.more-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'more-overlay';
        document.body.appendChild(overlay);
    }

    let scrollPosition = 0;

    function closeSlider() {
        if (!moreSlider) return;

        moreToggle && moreToggle.classList.remove('active');
        moreSlider.classList.remove('active');
        overlay.classList.remove('active');

        // restore body scroll
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollPosition);
    }

    function openSlider() {
        if (!moreSlider) return;

        // save scroll
        scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        moreToggle && moreToggle.classList.add('active');
        moreSlider.classList.add('active');
        overlay.classList.add('active');

        // lock background scroll, allow slider scroll (CSS has overflow-y:auto)
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.width = '100%';

        setupCompleteMobileMenu();
    }

    // toggle button
    moreToggle && moreToggle.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (moreSlider && moreSlider.classList.contains('active')) {
            closeSlider();
        } else {
            openSlider();
        }
    });

    moreClose && moreClose.addEventListener('click', closeSlider);
    overlay.addEventListener('click', closeSlider);

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && moreSlider && moreSlider.classList.contains('active')) {
            closeSlider();
        }
    });

    // let links work normally, just close slider after click
    if (moreSlider) {
        moreSlider.addEventListener('click', e => {
            const link = e.target.closest('.slider-section a');
            if (link) {
                // no preventDefault -> browser will follow href
                closeSlider();
            }
        });
    }

    // ===== BUILD ALL PAGES FOR MOBILE =====
    function setupCompleteMobileMenu() {
        if (window.innerWidth > 900) return;
        const slider = document.getElementById('moreSlider');
        if (!slider) return;

        // clear previous dynamic sections
        slider.querySelectorAll('.mobile-full-section').forEach(s => s.remove());

        // 1. Who we are
        addSection(slider, 'who', '👥 WHO WE ARE', [
            'mission.html|Mission',
            'history.html|History',
            'activities.html|Activities'
        ]);

        // 2. Publication
        addSection(slider, 'pub', '📚 PUBLICATION', [
            'publication.html|Publication',
            'magazines.html|Magazines',
            'achievements.html|Achievements',
            'art-odisha-glance.html|Art Odisha Glance'
        ]);

        // 3. Media gallery
        addSection(slider, 'media', '📸 MEDIA GALLERY', [
            'photo-gallery.html|Photo Gallery',
            'video-gallery.html|Video Gallery'
        ]);

        // 4. About us
        addSection(slider, 'about', 'ℹ️ ABOUT US', [
            'about-lalitkala.html|About Lalit Kala',
            'staffing-pattern.html|Staffing Pattern',
            'artist-database.html|Artist Database',
            'contact-us.html|Contact Us'
        ]);

        // 5. Notifications
        addSection(slider, 'notif', '🔔 NOTIFICATIONS', [
            'awards-felicitation.html|Awards',
            'plans-programmes.html|Plans',
            'announcement.html|Announcement',
            'advertisement.html|Advertisement',
            'tender-notice.html|Tender Notice',
            'events.html|Events'
        ]);
    }

    function addSection(slider, id, title, links) {
        const section = document.createElement('div');
        section.className = 'slider-section mobile-full-section';
        section.dataset.id = id;

        const linksHTML = links.map(item => {
            const [href, text] = item.split('|');
            return `<li><a href="${href}" class="slider-link">${text}</a></li>`;
        }).join('');

        section.innerHTML = `
            <h4>${title} <i class="fas fa-chevron-right"></i></h4>
            <ul>${linksHTML}</ul>
        `;
        slider.appendChild(section);
    }
});
// ===== SECTION TOGGLE + BACK BUTTONS =====
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.slider-section');

    sections.forEach(section => {
        const heading = section.querySelector('h4');
        const list = section.querySelector('ul');

        if (!heading || !list) return;

        // Start collapsed
        list.style.display = 'none';

        heading.addEventListener('click', function () {
            const isOpen = list.style.display === 'block';

            // Close all other sections
            sections.forEach(s => {
                const ul = s.querySelector('ul');
                if (ul) ul.style.display = 'none';
            });

            // Toggle this section
            list.style.display = isOpen ? 'none' : 'block';
        });
    });

    // Back links
    const backLinks = document.querySelectorAll('.slider-back');
    backLinks.forEach(back => {
        back.addEventListener('click', function (e) {
            e.preventDefault();
            const section = back.closest('.slider-section');
            const list = section && section.querySelector('ul');
            if (list) list.style.display = 'none';
        });
    });
});


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
        const intervalTime = 6000; // 6 seconds

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
