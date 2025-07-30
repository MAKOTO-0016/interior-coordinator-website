// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});



// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    // Prevent Flash of Unstyled Content (FOUC)
    document.documentElement.classList.add('loaded');
    
    // Add fade-in class to elements that should animate
    const animateElements = document.querySelectorAll('.concept-item, .service-card, .testimonial-card, .gallery-item, .process-step');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
});

// Gallery image hover effects
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Contact form handling
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Simple validation
    if (!data.name || !data.email || !data.message) {
        alert('必須項目をすべて入力してください。');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('正しいメールアドレスを入力してください。');
        return;
    }
    
    // Show success message (in a real application, you would send this to a server)
    const submitButton = this.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = '送信中...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        submitButton.textContent = '送信完了';
        submitButton.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
        
        setTimeout(() => {
            alert('お問い合わせありがとうございます。\n2営業日以内にご返信いたします。');
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.style.background = 'linear-gradient(135deg, #d4a574, #e8c5a0)';
        }, 1500);
    }, 2000);
});

// Hero image slideshow - furniture gradually appearing
let currentImageIndex = 0;
const heroImages = [
    'hero-img-1', // 空の部屋
    'hero-img-2', // ソファがある部屋
    'hero-img-3', // 完成したリビング
    'hero-img-4'  // 美しいインテリア
];

function switchHeroImage() {
    // 現在の画像をフェードアウト
    const currentImg = document.getElementById(heroImages[currentImageIndex]);
    if (currentImg) {
        currentImg.classList.remove('active');
        currentImg.classList.add('fade-out');
    }
    
    // 次の画像のインデックスを計算
    currentImageIndex = (currentImageIndex + 1) % heroImages.length;
    
    // 次の画像をフェードイン
    setTimeout(() => {
        const nextImg = document.getElementById(heroImages[currentImageIndex]);
        if (nextImg) {
            // 前の画像のクラスをリセット
            heroImages.forEach(imgId => {
                const img = document.getElementById(imgId);
                if (img) {
                    img.classList.remove('active', 'fade-out');
                }
            });
            
            // 新しい画像をアクティブに
            nextImg.classList.add('active');
        }
    }, 1000); // 1秒後に次の画像を表示
}

// 5秒ごとに画像を切り替え
setInterval(switchHeroImage, 5000);

// 初期化時に最初の画像を表示
document.addEventListener('DOMContentLoaded', function() {
    const firstImg = document.getElementById(heroImages[0]);
    if (firstImg) {
        firstImg.classList.add('active');
    }
});

// Scroll event for other effects
window.addEventListener('scroll', function() {
    // Navigation background effect remains the same
    const nav = document.querySelector('.nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = 'none';
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Mobile menu toggle (if needed for smaller screens)
function createMobileMenu() {
    const nav = document.querySelector('.nav-container');
    const menu = document.querySelector('.nav-menu');
    
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.mobile-menu-toggle')) {
            const toggle = document.createElement('button');
            toggle.className = 'mobile-menu-toggle';
            toggle.innerHTML = '☰';
            toggle.style.cssText = `
                background: none;
                border: none;
                font-size: 1.5rem;
                color: #666;
                cursor: pointer;
                display: block;
            `;
            
            toggle.addEventListener('click', function() {
                menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
                menu.style.flexDirection = 'column';
                menu.style.position = 'absolute';
                menu.style.top = '100%';
                menu.style.left = '0';
                menu.style.right = '0';
                menu.style.background = 'white';
                menu.style.padding = '20px';
                menu.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            });
            
            nav.appendChild(toggle);
        }
    }
}

// Initialize mobile menu on resize
window.addEventListener('resize', createMobileMenu);
createMobileMenu();
