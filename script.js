// BHUSHAN DHARMADHIKARI PORTFOLIO INTERACTIVITY SCRIPT

document.addEventListener('DOMContentLoaded', () => {

  // 1. Scroll Progress Bar Update
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

  // 2. Mobile Menu Toggle
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

  // 3. Interactive Mouse Parallax Tilt for 3D Pop-Out Break-Out Cards
  const popoutCards = document.querySelectorAll('.popout-card-frame');

  popoutCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within element
      const y = e.clientY - rect.top;  // y position within element
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -12; // Max tilt deg
      const rotateY = ((x - centerX) / centerX) * 12;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    });
  });

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
