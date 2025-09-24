// Crear partículas de fondo
        function createParticles() {
            const particles = document.getElementById('particles');
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                particle.style.left = Math.random() * 100 + '%';
                particle.style.width = Math.random() * 4 + 2 + 'px';
                particle.style.height = particle.style.width;
                particle.style.animationDuration = Math.random() * 8 + 4 + 's';
                particle.style.animationDelay = Math.random() * 8 + 's';
                particles.appendChild(particle);
            }
        }

        // Smooth scrolling para navegación
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });

        // Header scroll effect mejorado
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            const scrolled = window.scrollY;
            
            if (scrolled > 100) {
                header.style.background = 'rgba(26, 26, 46, 0.98)';
                header.style.boxShadow = '0 8px 32px rgba(255, 107, 157, 0.3)';
            } else {
                header.style.background = 'rgba(26, 26, 46, 0.9)';
                header.style.boxShadow = '0 8px 32px rgba(139, 90, 150, 0.2)';
            }
        });

        // Animación de aparición en scroll mejorada
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) rotateX(0)';
                    }, index * 100);
                }
            });
        }, observerOptions);

        // Observar elementos para animaciones
        document.querySelectorAll('.skill-category, .project-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px) rotateX(10deg)';
            el.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            observer.observe(el);
        });

        // Efecto paralax en hero
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const floatingElements = document.querySelectorAll('.floating-element');
            
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            }

            floatingElements.forEach((element, index) => {
                const speed = 0.2 + (index * 0.1);
                element.style.transform += ` translateY(${scrolled * speed}px)`;
            });
        });

        // Efecto cursor personalizado
        const cursor = document.createElement('div');
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, #FF6B9D, #C768FF);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.1s ease;
            opacity: 0;
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
            cursor.style.opacity = '0.8';
        });

        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });

        // Efecto hover en cards
        document.querySelectorAll('.project-card, .skill-category, .contact-item').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform += ' scale(1.02)';
                cursor.style.transform = 'scale(2)';
                cursor.style.background = 'radial-gradient(circle, #45A049, #FF6B9D)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = this.style.transform.replace(' scale(1.02)', '');
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'radial-gradient(circle, #FF6B9D, #C768FF)';
            });
        });

        // Animación de escritura para el título
        const heroTitle = document.querySelector('.hero h1');
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';

        function typeWriter(text, element, speed = 100) {
            let i = 0;
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        }

        // Inicializar cuando la página carga
        window.addEventListener('load', () => {
            createParticles();
            setTimeout(() => {
                typeWriter(originalText, heroTitle, 80);
            }, 1000);
        });

        // Animación de contador para estadísticas (si quieres agregar)
        function animateCounter(element, target, duration = 2000) {
            let start = 0;
            const increment = target / (duration / 16);
            
            function updateCounter() {
                start += increment;
                if (start < target) {
                    element.textContent = Math.floor(start);
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target;
                }
            }
            updateCounter();
        }

        // Efecto de brillo en botones
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const size = 60;
                const pos = this.getBoundingClientRect();
                const x = e.clientX - pos.left - size / 2;
                const y = e.clientY - pos.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    background: rgba(255, 255, 255, 0.6);
                    border-radius: 50%;
                    left: ${x}px;
                    top: ${y}px;
                    transform: scale(0);
                    animation: ripple 0.6s ease;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Añadir keyframe para ripple
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

// 🚫 Evitar inspección del código (limitado)
document.addEventListener('contextmenu', (e) => e.preventDefault()); // Deshabilita clic derecho

document.addEventListener('keydown', (e) => {
    // Bloquear F12
    if (e.key === "F12") {
        e.preventDefault();
    }
    // Bloquear Ctrl+Shift+I (inspección)
    if (e.ctrlKey && e.shiftKey && e.key === "I") {
        e.preventDefault();
    }
    // Bloquear Ctrl+Shift+J (consola)
    if (e.ctrlKey && e.shiftKey && e.key === "J") {
        e.preventDefault();
    }
    // Bloquear Ctrl+U (ver código fuente)
    if (e.ctrlKey && e.key === "u") {
        e.preventDefault();
    }
    // Bloquear Ctrl+Shift+C (inspeccionar elemento)
    if (e.ctrlKey && e.shiftKey && e.key === "C") {
        e.preventDefault();
    }
});
