// ========================================
// تأثير الجزيئات المتحركة في الخلفية
// ========================================
class ParticleSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 80;
        this.container = document.getElementById('particles');
        
        this.init();
    }

    init() {
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.container.appendChild(this.canvas);

        this.resize();
        this.createParticles();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 2 + 1,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((particle, index) => {
            // تحديث الموقع
            particle.x += particle.vx;
            particle.y += particle.vy;

            // إعادة الجزيئات عند الحواف
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // رسم الجزيء
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(102, 126, 234, ${particle.opacity})`;
            this.ctx.fill();

            // رسم الخطوط بين الجزيئات القريبة
            for (let j = index + 1; j < this.particles.length; j++) {
                const other = this.particles[j];
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(102, 126, 234, ${0.15 * (1 - distance / 120)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.stroke();
                }
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

// ========================================
// تأثيرات التفاعل مع البطاقات
// ========================================
class CardInteractions {
    constructor() {
        this.cards = document.querySelectorAll('.link-card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            // تأثير الإضاءة عند حركة الماوس
            card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
            card.addEventListener('mouseleave', () => this.handleMouseLeave(card));
            
            // تأثير النقر
            card.addEventListener('mousedown', () => this.handleMouseDown(card));
            card.addEventListener('mouseup', () => this.handleMouseUp(card));
            
            // تأثير الصوت (اختياري)
            card.addEventListener('mouseenter', () => this.playHoverSound());
        });
    }

    handleMouseMove(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
        
        // تأثير الإضاءة المتحركة
        const gradient = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.15), transparent)`;
        card.style.background = `${gradient}, rgba(255, 255, 255, 0.05)`;
    }

    handleMouseLeave(card) {
        card.style.transform = '';
        card.style.background = '';
    }

    handleMouseDown(card) {
        card.style.transform = 'scale(0.98)';
    }

    handleMouseUp(card) {
        card.style.transform = '';
    }

    playHoverSound() {
        // يمكن إضافة صوت خفيف هنا إذا أردت
        // const audio = new Audio('hover-sound.mp3');
        // audio.volume = 0.1;
        // audio.play();
    }
}

// ========================================
// تأثير الكتابة المتحركة للاسم
// ========================================
class TypewriterEffect {
    constructor(element, text, speed = 100) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
    }

    type() {
        if (this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        }
    }

    start() {
        this.element.textContent = '';
        this.type();
    }
}

// ========================================
// تأثير التمرير السلس
// ========================================
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// ========================================
// عداد الزوار (اختياري)
// ========================================
class VisitorCounter {
    constructor() {
        this.count = this.getVisitorCount();
        this.incrementCount();
    }

    getVisitorCount() {
        return parseInt(localStorage.getItem('visitorCount') || '0');
    }

    incrementCount() {
        this.count++;
        localStorage.setItem('visitorCount', this.count.toString());
    }

    getCount() {
        return this.count;
    }
}

// ========================================
// تأثير الظهور التدريجي عند التمرير
// ========================================
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.link-card, .profile-header, .footer');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });

        this.elements.forEach(element => {
            observer.observe(element);
        });
    }
}

// ========================================
// تأثير المؤشر المخصص
// ========================================
class CustomCursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursorDot = document.createElement('div');
        this.init();
    }

    init() {
        this.cursor.className = 'custom-cursor';
        this.cursorDot.className = 'custom-cursor-dot';
        
        this.cursor.style.cssText = `
            position: fixed;
            width: 40px;
            height: 40px;
            border: 2px solid rgba(102, 126, 234, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.2s ease;
        `;
        
        this.cursorDot.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: rgba(102, 126, 234, 0.8);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
        `;

        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorDot);

        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';
            this.cursor.style.transform = 'translate(-50%, -50%)';
            
            this.cursorDot.style.left = e.clientX + 'px';
            this.cursorDot.style.top = e.clientY + 'px';
            this.cursorDot.style.transform = 'translate(-50%, -50%)';
        });

        document.querySelectorAll('a, button').forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                this.cursor.style.borderColor = 'rgba(102, 126, 234, 1)';
            });
            
            element.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                this.cursor.style.borderColor = 'rgba(102, 126, 234, 0.5)';
            });
        });
    }
}

// ========================================
// تهيئة جميع التأثيرات عند تحميل الصفحة
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // تفعيل نظام الجزيئات
    new ParticleSystem();
    
    // تفعيل تأثيرات البطاقات
    new CardInteractions();
    
    // تفعيل التمرير السلس
    new SmoothScroll();
    
    // تفعيل عداد الزوار
    const visitorCounter = new VisitorCounter();
    console.log(`عدد الزيارات: ${visitorCounter.getCount()}`);
    
    // تفعيل تأثير الظهور عند التمرير
    new ScrollReveal();
    
    // تفعيل المؤشر المخصص (اختياري - يمكن تعطيله على الأجهزة المحمولة)
    if (window.innerWidth > 768) {
        new CustomCursor();
    }
    
    // إضافة تأثير الكتابة المتحركة للاسم (اختياري)
    // const nameElement = document.querySelector('.name-text');
    // const originalText = nameElement.textContent;
    // const typewriter = new TypewriterEffect(nameElement, originalText, 80);
    // typewriter.start();
    
    // رسالة ترحيب في الكونسول
    console.log('%c🌟 مرحباً بك في موقع Zaid Khaza\'leh 🌟', 'color: #667eea; font-size: 20px; font-weight: bold;');
    console.log('%cتم التطوير بحب ❤️', 'color: #764ba2; font-size: 14px;');
});

// ========================================
// تأثير التحميل
// ========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});



// ========================================
// وسائل حماية ضد سرقة الأكواد
// ========================================
document.addEventListener("contextmenu", function(e){
    e.preventDefault();
}, false);

document.addEventListener("keydown", function(e) {
    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    if (e.key === "F12" || 
        (e.ctrlKey && e.shiftKey && e.key === "I") || 
        (e.ctrlKey && e.shiftKey && e.key === "J") || 
        (e.ctrlKey && e.key === "U")) {
        e.preventDefault();
    }
}, false);

// Disable text selection
document.addEventListener("selectstart", function(e){
    e.preventDefault();
}, false);

