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

// Testimonials Slider - True Infinite Loop
var currentSlide = 0;
var sliderTimer;
var totalSlides = 7;
var slidesPerView = 3; // Default for desktop
var isTransitioning = false;

function updateSlidesPerView() {
    if (window.innerWidth <= 768) {
        slidesPerView = 1;
    } else {
        slidesPerView = 3;
    }
}



function moveSlider() {
    const slider = document.getElementById('testimonialsSlider');
    const dots = document.querySelectorAll('.dot');

    if (slider) {
        updateSlidesPerView();

        // Calculate the translation percentage
        var translatePercent;
        if (slidesPerView === 1) {
            // Mobile: move by 100% per slide (each slide is 100% of container)
            translatePercent = currentSlide * 100;
        } else {
            // Desktop: each slide is 1/7th of slider width
            // To show 3 slides, container shows 3/7ths of slider
            // Move by (100/7)% per slide = 14.2857%
            translatePercent = currentSlide * (100 / 7);
        }

        slider.style.transform = 'translateX(-' + translatePercent + '%)';

        // Update dots
        for (var i = 0; i < dots.length; i++) {
            dots[i].className = i === currentSlide ? 'dot active' : 'dot';
        }
    }
}

function nextSlide() {
    // console.log('Next slide clicked, current:', currentSlide, 'isTransitioning:', isTransitioning);

    if (isTransitioning) return;

    isTransitioning = true;
    currentSlide++;

    // Simple infinite loop - reset when reaching end
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }

    moveSlider();

    setTimeout(function () {
        isTransitioning = false;
    }, 600);

    restartAutoPlay();
}

// Define on window immediately
window.nextSlide = nextSlide;

function prevSlide() {
    // console.log('Prev slide clicked, current:', currentSlide, 'isTransitioning:', isTransitioning);

    if (isTransitioning) return;

    isTransitioning = true;
    currentSlide--;

    // Simple infinite loop - go to end when going before first
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }

    moveSlider();

    setTimeout(function () {
        isTransitioning = false;
    }, 600);

    restartAutoPlay();
}

// Define on window immediately
window.prevSlide = prevSlide;

function goToSlide(slideIndex) {
    // console.log('Go to slide clicked:', slideIndex);

    if (isTransitioning) return;

    currentSlide = slideIndex;
    moveSlider();
    restartAutoPlay();
}

// Define on window immediately
window.goToSlide = goToSlide;

function startAutoPlay() {
    sliderTimer = setInterval(nextSlide, 4000); // Slightly faster for better infinite feel
}

// Make functions globally available immediately
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.goToSlide = goToSlide;

// Create backup function names
window.testimonialsNextSlide = nextSlide;
window.testimonialsPrevSlide = prevSlide;
window.testimonialsGoToSlide = goToSlide;

// Functions are ready

function stopAutoPlay() {
    clearInterval(sliderTimer);
}

function restartAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
}

// Initialize slider when page loads
window.addEventListener('load', function () {
    updateSlidesPerView();
    moveSlider();
    startAutoPlay();

    // Ensure testimonials are visible
    const testimonialsSection = document.querySelector('.testimonials');
    const slider = document.getElementById('testimonialsSlider');

    if (testimonialsSection) {
        testimonialsSection.style.display = 'block';
        testimonialsSection.style.visibility = 'visible';
        testimonialsSection.style.opacity = '1';
    }

    if (slider) {
        slider.style.display = 'flex';
        slider.style.visibility = 'visible';
        slider.style.opacity = '1';
    }

    // Initialize cards with animation-ready state
    const cards = document.querySelectorAll('.service-card, .learning-card');
    cards.forEach(function (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

// Handle window resize
window.addEventListener('resize', function () {
    updateSlidesPerView();
    // Ensure currentSlide is within bounds for infinite rotation
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }
    moveSlider();
});

// Make functions globally available for inline onclick handlers
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.goToSlide = goToSlide;
window.restartAutoPlay = restartAutoPlay;
window.calculate = calculate;

// Fallback initialization
setTimeout(function () {
    if (document.readyState === 'complete') {
        const testimonialsSection = document.querySelector('.testimonials');
        const slider = document.getElementById('testimonialsSlider');

        if (testimonialsSection && slider) {
            updateSlidesPerView();
            moveSlider();
            startAutoPlay();
        }
    }
}, 1000);

// SIP Calculator functionality
function switchCalculator() {
    const selectedType = document.getElementById('calculatorType').value;
    const calculators = document.querySelectorAll('.calculator-container');

    calculators.forEach(calc => calc.classList.remove('active'));
    document.getElementById(selectedType + 'Calculator').classList.add('active');

    if (selectedType === 'sip') {
        initSIPCalculator();
    }
}

function switchCalculatorButton(calcType, buttonElement) {
    // Remove active class from all buttons
    document.querySelectorAll('.calc-button').forEach(btn => btn.classList.remove('active'));

    // Add active class to clicked button
    buttonElement.classList.add('active');

    // Hide all calculators
    const calculators = document.querySelectorAll('.calculator-container');
    calculators.forEach(calc => calc.classList.remove('active'));

    // Show selected calculator
    document.getElementById(calcType + 'Calculator').classList.add('active');

    if (calcType === 'sip') {
        initSIPCalculator();
    }
}

function initSIPCalculator() {
    const monthlyInput = document.getElementById('monthlyInvestment');
    const returnInput = document.getElementById('expectedReturn');
    const timeInput = document.getElementById('timePeriod');
    const currencySelect = document.getElementById('currency');

    // Add event listeners for real-time calculation
    [monthlyInput, returnInput, timeInput].forEach(input => {
        if (input) {
            input.addEventListener('input', calculateSIP);
        }
    });

    // Add event listener for currency change
    if (currencySelect) {
        currencySelect.addEventListener('change', calculateSIP);
    }

    // Initial calculation
    calculateSIP();
    drawSIPChart();
}

function calculateSIP() {
    const monthlyInvestment = parseFloat(document.getElementById('monthlyInvestment').value) || 25000;
    const annualReturn = parseFloat(document.getElementById('expectedReturn').value) || 14;
    const years = parseFloat(document.getElementById('timePeriod').value) || 10;

    const monthlyReturn = annualReturn / 12 / 100;
    const totalMonths = years * 12;

    // SIP calculation formula
    const futureValue = monthlyInvestment * (((Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn) * (1 + monthlyReturn));
    const totalInvested = monthlyInvestment * totalMonths;
    const estimatedGain = futureValue - totalInvested;

    // NIFTY 50 calculation (11.8% return)
    const niftyReturn = 11.8 / 12 / 100;
    const niftyValue = monthlyInvestment * (((Math.pow(1 + niftyReturn, totalMonths) - 1) / niftyReturn) * (1 + niftyReturn));

    // Update display
    const totalInvestedEl = document.getElementById('totalInvested');
    const projectedValueEl = document.getElementById('projectedValue');
    const estimatedGainEl = document.getElementById('estimatedGain');
    const niftyValueEl = document.getElementById('niftyValue');
    const investmentDetailEl = document.getElementById('investmentDetail');
    const returnDetailEl = document.getElementById('returnDetail');

    if (totalInvestedEl) totalInvestedEl.textContent = formatCurrency(totalInvested);
    if (projectedValueEl) projectedValueEl.textContent = formatCurrency(futureValue);
    if (estimatedGainEl) estimatedGainEl.textContent = formatCurrency(estimatedGain);
    if (niftyValueEl) niftyValueEl.textContent = formatCurrency(niftyValue);
    if (investmentDetailEl) investmentDetailEl.textContent = `${totalMonths} × ${formatCurrency(monthlyInvestment)}`;
    if (returnDetailEl) returnDetailEl.textContent = `@ ${annualReturn}% p.a.`;

    // Update chart
    drawSIPChart();
}

function formatCurrency(amount) {
    const currencyEl = document.getElementById('currency');
    const currency = currencyEl ? currencyEl.value : 'INR';
    const symbols = { INR: '₹', USD: '$', EUR: '€' };

    if (amount >= 10000000) {
        return `${symbols[currency]}${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
        return `${symbols[currency]}${(amount / 100000).toFixed(2)} L`;
    } else {
        return `${symbols[currency]}${amount.toLocaleString('en-IN')}`;
    }
}

function drawSIPChart() {
    const canvas = document.getElementById('sipChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const monthlyInvestment = parseFloat(document.getElementById('monthlyInvestment').value) || 25000;
    const annualReturn = parseFloat(document.getElementById('expectedReturn').value) || 14;
    const years = parseFloat(document.getElementById('timePeriod').value) || 10;

    const monthlyReturn = annualReturn / 12 / 100;
    const niftyReturn = 11.8 / 12 / 100;
    const totalMonths = years * 12;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Chart dimensions
    const padding = 60;
    const chartWidth = canvas.width - 2 * padding;
    const chartHeight = canvas.height - 2 * padding;

    // Generate data points
    const investedData = [];
    const portfolioData = [];
    const niftyData = [];

    for (let month = 0; month <= totalMonths; month++) {
        const invested = monthlyInvestment * month;

        let portfolioValue = 0;
        let niftyValue = 0;

        if (month > 0) {
            portfolioValue = monthlyInvestment * (((Math.pow(1 + monthlyReturn, month) - 1) / monthlyReturn) * (1 + monthlyReturn));
            niftyValue = monthlyInvestment * (((Math.pow(1 + niftyReturn, month) - 1) / niftyReturn) * (1 + niftyReturn));
        }

        investedData.push(invested);
        portfolioData.push(portfolioValue);
        niftyData.push(niftyValue);
    }

    // Find max value for scaling
    const maxValue = Math.max(...portfolioData, ...niftyData, ...investedData);
    const minValue = 0;

    // Generate volatility data for portfolio
    const volatilePortfolioData = generateVolatilityData(portfolioData);
    const volatileNiftyData = generateVolatilityData(niftyData, 0.12);

    // Draw grid lines
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(canvas.width - padding, y);
        ctx.stroke();
    }

    // Draw volatile lines
    drawVolatileLine(volatilePortfolioData, '#4CAF50', 3);
    drawVolatileLine(volatileNiftyData, '#FF9800', 2);

    // Draw straight invested line
    drawStraightLine(investedData, '#2196F3', 2);

    // Helper function to draw volatile lines
    function drawVolatileLine(data, color, lineWidth = 2) {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();

        for (let i = 0; i < data.length; i++) {
            const x = padding + (chartWidth / (totalMonths - 1)) * i;
            const y = canvas.height - padding - ((data[i] - minValue) / (maxValue - minValue)) * chartHeight;

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.stroke();
    }

    // Helper function to draw straight lines
    function drawStraightLine(data, color, lineWidth = 2) {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();

        data.forEach((value, index) => {
            const x = padding + (chartWidth / (totalMonths - 1)) * index;
            const y = canvas.height - padding - ((value - minValue) / (maxValue - minValue)) * chartHeight;

            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.stroke();
    }

    // Generate volatility data
    function generateVolatilityData(baseData, volatility = 0.15) {
        const volatileData = [];
        let cumulativeVolatility = 0;
        let trend = 1; // 1 for up, -1 for down
        let trendDuration = 0;

        for (let i = 0; i < baseData.length; i++) {
            // Medium volatility zigzag patterns
            const randomFactor = (Math.random() - 0.5) * 2.5; // -1.25 to 1.25 for medium moves
            const cyclicalFactor = Math.sin(i * 0.25) * 0.5; // Medium cyclical movement
            const trendFactor = trend * 0.3; // Medium trending behavior

            // Change trend direction for zigzag effect
            trendDuration++;
            if (trendDuration > 3 + Math.random() * 4) { // Change trend every 3-7 months
                trend *= -1;
                trendDuration = 0;
            }

            const monthlyVolatility = (randomFactor + cyclicalFactor + trendFactor) * volatility * 0.12;

            cumulativeVolatility += monthlyVolatility;
            // Medium mean reversion
            cumulativeVolatility *= 0.88;

            // Calculate volatile value with medium range
            const volatileValue = baseData[i] * (1 + cumulativeVolatility);
            volatileData.push(Math.max(volatileValue, baseData[i] * 0.65)); // Medium dips allowed
        }

        return volatileData;
    }

    // Draw Y-axis labels
    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
        const value = (maxValue / 5) * (5 - i);
        const y = padding + (chartHeight / 5) * i;
        ctx.fillText(formatCurrency(value), padding - 10, y + 4);
    }

    // Draw X-axis labels
    ctx.textAlign = 'center';
    for (let i = 0; i <= years; i++) {
        const x = padding + (chartWidth / years) * i;
        ctx.fillText(`${i}Y`, x, canvas.height - padding + 20);
    }
}

// Initialize SIP calculator when page loads
document.addEventListener('DOMContentLoaded', function () {
    // Initialize SIP calculator if it's active
    const sipCalculator = document.getElementById('sipCalculator');
    if (sipCalculator && sipCalculator.classList.contains('active')) {
        setTimeout(() => {
            initSIPCalculator();
        }, 100); // Small delay to ensure DOM is fully ready
    }
});

// Also initialize when window loads (backup)
window.addEventListener('load', function () {
    const sipCalculator = document.getElementById('sipCalculator');
    if (sipCalculator && sipCalculator.classList.contains('active')) {
        initSIPCalculator();
    }
});

// Make functions globally available
window.switchCalculatorButton = switchCalculatorButton;
window.calculateSIP = calculateSIP;
window.initSIPCalculator = initSIPCalculator;
