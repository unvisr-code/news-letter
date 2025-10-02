// Newsletter Interactive Features

document.addEventListener('DOMContentLoaded', function() {

    // Smooth scroll for anchor links (if added)
    const smoothScroll = (target) => {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    // Subscribe form handling
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;

            // Simulate subscription (replace with actual API call)
            alert(`구독 신청이 완료되었습니다!\n이메일: ${email}`);
            emailInput.value = '';
        });
    }

    // Add reading progress indicator (optional)
    const addReadingProgress = () => {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(to right, #2563eb, #8b5cf6);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const progress = (scrollTop / documentHeight) * 100;
            progressBar.style.width = progress + '%';
        });
    };

    addReadingProgress();

    // Lazy loading for images (basic implementation)
    const lazyLoadImages = () => {
        const images = document.querySelectorAll('img');

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // Image is already loaded via src, but this can be used for lazy loading
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    };

    lazyLoadImages();

    // Add hover effect sound (optional - commented out by default)
    /*
    const articles = document.querySelectorAll('.article-card');
    articles.forEach(article => {
        article.addEventListener('mouseenter', () => {
            // Add subtle sound effect if desired
            console.log('Article hovered');
        });
    });
    */

    // Dark mode toggle (optional feature for future)
    const initDarkMode = () => {
        const darkModeToggle = document.createElement('button');
        darkModeToggle.className = 'dark-mode-toggle';
        darkModeToggle.innerHTML = '🌙';
        darkModeToggle.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #2563eb;
            color: white;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transition: transform 0.3s ease;
            z-index: 1000;
        `;

        darkModeToggle.addEventListener('mouseenter', () => {
            darkModeToggle.style.transform = 'scale(1.1)';
        });

        darkModeToggle.addEventListener('mouseleave', () => {
            darkModeToggle.style.transform = 'scale(1)';
        });

        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            darkModeToggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        });

        // Uncomment to enable dark mode toggle
        // document.body.appendChild(darkModeToggle);
    };

    initDarkMode();

    // Print functionality
    const addPrintButton = () => {
        console.log('Newsletter loaded and ready');
    };

    addPrintButton();

    // Analytics tracking (placeholder for future implementation)
    const trackArticleViews = () => {
        const articles = document.querySelectorAll('.article-card');
        const viewObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const articleTitle = entry.target.querySelector('.article-title')?.textContent;
                    console.log(`Article viewed: ${articleTitle}`);
                    // Add analytics tracking here (e.g., Google Analytics)
                }
            });
        }, { threshold: 0.5 });

        articles.forEach(article => viewObserver.observe(article));
    };

    trackArticleViews();
});

// Utility function to format dates
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('ko-KR', options);
}

// Utility function to calculate reading time
function calculateReadingTime(text) {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wordsPerMinute);
    return `${time}분 읽기`;
}

// Export functions for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatDate,
        calculateReadingTime
    };
}
