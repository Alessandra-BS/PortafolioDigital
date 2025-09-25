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
    if (e.key === "F12") e.preventDefault();
    if (e.ctrlKey && e.shiftKey && e.key === "I") e.preventDefault();
    if (e.ctrlKey && e.shiftKey && e.key === "J") e.preventDefault();
    if (e.ctrlKey && e.key === "u") e.preventDefault();
    if (e.ctrlKey && e.shiftKey && e.key === "C") e.preventDefault();
});

// Esperar a que el DOM cargue
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    // Al hacer clic en el menú hamburguesa
    menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("active"); // Animación de las barras
        navLinks.classList.toggle("active");   // Mostrar/ocultar menú
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            menuToggle.classList.remove("active");
            navLinks.classList.remove("active");
        });
    });
});
