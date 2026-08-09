/* ----------------------------------------------------
   BHUSHAN DHARMADHIKARI - NETFLIX & AMAZON CINEMATIC ENGINE
   Includes Header Scroll Solidification & Animations
---------------------------------------------------- */

// 1. Certificate Lightbox Modal Functions (Globally Accessible)
window.openCertModal = function(title, issuer, imgSrc) {
  const modal = document.getElementById('certModal');
  const modalTitle = document.getElementById('certModalTitle');
  const modalIssuer = document.getElementById('certModalIssuer');
  const modalImg = document.getElementById('certModalImg');

  if (modal && modalTitle && modalIssuer && modalImg) {
    modalTitle.textContent = title;
    modalIssuer.textContent = `Issued by ${issuer}`;
    modalImg.src = imgSrc;
    modal.style.opacity = '1';
    modal.style.pointerEvents = 'auto';
  }
};

window.closeCertModal = function() {
  const modal = document.getElementById('certModal');
  if (modal) {
    modal.style.opacity = '0';
    modal.style.pointerEvents = 'none';
  }
};

// 2. Global Core Interactions Initializer
function initNetflixPortfolioApp() {
  console.log('Bhushan Netflix & Amazon Portfolio App Initialized');

  // Mobile Navigation Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.onclick = function() {
      navLinks.classList.toggle('active');
    };

    document.querySelectorAll('.nav-link').forEach(link => {
      link.onclick = function() {
        navLinks.classList.remove('active');
      };
    });
  }

  // Navbar Scroll Solidify & Top Scroll Progress Bar
  const navbar = document.getElementById('navbar');
  const progressBar = document.getElementById('progressBar');

  window.onscroll = function() {
    if (window.scrollY > 50) {
      if (navbar) navbar.classList.add('scrolled');
    } else {
      if (navbar) navbar.classList.remove('scrolled');
    }

    if (progressBar) {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = `${percent}%`;
    }
  };

  // Horizontal Drag / Scroll Rails smooth touch feel
  const rails = document.querySelectorAll('.carousel-rail');
  rails.forEach(rail => {
    let isDown = false;
    let startX;
    let scrollLeft;

    rail.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - rail.offsetLeft;
      scrollLeft = rail.scrollLeft;
    });
    rail.addEventListener('mouseleave', () => { isDown = false; });
    rail.addEventListener('mouseup', () => { isDown = false; });
    rail.addEventListener('mousemove', (e) => {
      if(!isDown) return;
      e.preventDefault();
      const x = e.pageX - rail.offsetLeft;
      const walk = (x - startX) * 2;
      rail.scrollLeft = scrollLeft - walk;
    });
  });

  // Modal Backdrop Click Close Listener
  document.onclick = function(e) {
    const modal = document.getElementById('certModal');
    if (modal && e.target === modal) {
      window.closeCertModal();
    }
  };
}

// Ensure execution whether DOMContentLoaded fired or readyState is complete
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNetflixPortfolioApp);
} else {
  initNetflixPortfolioApp();
}
