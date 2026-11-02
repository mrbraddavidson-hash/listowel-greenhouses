/**
 * Listowel Greenhouses - Interactive Application Logic
 * Curated 12 Pure Flower Showcase
 */

const FLOWER_DATA = [
  {
    "id": 1,
    "name": "Cascading Calibrachoa & Million Bells",
    "category": "Hanging Baskets",
    "season": "Spring & Summer",
    "light": "Full Sun",
    "water": "Daily in heat",
    "desc": "Prolific trailing trumpet blooms with self-cleaning continuous flowering.",
    "image_path": "assets/flowers/flower_01.jpg"
  },
  {
    "id": 2,
    "name": "Zonal Scarlet & Coral Geraniums",
    "category": "Patio Containers",
    "season": "Spring to Fall",
    "light": "Full Sun",
    "water": "Moderate",
    "desc": "Classic bold rounded floral clusters with rich velvety petals and vigorous growth.",
    "image_path": "assets/flowers/flower_02.jpg"
  },
  {
    "id": 3,
    "name": "Citrus Coral Verbena Clusters",
    "category": "Perennials & Bedding",
    "season": "Summer to Frost",
    "light": "Full Sun",
    "water": "Moderate",
    "desc": "Densely clustered florets in vibrant peach and tangerine that thrive in summer warmth.",
    "image_path": "assets/flowers/flower_03.jpg"
  },
  {
    "id": 4,
    "name": "Velvet Crimson Mandevilla Trumpets",
    "category": "Patio Containers",
    "season": "Summer to Fall",
    "light": "Direct Sun",
    "water": "Allow 2in dry",
    "desc": "Exotic deep-red trumpet flowers climbing gracefully along trellises and patio arches.",
    "image_path": "assets/flowers/flower_04.jpg"
  },
  {
    "id": 5,
    "name": "Golden Tickseed Coreopsis Blooms",
    "category": "Perennials & Bedding",
    "season": "Summer to Frost",
    "light": "Full Sun",
    "water": "Low to Moderate",
    "desc": "Sun-drenched yellow florets that provide month after month of hardy cottage garden color.",
    "image_path": "assets/flowers/flower_05.jpg"
  },
  {
    "id": 6,
    "name": "Sunburst Osteospermum African Daisies",
    "category": "Perennials & Bedding",
    "season": "Spring to Autumn",
    "light": "Full Sun",
    "water": "Moderate",
    "desc": "Dramatic contrasting dark center discs encircled by crisp luminous daisy petals.",
    "image_path": "assets/flowers/flower_06.jpg"
  },
  {
    "id": 7,
    "name": "Electric Magenta Trailing Petunias",
    "category": "Hanging Baskets",
    "season": "Spring & Summer",
    "light": "Full Sun",
    "water": "Daily in heat",
    "desc": "Dense cascading blankets of neon-violet petunia blooms trailing over basket edges.",
    "image_path": "assets/flowers/flower_07.jpg"
  },
  {
    "id": 8,
    "name": "Coral Bell & Trailing Flurries",
    "category": "Hanging Baskets",
    "season": "Spring & Summer",
    "light": "Full Sun",
    "water": "Consistent",
    "desc": "Multi-bloom hanging porch basket exploding with saturated color from top to bottom.",
    "image_path": "assets/flowers/flower_08.jpg"
  },
  {
    "id": 9,
    "name": "Trailing Fuchsia & Calibrachoa Combo",
    "category": "Hanging Baskets",
    "season": "Spring to Fall",
    "light": "Morning Sun / Shade",
    "water": "Regular moisture",
    "desc": "Pendulous bell-shaped dancing flowers with contrasting flared sepals and petals.",
    "image_path": "assets/flowers/flower_09.jpg"
  },
  {
    "id": 10,
    "name": "Mixed Summer Bloom Porch Planter",
    "category": "Patio Containers",
    "season": "Summer",
    "light": "Full Sun",
    "water": "Moderate",
    "desc": "Curated container bursting with assorted colorful flowering annuals in full bloom.",
    "image_path": "assets/flowers/flower_10.jpg"
  },
  {
    "id": 11,
    "name": "Lavender Lilac Calibrachoa Stars",
    "category": "Hanging Baskets",
    "season": "Spring to Fall",
    "light": "Full Sun",
    "water": "Daily in heat",
    "desc": "Countless miniature petunia-like blooms in soothing lavender with yellow throats.",
    "image_path": "assets/flowers/flower_11.jpg"
  },
  {
    "id": 12,
    "name": "Sunshine Orange & Gold Bloomers",
    "category": "Perennials & Bedding",
    "season": "Summer to Frost",
    "light": "Full Sun",
    "water": "Moderate",
    "desc": "Warm sunset hues radiating cheerful energy across garden beds and walkway borders.",
    "image_path": "assets/flowers/flower_12.jpg"
  }
];

let currentFilter = 'All';
let currentSearch = '';
let activeLightboxIndex = 0;
let filteredFlowers = [...FLOWER_DATA];

document.addEventListener('DOMContentLoaded', () => {
  initHoursCalculator();
  renderGallery();
  initFilterButtons();
  initSearch();
  initLightbox();
  initContactForm();
  initMobileMenu();
  initHeroVideo();
});

/* ============================================================
   REAL-TIME STORE HOURS CALCULATOR (Listowel, Ontario Time)
   ============================================================ */
function initHoursCalculator() {
  const statusPills = document.querySelectorAll('.live-status-pill');
  const statusTextElements = document.querySelectorAll('.live-status-text');

  function updateStatus() {
    const now = new Date();
    const torontoDateStr = now.toLocaleString("en-US", { timeZone: "America/Toronto" });
    const localNow = new Date(torontoDateStr);
    const day = localNow.getDay();
    const hours = localNow.getHours();
    const minutes = localNow.getMinutes();
    const currentDecimalHour = hours + (minutes / 60);

    let isOpen = false;
    let message = "";

    if (day === 0) {
      isOpen = false;
      message = "Closed Today (Sundays) • Reopens Monday at 8:00 AM";
    } else if (day >= 1 && day <= 5) {
      if (currentDecimalHour >= 8 && currentDecimalHour < 17) {
        isOpen = true;
        const closesInMinutes = Math.round((17 - currentDecimalHour) * 60);
        message = closesInMinutes < 60 ? `Open Now • Closes in ${closesInMinutes} min` : "Open Today until 5:00 PM";
      } else if (currentDecimalHour < 8) {
        isOpen = false;
        message = "Opens Today at 8:00 AM";
      } else {
        isOpen = false;
        message = day === 5 ? "Closed • Opens Saturday at 8:00 AM" : "Closed • Opens Tomorrow at 8:00 AM";
      }
    } else if (day === 6) {
      if (currentDecimalHour >= 8 && currentDecimalHour < 15) {
        isOpen = true;
        const closesInMinutes = Math.round((15 - currentDecimalHour) * 60);
        message = closesInMinutes < 60 ? `Open Now • Closes in ${closesInMinutes} min` : "Open Today until 3:00 PM";
      } else if (currentDecimalHour < 8) {
        isOpen = false;
        message = "Opens Today at 8:00 AM";
      } else {
        isOpen = false;
        message = "Closed • Reopens Monday at 8:00 AM";
      }
    }

    statusPills.forEach(pill => {
      pill.className = `live-status-pill ${isOpen ? 'open' : 'closed'}`;
      pill.innerHTML = `<span class="status-dot"></span> <span>${isOpen ? 'Open Now' : 'Closed Now'}</span>`;
    });

    statusTextElements.forEach(el => {
      el.textContent = message;
    });

    const rows = document.querySelectorAll('.hours-row');
    if (rows.length === 3) {
      rows.forEach(r => r.classList.remove('today'));
      if (day >= 1 && day <= 5) rows[0].classList.add('today');
      else if (day === 6) rows[1].classList.add('today');
      else if (day === 0) rows[2].classList.add('today');
    }
  }

  updateStatus();
  setInterval(updateStatus, 60000);
}

/* ============================================================
   GALLERY RENDERING & FILTERING
   ============================================================ */
function renderGallery() {
  const grid = document.getElementById('flowerGrid');
  if (!grid) return;

  filteredFlowers = FLOWER_DATA.filter(flower => {
    const matchesFilter = currentFilter === 'All' || flower.category === currentFilter;
    const matchesSearch = currentSearch === '' || 
      flower.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
      flower.desc.toLowerCase().includes(currentSearch.toLowerCase()) ||
      flower.category.toLowerCase().includes(currentSearch.toLowerCase()) ||
      flower.season.toLowerCase().includes(currentSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (filteredFlowers.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 50px 20px; background: #fff; border-radius: 16px; border: 1px solid var(--border-light);">
        <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--primary-forest); margin-bottom: 8px;">No matching flowers found</h3>
        <p style="color: var(--text-muted); margin-bottom: 16px;">Try adjusting your search terms or clearing the filter.</p>
        <button class="btn btn-outline" onclick="resetGalleryFilters()">Show All 12 Flowers</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filteredFlowers.map((flower) => `
    <article class="flower-card" onclick="openLightboxById(${flower.id})" tabindex="0" role="button" aria-label="View ${flower.name}">
      <div class="card-image-box">
        <img src="${flower.image_path}" alt="${flower.name}" loading="lazy" />
        <span class="photo-number-pill">Flower #${flower.id}</span>
        <span class="card-category-pill">${flower.category}</span>
        <div class="zoom-overlay">
          <span>🔍 View Flower</span>
        </div>
      </div>
      <div class="card-body">
        <h3 class="card-title">${flower.name}</h3>
        <p class="card-desc">${flower.desc}</p>
        <div class="card-specs">
          <div class="spec-line">
            <span>☀️</span>
            <span><strong>Light:</strong> ${flower.light}</span>
          </div>
          <div class="spec-line">
            <span>💧</span>
            <span><strong>Water:</strong> ${flower.water}</span>
          </div>
          <div class="spec-line">
            <span>🗓️</span>
            <span><strong>Season:</strong> ${flower.season}</span>
          </div>
        </div>
      </div>
    </article>
  `).join('');
}

function initFilterButtons() {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderGallery();
    });
  });
}

function initSearch() {
  const searchInput = document.getElementById('gallerySearch');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value.trim();
    renderGallery();
  });
}

function resetGalleryFilters() {
  currentFilter = 'All';
  currentSearch = '';
  const searchInput = document.getElementById('gallerySearch');
  if (searchInput) searchInput.value = '';
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(b => b.classList.toggle('active', b.dataset.filter === 'All'));
  renderGallery();
}

/* ============================================================
   LIGHTBOX MODAL IMPLEMENTATION
   ============================================================ */
function initLightbox() {
  const modal = document.getElementById('lightboxModal');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  if (!modal) return;

  closeBtn.addEventListener('click', closeLightbox);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox();
  });

  prevBtn.addEventListener('click', () => navigateLightbox(-1));
  nextBtn.addEventListener('click', () => navigateLightbox(1));

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });
}

function openLightboxById(id) {
  const index = filteredFlowers.findIndex(f => f.id === id);
  if (index !== -1) {
    activeLightboxIndex = index;
    updateLightboxContent();
    const modal = document.getElementById('lightboxModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function navigateLightbox(dir) {
  activeLightboxIndex = (activeLightboxIndex + dir + filteredFlowers.length) % filteredFlowers.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  const flower = filteredFlowers[activeLightboxIndex];
  if (!flower) return;

  document.getElementById('lightboxImg').src = flower.image_path;
  document.getElementById('lightboxImg').alt = flower.name;
  document.getElementById('lightboxNumber').textContent = `Flower #${flower.id} of ${FLOWER_DATA.length}`;
  document.getElementById('lightboxCategory').textContent = flower.category;
  document.getElementById('lightboxTitle').textContent = flower.name;
  document.getElementById('lightboxDesc').textContent = flower.desc;
  document.getElementById('lightboxLight').textContent = flower.light;
  document.getElementById('lightboxWater').textContent = flower.water;
  document.getElementById('lightboxSeason').textContent = flower.season;

  const askBtn = document.getElementById('lightboxAskBtn');
  if (askBtn) {
    askBtn.onclick = () => {
      closeLightbox();
      const messageField = document.getElementById('inquiryMessage');
      if (messageField) {
        messageField.value = `Hello! I saw Flower #${flower.id} (${flower.name}) on your website. Are these currently in stock or coming up in your greenhouse flushes?`;
        messageField.scrollIntoView({ behavior: 'smooth' });
        messageField.focus();
      }
    };
  }
}

/* ============================================================
   CONTACT FORM SIMULATION
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const alertBox = document.getElementById('formSuccessAlert');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending Inquiry...';
    submitBtn.disabled = true;

    setTimeout(() => {
      form.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      if (alertBox) {
        alertBox.style.display = 'block';
        setTimeout(() => { alertBox.style.display = 'none'; }, 6000);
      }
    }, 800);
  });
}

/* ============================================================
   MOBILE NAVIGATION MENU
   ============================================================ */
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.main-nav');
  if (!menuBtn || !nav) return;

  menuBtn.addEventListener('click', () => {
    const isVisible = nav.style.display === 'flex';
    nav.style.display = isVisible ? 'none' : 'flex';
    if (!isVisible) {
      nav.style.flexDirection = 'column';
      nav.style.position = 'absolute';
      nav.style.top = '100%';
      nav.style.left = '0';
      nav.style.right = '0';
      nav.style.background = '#ffffff';
      nav.style.padding = '20px';
      nav.style.borderBottom = '1px solid var(--border-light)';
      nav.style.boxShadow = 'var(--shadow-md)';
    }
  });
}

function initHeroVideo() {
  const video = document.getElementById('heroDroneVideo');
  const soundBtn = document.getElementById('videoSoundBtn');
  const iconMuted = document.getElementById('soundIconMuted');
  const iconUnmuted = document.getElementById('soundIconUnmuted');
  const btnText = document.getElementById('soundBtnText');

  if (!video) return;

  // Ensure autoplay starts reliably
  video.muted = true;
  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // If browser blocked initial autoplay, retry on user's first scroll or click
      const resume = () => {
        video.play();
        window.removeEventListener('click', resume);
        window.removeEventListener('touchstart', resume);
      };
      window.addEventListener('click', resume);
      window.addEventListener('touchstart', resume);
    });
  }

  // Click on video directly to toggle play/pause
  video.addEventListener('click', () => {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });

  if (soundBtn) {
    soundBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (video.muted) {
        video.muted = false;
        video.play();
        iconMuted.style.display = 'none';
        iconUnmuted.style.display = 'block';
        btnText.textContent = 'Mute';
      } else {
        video.muted = true;
        iconMuted.style.display = 'block';
        iconUnmuted.style.display = 'none';
        btnText.textContent = 'Unmute';
      }
    });
  }
}
