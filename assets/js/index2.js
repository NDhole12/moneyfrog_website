// Sidebar menu functionality
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const sidebarMenu = document.getElementById('sidebarMenu');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const sidebarClose = document.getElementById('sidebarClose');

// Open sidebar
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        sidebarMenu.classList.add('active');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

// Close sidebar
function closeSidebar() {
    if (sidebarMenu && sidebarOverlay) {
        sidebarMenu.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

if (sidebarClose) {
    sidebarClose.addEventListener('click', closeSidebar);
}

if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
}

// Close sidebar when clicking on a menu item
document.querySelectorAll('.sidebar-menu-item').forEach(item => {
    item.addEventListener('click', closeSidebar);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Calculator functionality
function calculate() {
    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('rate').value) / 100;
    const years = parseFloat(document.getElementById('years').value);

    if (principal && rate && years) {
        const amount = principal * Math.pow((1 + rate), years);
        const profit = amount - principal;

        document.getElementById('result').innerHTML =
            `Future Value: $${amount.toLocaleString('en-US', { maximumFractionDigits: 2 })}<br>
             Profit: $${profit.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
    } else {
        document.getElementById('result').innerHTML = 'Please fill in all fields';
    }
}

// Add some interactive animations
window.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.service-card, .testimonial-card, .learning-card');
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const cardVisible = 150;

        if (cardTop < window.innerHeight - cardVisible) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});

// Testimonials Slider - Multi-card responsive
var currentSlide = 0;
var sliderTimer;
var totalSlides = 5;
var slidesPerView = 3; // Default for desktop
var maxSlideIndex = 2; // For 5 slides showing 3 at a time: slides 0, 1, 2

function updateSlidesPerView() {
    if (window.innerWidth <= 768) {
        slidesPerView = 1;
        maxSlideIndex = totalSlides - 1; // 0, 1, 2, 3, 4
    } else {
        slidesPerView = 3;
        maxSlideIndex = totalSlides - slidesPerView; // 0, 1, 2
    }
}

function moveSlider() {
    const slider = document.getElementById('testimonialsSlider');
    const dots = document.querySelectorAll('.dot');
    
    if (slider) {
        updateSlidesPerView();
        
        if (slidesPerView === 1) {
            // Mobile: move by 100% per slide
            slider.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
        } else {
            // Desktop: move by 33.333% per slide (showing 3 cards)
            slider.style.transform = 'translateX(-' + (currentSlide * 33.333) + '%)';
        }
        
        // Update dots
        for (var i = 0; i < dots.length; i++) {
            if (slidesPerView === 1) {
                // Mobile: highlight current slide
                dots[i].className = i === currentSlide ? 'dot active' : 'dot';
            } else {
                // Desktop: highlight dots for visible slides
                var isVisible = i >= currentSlide && i < currentSlide + slidesPerView;
                dots[i].className = isVisible ? 'dot active' : 'dot';
            }
        }
    }
}

function nextSlide() {
    updateSlidesPerView();
    currentSlide = (currentSlide + 1) % (maxSlideIndex + 1);
    moveSlider();
}

function prevSlide() {
    updateSlidesPerView();
    currentSlide = currentSlide === 0 ? maxSlideIndex : currentSlide - 1;
    moveSlider();
}

function goToSlide(slideIndex) {
    updateSlidesPerView();
    if (slidesPerView === 1) {
        currentSlide = slideIndex;
    } else {
        // Desktop: adjust slide index for multi-card view
        currentSlide = Math.min(slideIndex, maxSlideIndex);
    }
    moveSlider();
}

function startAutoPlay() {
    sliderTimer = setInterval(nextSlide, 5000);
}

function stopAutoPlay() {
    clearInterval(sliderTimer);
}

function restartAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
}

// Initialize slider when page loads
window.addEventListener('load', function() {
    updateSlidesPerView();
    moveSlider();
    startAutoPlay();
    
    // Initialize cards with animation-ready state
    const cards = document.querySelectorAll('.service-card, .learning-card');
    cards.forEach(function(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

// Handle window resize
window.addEventListener('resize', function() {
    updateSlidesPerView();
    currentSlide = Math.min(currentSlide, maxSlideIndex);
    moveSlider();
});

// Make functions globally available for inline onclick handlers
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.goToSlide = goToSlide;
window.restartAutoPlay = restartAutoPlay;
window.calculate = calculate;