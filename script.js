document.addEventListener('DOMContentLoaded', function() {
    // Navigation active state
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Load more photos functionality
    const galleryGrid = document.querySelector('.gallery-grid');
    const loadMoreBtn = document.getElementById('load-more');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Additional photos to load
            const additionalPhotos = [
                'Videos/GOPR1896.JPG',
                'Videos/GOPR1894.JPG',
                'Videos/GOPR1893.JPG',
                'Videos/GOPR1892.JPG',
                'Videos/GOPR1891.JPG',
                'Videos/GOPR1890.JPG',
                'Videos/GOPR1889.JPG',
                'Videos/GOPR1888.JPG'
            ];
            
            // Create and append new gallery items
            additionalPhotos.forEach(photo => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                
                const img = document.createElement('img');
                img.src = photo;
                img.alt = 'Gallery image';
                
                galleryItem.appendChild(img);
                galleryGrid.appendChild(galleryItem);
            });
            
            // Hide the load more button after loading additional photos
            this.style.display = 'none';
        });
    }
    
    // Form validation
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let valid = true;
            const inputs = this.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    input.style.borderColor = 'var(--danger-color)';
                } else {
                    input.style.borderColor = 'var(--success-color)';
                }
            });
            
            if (valid) {
                // Simulate form submission
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                
                // Simulate API call
                setTimeout(() => {
                    this.reset();
                    inputs.forEach(input => {
                        input.style.borderColor = '#ddd';
                    });
                    
                    submitBtn.textContent = 'Message Sent!';
                    
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalText;
                    }, 3000);
                }, 1500);
            }
        });
    }
    
    // Helper function to validate email
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Add video thumbnail functionality
    const videos = document.querySelectorAll('.video-item video');
    
    videos.forEach(video => {
        // Create a play button overlay
        const playBtn = document.createElement('div');
        playBtn.className = 'play-btn';
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        
        video.parentNode.style.position = 'relative';
        video.parentNode.appendChild(playBtn);
        
        // Show controls and autoplay when clicked
        playBtn.addEventListener('click', function() {
            video.controls = true;
            video.play();
            this.style.display = 'none';
        });
        
        // Show play button when video ends
        video.addEventListener('ended', function() {
            playBtn.style.display = 'flex';
        });
    });
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
}); 