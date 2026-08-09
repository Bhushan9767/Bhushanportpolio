/* ----------------------------------------------------
   BHUSHAN DHARMADHIKARI - DEXLORY THEME ENGINE
   Guaranteed Global Function Scope & Event Delegation
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
function initPortfolioApp() {
  console.log('Bhushan Portfolio App Initialized (Dexlory Theme)');

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

  // Top Scroll Progress Bar
  const progressBar = document.getElementById('progressBar');
  window.onscroll = function() {
    if (progressBar) {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = `${percent}%`;
    }
  };

  // Interactive Project Category Filter Tabs & Live Search Engine
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const searchInput = document.getElementById('projectSearch');

  let activeCategory = 'all';
  let searchQuery = '';

  function applyFilters() {
    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      const text = card.innerText.toLowerCase();
      
      const matchesCategory = (activeCategory === 'all') || (category === activeCategory);
      const matchesSearch = (searchQuery === '') || text.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.onclick = function() {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-filter') || 'all';
      applyFilters();
    };
  });

  if (searchInput) {
    searchInput.oninput = function(e) {
      searchQuery = e.target.value.toLowerCase().trim();
      applyFilters();
    };
  }

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
  document.addEventListener('DOMContentLoaded', initPortfolioApp);
} else {
  initPortfolioApp();
}
