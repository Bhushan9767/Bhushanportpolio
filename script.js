/* ----------------------------------------------------
   BHUSHAN DHARMADHIKARI - BULLETPROOF INTERACTION ENGINE
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

// 2. Dynamic Blogger API Live Posts Renderer
function loadBloggerPosts() {
  const blogGrid = document.getElementById('blogPostsGrid');
  if (!blogGrid) return;

  const bloggerFeedUrl = 'https://bhushannd1234.blogspot.com/feeds/posts/default?alt=json';

  fetch(bloggerFeedUrl)
    .then(response => response.json())
    .then(data => {
      const entries = data.feed && data.feed.entry ? data.feed.entry : [];
      if (entries.length === 0) {
        blogGrid.innerHTML = `
          <div class="card" style="text-align: center; grid-column: 1 / -1; padding: 2rem;">
            <p style="color: var(--text-sub);">No blog posts found. Visit <a href="https://bhushannd1234.blogspot.com/" target="_blank" style="color: var(--accent-cyan);">bhushannd1234.blogspot.com</a></p>
          </div>
        `;
        return;
      }

      blogGrid.innerHTML = ''; // Clear loading spinner

      entries.slice(0, 6).forEach(entry => {
        const title = entry.title ? entry.title.$t : 'Blog Post';
        const publishedDate = entry.published ? new Date(entry.published.$t).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '';
        
        let linkUrl = 'https://bhushannd1234.blogspot.com/';
        if (entry.link) {
          const alternateLink = entry.link.find(l => l.rel === 'alternate');
          if (alternateLink) linkUrl = alternateLink.href;
        }

        // Extract thumbnail or fallback
        let thumbnail = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80';
        if (entry.media$thumbnail) {
          thumbnail = entry.media$thumbnail.url.replace('/s72-c/', '/s600/');
        } else if (entry.content && entry.content.$t) {
          const imgMatch = entry.content.$t.match(/<img[^>]+src="([^">]+)"/);
          if (imgMatch) thumbnail = imgMatch[1];
        }

        // Create plain snippet text
        let snippet = '';
        if (entry.content && entry.content.$t) {
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = entry.content.$t;
          snippet = tempDiv.textContent || tempDiv.innerText || '';
          snippet = snippet.trim().substring(0, 130) + '...';
        }

        const postCard = document.createElement('div');
        postCard.className = 'card';
        postCard.innerHTML = `
          <div>
            <div class="card-thumb">
              <img src="${thumbnail}" alt="${title}" onerror="this.src='https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80'">
            </div>
            <div style="font-size: 0.8rem; color: var(--accent-cyan); font-weight: 700; margin-bottom: 0.4rem;">
              <i class="far fa-calendar-alt"></i> ${publishedDate}
            </div>
            <h3 class="card-title" style="font-size: 1.1rem; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 0.6rem;">${title}</h3>
            <p class="card-desc" style="font-size: 0.85rem; line-height: 1.5; margin-bottom: 1rem;">${snippet}</p>
          </div>
          <a href="${linkUrl}" target="_blank" class="btn-primary" style="font-size: 0.82rem; padding: 0.5rem 1rem; width: 100%; text-align: center; justify-content: center;">Read Full Article <i class="fas fa-external-link-alt"></i></a>
        `;

        blogGrid.appendChild(postCard);
      });
    })
    .catch(err => {
      console.error('Error fetching Blogger feed:', err);
      blogGrid.innerHTML = `
        <div class="card" style="text-align: center; grid-column: 1 / -1; padding: 2rem;">
          <p style="color: var(--text-sub); margin-bottom: 1rem;">Explore articles directly on Bhushan's Tech Blog.</p>
          <a href="https://bhushannd1234.blogspot.com/" target="_blank" class="btn-primary">Go to bhushannd1234.blogspot.com 🚀</a>
        </div>
      `;
    });
}

// 3. Global Core Interactions Initializer
function initPortfolioApp() {
  console.log('Bhushan Portfolio App Initialized');

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

  // Load Dynamic Blogger Posts
  loadBloggerPosts();
}

// Ensure execution whether DOMContentLoaded fired or readyState is complete
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPortfolioApp);
} else {
  initPortfolioApp();
}
