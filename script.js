// BHUSHAN DHARMADHIKARI PORTFOLIO INTERACTIVITY & GSAP/LENIS ANIMATION ENGINE

document.addEventListener('DOMContentLoaded', () => {

  // 1. LENIS SMOOTH INERTIA SCROLL ENGINE
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync Lenis with GSAP ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0, 0);
    }
  }

  // 2. GSAP SCROLLTRIGGER & HERO ENTRANCE ANIMATIONS
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Staggered Entrance
    gsap.from('.gsap-hero-elem', {
      y: 55,
      opacity: 0,
      duration: 1.2,
      stagger: 0.16,
      ease: 'power3.out',
      delay: 0.2
    });

    // Scroll-Triggered Section Reveals
    const revealElements = document.querySelectorAll('.gsap-reveal');
    revealElements.forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 45,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    });

    // Section Header Line Animations
    document.querySelectorAll('.row-header').forEach((header) => {
      gsap.from(header, {
        scrollTrigger: {
          trigger: header,
          start: 'top 90%'
        },
        x: -40,
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out'
      });
    });
  }

  // 3. GLOWING CUSTOM CURSOR LISTENER
  const cursorDot = document.getElementById('cursorDot');
  const cursorFollower = document.getElementById('cursorFollower');

  if (cursorDot && cursorFollower) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    function animateCursor() {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;

      cursorFollower.style.left = `${followerX}px`;
      cursorFollower.style.top = `${followerY}px`;

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover Expand Triggers
    const interactiveElements = document.querySelectorAll('.interactive-hover, a, button, .netflix-card');
    interactiveElements.forEach(elem => {
      elem.addEventListener('mouseenter', () => {
        cursorFollower.classList.add('active');
      });
      elem.addEventListener('mouseleave', () => {
        cursorFollower.classList.remove('active');
      });
    });
  }

  // 4. INTERACTIVE PARTICLE CANVAS BACKGROUND
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.parentElement.clientWidth;
    let height = canvas.height = canvas.parentElement.clientHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    });

    const particles = [];
    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? 'rgba(229, 9, 20, ' : 'rgba(56, 189, 248, '
      });
    }

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + '0.6)';
        ctx.fill();

        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color + (1 - dist / 130) * 0.25 + ')';
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(renderParticles);
    }
    renderParticles();
  }

  // 5. Scroll Progress Bar Update & Navbar Solidification
  const progressBar = document.getElementById('progressBar');
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (window.scrollY / totalHeight) * 100;
    if (progressBar) progressBar.style.width = scrollPercentage + '%';

    if (navbar) {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  // 6. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

});

// Certificate Lightbox Modal Functions
function openCertModal(title, issuer, imgSrc) {
  const modal = document.getElementById('certModal');
  const modalTitle = document.getElementById('certModalTitle');
  const modalIssuer = document.getElementById('certModalIssuer');
  const modalImg = document.getElementById('certModalImg');

  if (modal && modalTitle && modalIssuer && modalImg) {
    modalTitle.textContent = title;
    modalIssuer.textContent = issuer;
    modalImg.src = imgSrc;
    modal.style.opacity = '1';
    modal.style.pointerEvents = 'auto';
  }
}

function closeCertModal() {
  const modal = document.getElementById('certModal');
  if (modal) {
    modal.style.opacity = '0';
    modal.style.pointerEvents = 'none';
  }
}
