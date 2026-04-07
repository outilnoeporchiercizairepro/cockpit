/* ─── ETOILES ANIMATION ──────────────────────────── */
const initStars = () => {
    const canvas = document.getElementById('stars');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
        canvas.width = window.innerWidth * window.devicePixelRatio;
        canvas.height = window.innerHeight * window.devicePixelRatio;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    const starsCount = 200;
    const stars = Array.from({ length: starsCount }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 0.8 + 0.2,
        o: Math.random() * 0.6 + 0.1,
        speed: Math.random() * 0.05 + 0.01,
        blink: Math.random() * 0.02
    }));

    let t = 0;
    const draw = () => {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        
        stars.forEach(s => {
            const opacity = s.o + Math.sin(t * s.blink * 50) * 0.2;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, opacity)})`;
            ctx.fill();
            
            // Subtle movement
            s.y -= s.speed;
            if (s.y < 0) s.y = window.innerHeight;
        });

        t++;
        requestAnimationFrame(draw);
    };

    draw();
};

/* ─── REVEAL ON SCROLL ───────────────────────────── */
const initReveal = () => {
    const revealEls = document.querySelectorAll('.reveal');
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing after reveal
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealEls.forEach(el => observer.observe(el));
};

/* ─── PARALLAX HERO ──────────────────────────────── */
const initParallax = () => {
    const heroTitle = document.querySelector('.hero-title');
    const atomHero = document.querySelector('.atom-svg-hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            if (heroTitle) heroTitle.style.transform = `translateY(${scrolled * 0.15}px)`;
            if (atomHero) atomHero.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.05}px)) rotate(${scrolled * 0.02}deg)`;
        }
    });
};

/* ─── CTA HANDLER ─────────────────────────────────── */
const initCTAs = () => {
    // Shared link for all action buttons
    // The user will provide this, using a placeholder for now.
    const sharedLink = "https://wa.me/message/YOUR_LINK_HERE"; // Placeholder
    
    const actionBtns = document.querySelectorAll('.nav-cta, .btn-primary, .btn-outline');
    
    // If we want to replace the hrefs dynamically
    /*
    actionBtns.forEach(btn => {
        if (btn.classList.contains('nav-cta') || btn.classList.contains('btn-primary')) {
            btn.href = sharedLink;
        }
    });
    */
};

// Start all initializations
document.addEventListener('DOMContentLoaded', () => {
    initStars();
    initReveal();
    initParallax();
    initCTAs();
});
