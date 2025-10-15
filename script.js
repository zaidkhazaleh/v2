// ========================================
// شبكة IoT متحركة في الخلفية
// ========================================
class IoTNetwork {
    constructor() {
        this.canvas = document.getElementById('iot-network');
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.nodeCount = 25;
        this.maxDistance = 150;
        
        this.init();
    }

    init() {
        this.resize();
        this.createNodes();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createNodes() {
        for (let i = 0; i < this.nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                radius: Math.random() * 3 + 2,
                type: Math.random() > 0.7 ? 'hub' : 'node'
            });
        }
    }

    drawNode(node) {
        this.ctx.beginPath();
        this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        
        if (node.type === 'hub') {
            // رسم عقدة مركزية (Hub)
            this.ctx.fillStyle = 'rgba(0, 255, 136, 0.8)';
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = 'rgba(0, 255, 136, 0.8)';
        } else {
            // رسم عقدة عادية
            this.ctx.fillStyle = 'rgba(102, 126, 234, 0.6)';
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = 'rgba(102, 126, 234, 0.6)';
        }
        
        this.ctx.fill();
        this.ctx.shadowBlur = 0;

        // رسم دائرة خارجية للعقد المركزية
        if (node.type === 'hub') {
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius + 5, 0, Math.PI * 2);
            this.ctx.strokeStyle = 'rgba(0, 255, 136, 0.3)';
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        }
    }

    drawConnection(node1, node2, distance) {
        const opacity = (1 - distance / this.maxDistance) * 0.5;
        
        this.ctx.beginPath();
        this.ctx.moveTo(node1.x, node1.y);
        this.ctx.lineTo(node2.x, node2.y);
        
        // استخدام لون مختلف للاتصالات مع العقد المركزية
        if (node1.type === 'hub' || node2.type === 'hub') {
            this.ctx.strokeStyle = `rgba(0, 255, 136, ${opacity})`;
        } else {
            this.ctx.strokeStyle = `rgba(102, 126, 234, ${opacity})`;
        }
        
        this.ctx.lineWidth = 1;
        this.ctx.stroke();

        // رسم نقاط بيانات متحركة على الخطوط
        if (Math.random() > 0.98) {
            const progress = Math.random();
            const x = node1.x + (node2.x - node1.x) * progress;
            const y = node1.y + (node2.y - node1.y) * progress;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, 2, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            this.ctx.fill();
        }
    }

    updateNode(node) {
        node.x += node.vx;
        node.y += node.vy;

        // ارتداد من الحواف
        if (node.x < 0 || node.x > this.canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > this.canvas.height) node.vy *= -1;

        // إبقاء العقد داخل الشاشة
        node.x = Math.max(0, Math.min(this.canvas.width, node.x));
        node.y = Math.max(0, Math.min(this.canvas.height, node.y));
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // تحديث ورسم العقد
        this.nodes.forEach(node => {
            this.updateNode(node);
            this.drawNode(node);
        });

        // رسم الاتصالات
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const dx = this.nodes[i].x - this.nodes[j].x;
                const dy = this.nodes[i].y - this.nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.maxDistance) {
                    this.drawConnection(this.nodes[i], this.nodes[j], distance);
                }
            }
        }

        requestAnimationFrame(() => this.animate());
    }
}

// ========================================
// تأثير الجزيئات المتحركة في الخلفية
// ========================================
class ParticleSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;
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

        this.particles.forEach((particle) => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(102, 126, 234, ${particle.opacity})`;
            this.ctx.fill();
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
            card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
            card.addEventListener('mouseleave', () => this.handleMouseLeave(card));
            card.addEventListener('mousedown', () => this.handleMouseDown(card));
            card.addEventListener('mouseup', () => this.handleMouseUp(card));
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

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.03)`;
        
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
}

// ========================================
// تحديث حالة أجهزة IoT
// ========================================
class IoTDeviceStatus {
    constructor() {
        this.devices = document.querySelectorAll('.iot-device');
        this.statuses = ['Active', 'Connected', 'Synced', 'Online', 'Ready'];
        this.init();
    }

    init() {
        setInterval(() => this.updateStatuses(), 3000);
    }

    updateStatuses() {
        this.devices.forEach(device => {
            const statusElement = device.querySelector('.device-status');
            const currentStatus = statusElement.textContent;
            const newStatus = this.statuses[Math.floor(Math.random() * this.statuses.length)];
            
            if (currentStatus !== newStatus) {
                statusElement.style.opacity = '0';
                setTimeout(() => {
                    statusElement.textContent = newStatus;
                    statusElement.style.opacity = '1';
                }, 300);
            }
        });
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
// المؤشر المخصص
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
            border: 2px solid rgba(0, 255, 136, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.2s ease;
        `;
        
        this.cursorDot.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: rgba(0, 255, 136, 0.8);
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

        document.querySelectorAll('a, button, .iot-device').forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                this.cursor.style.borderColor = 'rgba(0, 255, 136, 1)';
            });
            
            element.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                this.cursor.style.borderColor = 'rgba(0, 255, 136, 0.5)';
            });
        });
    }
}

// ========================================
// وسائل حماية ضد سرقة الأكواد
// ========================================
document.addEventListener("contextmenu", function(e){
    e.preventDefault();
}, false);

document.addEventListener("keydown", function(e) {
    if (e.key === "F12" || 
        (e.ctrlKey && e.shiftKey && e.key === "I") || 
        (e.ctrlKey && e.shiftKey && e.key === "J") || 
        (e.ctrlKey && e.key === "U")) {
        e.preventDefault();
    }
}, false);

document.addEventListener("selectstart", function(e){
    e.preventDefault();
}, false);

// ========================================
// تهيئة جميع التأثيرات عند تحميل الصفحة
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // تفعيل شبكة IoT
    new IoTNetwork();
    
    // تفعيل نظام الجزيئات
    new ParticleSystem();
    
    // تفعيل تأثيرات البطاقات
    new CardInteractions();
    
    // تفعيل تحديث حالة أجهزة IoT
    new IoTDeviceStatus();
    
    // تفعيل التمرير السلس
    new SmoothScroll();
    
    // تفعيل المؤشر المخصص (على الأجهزة الكبيرة فقط)
    if (window.innerWidth > 768) {
        new CustomCursor();
    }
    
    // رسالة ترحيب في الكونسول
    console.log('%c🌐 IoT Network Initialized 🌐', 'color: #00ff88; font-size: 20px; font-weight: bold;');
    console.log('%cConnected Devices: 25 | Status: Active', 'color: #667eea; font-size: 14px;');
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

