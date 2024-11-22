document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    const logo = document.querySelector('.logo');
    
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    // Function to adjust logo size based on window size
    function adjustLogoSize() {
        const windowWidth = window.innerWidth;
        const logoWrapper = document.querySelector('.logo-wrapper');
        
        // Dynamic size adjustment
        if (windowWidth > 1400) {
            logoWrapper.style.maxWidth = '350px';
        } else if (windowWidth > 1200) {
            logoWrapper.style.maxWidth = '300px';
        } else if (windowWidth > 768) {
            logoWrapper.style.maxWidth = '250px';
        } else if (windowWidth > 480) {
            logoWrapper.style.maxWidth = '200px';
        } else {
            logoWrapper.style.maxWidth = '180px';
        }
    }

    // Initial adjustment
    adjustLogoSize();
    
    // Adjust on window resize
    window.addEventListener('resize', adjustLogoSize);
    
    // Smooth fade-in
    logo.style.opacity = '0';
    logo.style.transition = 'opacity 0.5s ease';

    // Function to detect mobile device
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // Instagram deep linking
    const instagramLink = document.querySelector('.social-links a[href*="instagram"]');
    if (instagramLink) {
        instagramLink.addEventListener('click', function(e) {
            if (isMobile()) {
                e.preventDefault();
                window.location.href = 'instagram://user?username=yourusername';
                // Fallback after timeout
                setTimeout(function() {
                    window.location.href = 'https://www.instagram.com/yourusername';
                }, 2000);
            }
        });
    }

    // Facebook deep linking
    const facebookLink = document.querySelector('.social-links a[href*="facebook"]');
    if (facebookLink) {
        facebookLink.addEventListener('click', function(e) {
            if (isMobile()) {
                e.preventDefault();
                window.location.href = 'fb://profile/yourusername';
                // Fallback after timeout
                setTimeout(function() {
                    window.location.href = 'https://www.facebook.com/yourusername';
                }, 2000);
            }
        });
    }

    // TikTok deep linking
    const tiktokLink = document.querySelector('.social-links a[href*="tiktok"]');
    if (tiktokLink) {
        tiktokLink.addEventListener('click', function(e) {
            if (isMobile()) {
                e.preventDefault();
                window.location.href = 'tiktok://user/@yourusername';
                // Fallback after timeout
                setTimeout(function() {
                    window.location.href = 'https://www.tiktok.com/@yourusername';
                }, 2000);
            }
        });
    }

    // WhatsApp deep linking
    const whatsappLink = document.querySelector('.social-icon.whatsapp');
    if (whatsappLink) {
        whatsappLink.addEventListener('click', function(e) {
            if (isMobile()) {
                e.preventDefault();
                // Replace 1234567890 with your actual WhatsApp number
                window.location.href = 'whatsapp://send?phone=1234567890';
                // Fallback after timeout
                setTimeout(function() {
                    window.location.href = 'https://wa.me/+254710901835';
                }, 2000);
            }
        });
    }

    // Gallery filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Filtering function
    function filterGallery(category) {
        galleryItems.forEach(item => {
            // First hide all items with a fade out
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                if (category === 'all' || item.classList.contains(category)) {
                    item.style.display = 'block';
                    // Show filtered items with a fade in
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.display = 'none';
                }
            }, 300);
        });
    }

    // Add click handlers to filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Get the filter value
            const filterValue = btn.getAttribute('data-filter');
            filterGallery(filterValue);
        });
    });

    // Lightbox functionality
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    document.body.appendChild(lightbox);

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const caption = item.querySelector('.gallery-overlay span').textContent;
            
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${img.src}" alt="${img.alt}">
                    <div class="lightbox-caption">${caption}</div>
                    <button class="lightbox-close">&times;</button>
                </div>
            `;
            lightbox.classList.add('active');
        });
    });

    // Close lightbox when clicking outside
    lightbox.addEventListener('click', (e) => {
        if (e.target.classList.contains('lightbox')) {
            lightbox.classList.remove('active');
        }
    });

    // URL parameter handling for direct category access
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category) {
        const categoryBtn = document.querySelector(`.filter-btn[data-filter="${category}"]`);
        if (categoryBtn) {
            categoryBtn.click();
        }
    }

    // Lazy Loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('loading');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
}); // Add this to your existing script.js
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});