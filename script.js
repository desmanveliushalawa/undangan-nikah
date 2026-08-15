/* ================================================================
   WEDDING INVITATION – SCRIPT.JS (ELEGANT LIGHT EDITION)
   Hendry & Nesra | 29 Agustus 2026 | Nias Selatan
   ================================================================ */

// ── CONFIG ────────────────────────────────────────────────────
const WEDDING_DATE = new Date('2026-08-26T10:00:00+07:00');
const WEDDING_URL = window.location.href;

// Background Music Element
let bgMusic = null;

// 11 Foto Galeri HD
const GALLERY_PHOTOS = [
  { src: 'foto3.jpg', alt: 'Hendry & Nesra – Momen Romantis' },
  { src: 'foto1.jpg', alt: 'Hendry & Nesra – Elegan Bersama' },
  { src: 'foto2.jpg', alt: 'Hendry & Nesra – Pose Indah' },
  { src: 'foto5.jpg', alt: 'Hendry & Nesra – Busana Adat Nias' },
  { src: 'foto6.jpg', alt: 'Hendry & Nesra – Ceria' },
  { src: 'foto8.jpg', alt: 'Hendry & Nesra – Penuh Kasih' },
  { src: 'foto4.jpg', alt: 'Hendry & Nesra – Klasik' },
  { src: 'foto9.jpg', alt: 'Hendry & Nesra – Momen Berharga' },
  { src: 'foto10.jpg', alt: 'Hendry & Nesra – Bahagia' },
  { src: 'foto11.jpg', alt: 'Hendry & Nesra – Romantis' },
  { src: 'foto12.jpg', alt: 'Hendry & Nesra – Janji Suci' },
];

let lightboxIndex = 0;
let musicPlaying = false;

// ── FIREFLY BACKGROUND ANIMATION ─────────────────────────────
function createFireflies() {
  const container = document.getElementById('fireflyContainer');
  if (!container) return;

  const count = 15;
  for (let i = 0; i < count; i++) {
    const fly = document.createElement('div');
    fly.className = 'firefly';

    const size = Math.random() * 5 + 3;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const dur = Math.random() * 8 + 8;
    const delay = Math.random() * 10;

    // Random movement offsets
    const fx = (Math.random() - 0.5) * 200;
    const fy = (Math.random() - 0.5) * 300;
    const fx2 = (Math.random() - 0.5) * 250;
    const fy2 = (Math.random() - 0.5) * 350;

    fly.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      top: ${top}%;
      --duration: ${dur}s;
      --delay: ${delay}s;
      --fx: ${fx}px;
      --fy: ${fy}px;
      --fx2: ${fx2}px;
      --fy2: ${fy2}px;
    `;
    container.appendChild(fly);
  }
}

// ── GUEST NAME FROM URL ──────────────────────────────────────
function loadGuestName() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get('to') || params.get('nama') || params.get('guest');
  if (name) {
    const decoded = decodeURIComponent(name);
    const coverEl = document.getElementById('coverGuestName');
    const heroEl = document.getElementById('heroGuestName');
    if (coverEl) coverEl.textContent = decoded;
    if (heroEl) heroEl.textContent = decoded;
  }
}

// ── OPEN INVITATION ───────────────────────────────────────────
function openInvitation() {
  const cover = document.getElementById('coverScreen');
  const main = document.getElementById('mainContent');
  const overlay = document.getElementById('transitionOverlay');

  // Fade out cover
  cover.classList.add('fade-out');

  setTimeout(() => {
    cover.style.display = 'none';
    
    // Show and animate transition overlay
    if (overlay) {
      overlay.classList.remove('hidden');
      setTimeout(() => {
        overlay.classList.add('active');
        overlay.classList.add('animate');
      }, 50);

      // After animation, hide overlay and show main content
      setTimeout(() => {
        overlay.classList.remove('active');
        
        setTimeout(() => {
          overlay.classList.add('hidden');
          main.classList.remove('hidden');
          document.body.style.overflow = 'auto';

          // Auto-play music
          startMusic();

          // Init components
          initCountdown();
          initScrollAnimations();
          buildGallerySlider();
          initQRCode();
          initNavBar();
          updateStoryUrl();

          // Trigger initial fade-in
          setTimeout(() => triggerVisibleAnimations(), 150);
        }, 600);
      }, 1800);
    } else {
      // Fallback if overlay not found
      main.classList.remove('hidden');
      document.body.style.overflow = 'auto';
      startMusic();
      initCountdown();
      initScrollAnimations();
      buildGallerySlider();
      initQRCode();
      initNavBar();
      updateStoryUrl();
      setTimeout(() => triggerVisibleAnimations(), 150);
    }
  }, 800);
}

// ── BACKGROUND MUSIC (HTML5 Audio) ────────────────────────────
function startMusic() {
  if (!bgMusic) bgMusic = document.getElementById('bgMusic');
  if (!bgMusic) return;
  bgMusic.volume = 0.45;
  const playPromise = bgMusic.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      musicPlaying = true;
      updateMusicBtn();
    }).catch(() => {
      musicPlaying = false;
      updateMusicBtn();
    });
  }
}

function toggleMusic() {
  if (!bgMusic) bgMusic = document.getElementById('bgMusic');
  if (!bgMusic) return;
  if (musicPlaying) {
    bgMusic.pause();
    musicPlaying = false;
  } else {
    bgMusic.volume = 0.45;
    bgMusic.play().then(() => {
      musicPlaying = true;
      updateMusicBtn();
    }).catch(() => {});
  }
  updateMusicBtn();
}

function updateMusicBtn() {
  const btn = document.getElementById('musicBtn');
  if (btn) {
    btn.classList.toggle('music-playing', musicPlaying);
    btn.setAttribute('title', musicPlaying ? 'Matikan Musik' : 'Putar Musik');
  }
}

// ── SHARE MENU ────────────────────────────────────────────────
function toggleShareMenu() {
  const menu = document.getElementById('shareMenu');
  if (menu) menu.classList.toggle('hidden');
}

function hideShareMenu() {
  const menu = document.getElementById('shareMenu');
  if (menu) menu.classList.add('hidden');
}

function shareWhatsApp() {
  const msg = encodeURIComponent(
    'Undangan Pernikahan Kudus\n\n' +
    'Sertu Hendry Susanto Halawa\n' +
    '& Nesra Menivil Larosa, S.Pd\n\n' +
    'Sabtu, 26 Agustus 2026\n' +
    'Pukul 10.00 & 12.00 WIB\n' +
    'Desa Hiliadulo, Nias Selatan\n\n' +
    'Buka undangan online kami di:\n' +
    WEDDING_URL
  );
  window.open('https://wa.me/?text=' + msg, '_blank');
  hideShareMenu();
}

function shareFacebook() {
  window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(WEDDING_URL), '_blank');
  hideShareMenu();
}

function shareTwitter() {
  const text = encodeURIComponent('Undangan Pernikahan Hendry & Nesra – 26 Agustus 2026 | Nias Selatan');
  window.open('https://twitter.com/intent/tweet?text=' + text + '&url=' + encodeURIComponent(WEDDING_URL), '_blank');
  hideShareMenu();
}

function shareInstagramStory() {
  hideShareMenu();
  const modal = document.getElementById('storyModal');
  if (modal) modal.classList.remove('hidden');
  updateStoryUrl();
}

function closeStoryModal() {
  const modal = document.getElementById('storyModal');
  if (modal) modal.classList.add('hidden');
}

function updateStoryUrl() {
  const el = document.getElementById('storyUrl');
  if (el) el.textContent = window.location.host || WEDDING_URL;
}

function copyLink() {
  const url = WEDDING_URL;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => toast('Tautan undangan berhasil disalin!')).catch(() => fallbackCopy(url));
  } else {
    fallbackCopy(url);
  }
  hideShareMenu();
}

function fallbackCopy(text) {
  const el = document.createElement('textarea');
  el.value = text;
  el.style.position = 'fixed';
  el.style.opacity = '0';
  document.body.appendChild(el);
  el.focus(); el.select();
  try {
    document.execCommand('copy');
    toast('Tautan undangan berhasil disalin!');
  } catch (e) { }
  document.body.removeChild(el);
}

// ── TOAST NOTIFICATION ────────────────────────────────────────
function toast(msg, duration = 3000) {
  let el = document.getElementById('globalToast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'globalToast';
    el.style.cssText = 'position:fixed;bottom:5.5rem;left:50%;transform:translateX(-50%);background:#311B1B;color:white;padding:0.75rem 1.8rem;border-radius:50px;font-weight:700;font-size:0.85rem;z-index:9999;box-shadow:0 6px 30px rgba(0,0,0,0.3);white-space:nowrap;font-family:Montserrat,sans-serif;letter-spacing:0.5px;display:none;';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.display = 'block';
  clearTimeout(el._timer);
  el._timer = setTimeout(() => { el.style.display = 'none'; }, duration);
}

// ── COUNTDOWN TIMER ───────────────────────────────────────────
function initCountdown() {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

function updateCountdown() {
  const diff = WEDDING_DATE - new Date();
  if (diff <= 0) {
    const timer = document.getElementById('countdownTimer');
    const done = document.getElementById('countdownDone');
    if (timer) timer.classList.add('hidden');
    if (done) done.classList.remove('hidden');
    // Also update hero mini countdown
    ['heroCdD', 'heroCdH', 'heroCdM', 'heroCdS'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = '00';
    });
    return;
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  // Main countdown
  const elD = document.getElementById('cdDays');
  const elH = document.getElementById('cdHours');
  const elM = document.getElementById('cdMinutes');
  const elS = document.getElementById('cdSeconds');
  if (elD) elD.textContent = String(d).padStart(2, '0');
  if (elH) elH.textContent = String(h).padStart(2, '0');
  if (elM) elM.textContent = String(m).padStart(2, '0');
  if (elS) elS.textContent = String(s).padStart(2, '0');

  // Hero mini countdown
  const hD = document.getElementById('heroCdD');
  const hH = document.getElementById('heroCdH');
  const hM = document.getElementById('heroCdM');
  const hS = document.getElementById('heroCdS');
  if (hD) hD.textContent = String(d).padStart(2, '0');
  if (hH) hH.textContent = String(h).padStart(2, '0');
  if (hM) hM.textContent = String(m).padStart(2, '0');
  if (hS) hS.textContent = String(s).padStart(2, '0');
}

// ── SCROLL ANIMATIONS ─────────────────────────────────────────
function initScrollAnimations() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('appear'), i * 80);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
}

function triggerVisibleAnimations() {
  document.querySelectorAll('.fade-in').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.95) el.classList.add('appear');
  });
}

// ── NAVIGATION BAR & SCROLLSPY ────────────────────────────────
function initNavBar() {
  const hero = document.getElementById('hero');
  const nav = document.getElementById('navBar');
  if (!hero || !nav) return;

  const heroObs = new IntersectionObserver(entries => {
    nav.classList.toggle('visible', !entries[0].isIntersecting);
  }, { threshold: 0.15 });
  heroObs.observe(hero);

  // Scrollspy
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 200;
      if (window.pageYOffset >= top) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

// ── GALLERY SLIDER CAROUSEL ───────────────────────────────────
let sliderCurrentIndex = 0;
let sliderAutoTimer = null;
let sliderProgress = 0;
let sliderProgressTimer = null;
const SLIDER_INTERVAL = 3500; // ms between auto-slides
const SLIDER_TICK = 50;   // progress bar update interval (ms)

function buildGallerySlider() {
  const track = document.getElementById('sliderTrack');
  const dotsEl = document.getElementById('sliderDots');
  const wrapper = document.getElementById('sliderWrapper');
  if (!track) return;

  // Build slides
  track.innerHTML = '';
  GALLERY_PHOTOS.forEach((photo, idx) => {
    const slide = document.createElement('div');
    slide.className = 'slider-slide';
    slide.innerHTML = `
      <img src="${photo.src}" alt="${photo.alt}"
           loading="${idx < 2 ? 'eager' : 'lazy'}"
           onerror="this.src='couple.png'" />
      <div class="slider-caption">${photo.alt}</div>
    `;
    slide.addEventListener('click', () => {
      // Only open lightbox if not dragging
      if (!wasDragging) openLightbox(idx);
    });
    track.appendChild(slide);
  });

  // Build dot indicators
  if (dotsEl) {
    dotsEl.innerHTML = '';
    GALLERY_PHOTOS.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = 'slider-dot' + (idx === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Foto ${idx + 1}`);
      dot.addEventListener('click', (e) => { e.stopPropagation(); sliderGoTo(idx); });
      dotsEl.appendChild(dot);
    });
  }

  // Add progress bar element
  const prog = document.createElement('div');
  prog.className = 'slider-progress';
  prog.id = 'sliderProgress';
  prog.style.width = '0%';
  wrapper.appendChild(prog);

  // Init drag (touch + mouse)
  initSliderDrag(track, wrapper);

  // Pause on hover
  wrapper.addEventListener('mouseenter', () => sliderPauseAuto());
  wrapper.addEventListener('mouseleave', () => sliderStartAuto());

  // Render initial state
  sliderRender();
  sliderStartAuto();
}

// Render current position
function sliderRender(animated = true) {
  const track = document.getElementById('sliderTrack');
  const counter = document.getElementById('sliderCounter');
  const dotsEl = document.getElementById('sliderDots');
  if (!track) return;

  if (!animated) track.classList.add('is-dragging');
  track.style.transform = `translateX(-${sliderCurrentIndex * 100}%)`;
  if (!animated) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => track.classList.remove('is-dragging'));
    });
  }

  if (counter) counter.textContent = `${sliderCurrentIndex + 1} / ${GALLERY_PHOTOS.length}`;
  if (dotsEl) {
    dotsEl.querySelectorAll('.slider-dot').forEach((d, i) => {
      d.classList.toggle('active', i === sliderCurrentIndex);
    });
  }
}

// Go to specific index
function sliderGoTo(idx, resetProgress = true) {
  sliderCurrentIndex = ((idx % GALLERY_PHOTOS.length) + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length;
  sliderRender();
  if (resetProgress) sliderResetProgress();
}

// Move by delta (+1 next, -1 prev)
function sliderMove(delta) {
  sliderGoTo(sliderCurrentIndex + delta);
  sliderPauseAuto();
  sliderStartAuto();
}

// ── Auto-slide logic ───────────────────────────────
function sliderStartAuto() {
  sliderStopAuto();
  sliderResetProgress();
  sliderAutoTimer = setInterval(() => {
    sliderGoTo(sliderCurrentIndex + 1);
  }, SLIDER_INTERVAL);
}

function sliderPauseAuto() {
  sliderStopAuto();
  sliderStopProgress();
}

function sliderStopAuto() {
  clearInterval(sliderAutoTimer);
  sliderAutoTimer = null;
}

// ── Progress bar ───────────────────────────────────
function sliderResetProgress() {
  sliderStopProgress();
  sliderProgress = 0;
  const bar = document.getElementById('sliderProgress');
  if (bar) bar.style.width = '0%';

  sliderProgressTimer = setInterval(() => {
    sliderProgress = Math.min(sliderProgress + (SLIDER_TICK / SLIDER_INTERVAL) * 100, 100);
    const bar = document.getElementById('sliderProgress');
    if (bar) bar.style.width = sliderProgress + '%';
  }, SLIDER_TICK);
}

function sliderStopProgress() {
  clearInterval(sliderProgressTimer);
  sliderProgressTimer = null;
}

// ── Drag / Swipe (Touch + Mouse) ──────────────────
let dragStartX = 0;
let dragCurrentX = 0;
let isDragging = false;
let wasDragging = false;
const DRAG_THRESHOLD = 50; // px minimum for slide change

function initSliderDrag(track, wrapper) {
  // Touch events
  wrapper.addEventListener('touchstart', onDragStart, { passive: true });
  wrapper.addEventListener('touchmove', onDragMove, { passive: true });
  wrapper.addEventListener('touchend', onDragEnd, { passive: true });

  // Mouse events
  wrapper.addEventListener('mousedown', onDragStart);
  window.addEventListener('mousemove', onDragMove);
  window.addEventListener('mouseup', onDragEnd);
}

function getClientX(e) {
  return e.touches ? e.touches[0].clientX : e.clientX;
}

function onDragStart(e) {
  dragStartX = getClientX(e);
  dragCurrentX = dragStartX;
  isDragging = true;
  wasDragging = false;
  sliderPauseAuto();
  const track = document.getElementById('sliderTrack');
  if (track) track.classList.add('is-dragging');
}

function onDragMove(e) {
  if (!isDragging) return;
  dragCurrentX = getClientX(e);
  const delta = dragCurrentX - dragStartX;

  // Live drag visual feedback
  const track = document.getElementById('sliderTrack');
  if (track) {
    track.style.transform = `translateX(calc(-${sliderCurrentIndex * 100}% + ${delta}px))`;
  }

  if (Math.abs(delta) > 8) wasDragging = true;
}

function onDragEnd(e) {
  if (!isDragging) return;
  isDragging = false;

  const delta = dragCurrentX - dragStartX;
  const track = document.getElementById('sliderTrack');
  if (track) track.classList.remove('is-dragging');

  if (Math.abs(delta) > DRAG_THRESHOLD) {
    sliderGoTo(sliderCurrentIndex + (delta < 0 ? 1 : -1));
  } else {
    // Snap back
    sliderRender();
  }

  sliderStartAuto();
  // Reset wasDragging after a tick so click doesn't fire
  setTimeout(() => { wasDragging = false; }, 10);
}

// ── Keyboard navigation (while slider in view) ────
document.addEventListener('keydown', e => {
  const lb = document.getElementById('lightbox');
  if (lb && !lb.classList.contains('hidden')) return; // lightbox handles its own keys
  if (e.key === 'ArrowLeft') { sliderMove(-1); }
  if (e.key === 'ArrowRight') { sliderMove(1); }
});

// ── LIGHTBOX FULLSCREEN ───────────────────────────
function openLightbox(idx) {
  lightboxIndex = idx;
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  if (!lb || !img) return;
  img.src = GALLERY_PHOTOS[idx].src;
  img.alt = GALLERY_PHOTOS[idx].alt;
  img.onerror = () => { img.src = 'couple.png'; };
  lb.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  sliderPauseAuto();
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.add('hidden');
  document.body.style.overflow = 'auto';
  sliderStartAuto();
}

function closeLightboxOverlay(e) {
  if (e.target === document.getElementById('lightbox')) closeLightbox();
}

function lightboxPrev(e) {
  if (e) e.stopPropagation();
  lightboxIndex = (lightboxIndex - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length;
  const img = document.getElementById('lightboxImg');
  img.style.opacity = '0';
  setTimeout(() => {
    img.src = GALLERY_PHOTOS[lightboxIndex].src;
    img.onerror = () => { img.src = 'couple.png'; };
    img.style.opacity = '1';
  }, 180);
}

function lightboxNext(e) {
  if (e) e.stopPropagation();
  lightboxIndex = (lightboxIndex + 1) % GALLERY_PHOTOS.length;
  const img = document.getElementById('lightboxImg');
  img.style.opacity = '0';
  setTimeout(() => {
    img.src = GALLERY_PHOTOS[lightboxIndex].src;
    img.onerror = () => { img.src = 'couple.png'; };
    img.style.opacity = '1';
  }, 180);
}

document.addEventListener('keydown', e => {
  const lb = document.getElementById('lightbox');
  if (!lb || lb.classList.contains('hidden')) return;
  if (e.key === 'ArrowLeft') lightboxPrev();
  if (e.key === 'ArrowRight') lightboxNext();
  if (e.key === 'Escape') closeLightbox();
});



// ── RSVP & GUEST LIST MANAGEMENT ──────────────────────────────
const GOOGLE_SHEET_URL = '';

function getSavedGuests() {
  const saved = localStorage.getItem('wedding_guests_data');
  if (saved) {
    try { return JSON.parse(saved); } catch (e) { }
  }
  return [
    {
      nama: 'Bpk. Sesuaikan Halawa & Keluarga',
      telepon: '081234567890',
      hadir: 'hadir',
      tamu: '4',
      waktu: '2026-08-01 14:30'
    },
    {
      nama: 'Keluarga Besar Larosa',
      telepon: '081398765432',
      hadir: 'hadir',
      tamu: '5+',
      waktu: '2026-08-02 09:15'
    }
  ];
}

function saveGuest(guest) {
  const list = getSavedGuests();
  list.unshift(guest);
  localStorage.setItem('wedding_guests_data', JSON.stringify(list));
}

function submitRSVP(e) {
  e.preventDefault();
  const btn = document.getElementById('rsvpSubmitBtn');
  const name = document.getElementById('rsvpName').value.trim();
  const phone = document.getElementById('rsvpPhone').value.trim();
  const attend = document.getElementById('rsvpAttend').value;
  const guests = document.getElementById('rsvpGuests').value;

  btn.textContent = 'Mengirim...';
  btn.disabled = true;

  const now = new Date();
  const timestamp = now.toLocaleDateString('id-ID', {
    day: '2-digit', month: 'short', year: 'numeric'
  }) + ' ' + now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  const guestData = {
    nama: name,
    telepon: phone || '-',
    hadir: attend,
    tamu: attend === 'hadir' ? guests : '0',
    waktu: timestamp
  };

  saveGuest(guestData);

  if (GOOGLE_SHEET_URL) {
    const formData = new FormData();
    formData.append('nama', guestData.nama);
    formData.append('telepon', guestData.telepon);
    formData.append('hadir', guestData.hadir);
    formData.append('tamu', guestData.tamu);
    formData.append('waktu', guestData.waktu);

    fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    }).catch(err => console.log('Google Sheet sync:', err));
  }

  setTimeout(() => {
    document.getElementById('rsvpForm').classList.add('hidden');
    document.getElementById('rsvpSuccess').classList.remove('hidden');
    toast('Konfirmasi kehadiran berhasil dicatat!');

    // WhatsApp Redirect
    const waNumber = '6282361594365';
    let waText = `Halo Hendry & Nesra,\nSaya *${name}* ingin mengonfirmasi bahwa saya `;
    if (attend === 'hadir') {
      waText += `*Akan Hadir* bersama *${guests}* orang.\n\nSemoga lancar sampai hari H!`;
    } else {
      waText += `*Maaf, Tidak Bisa Hadir*.\n\nSelamat atas pernikahannya, semoga bahagia selalu!`;
    }
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, '_blank');

  }, 800);
}

// ── ADMIN GUEST MODAL & SPREADSHEET EXPORT ────────────────────
function openGuestModal() {
  const modal = document.getElementById('guestModal');
  if (!modal) return;
  renderGuestTable();
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeGuestModal() {
  const modal = document.getElementById('guestModal');
  if (modal) modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
}

function closeGuestModalOverlay(e) {
  if (e.target === document.getElementById('guestModal')) closeGuestModal();
}

function renderGuestTable() {
  const guests = getSavedGuests();
  const tbody = document.getElementById('guestTableBody');
  if (!tbody) return;

  tbody.innerHTML = '';
  let countHadir = 0;
  let countTidak = 0;
  let countMungkin = 0;
  let totalPax = 0;

  if (guests.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--text-light);">Belum ada tamu yang mengisi konfirmasi.</td></tr>';
  } else {
    guests.forEach((g, idx) => {
      let badgeClass = 'badge-hadir';
      let statusText = 'Akan Hadir';

      if (g.hadir === 'tidak') {
        badgeClass = 'badge-tidak';
        statusText = 'Berhalangan';
        countTidak++;
      } else if (g.hadir === 'mungkin') {
        badgeClass = 'badge-mungkin';
        statusText = 'Mungkin Hadir';
        countMungkin++;
      } else {
        countHadir++;
        const paxNum = parseInt(g.tamu, 10) || 1;
        totalPax += paxNum;
      }

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${idx + 1}</td>
        <td><strong>${esc(g.nama)}</strong></td>
        <td>${esc(g.telepon)}</td>
        <td><span class="badge-status ${badgeClass}">${statusText}</span></td>
        <td>${g.hadir === 'hadir' ? g.tamu + ' Orang' : '-'}</td>
        <td><small style="color:var(--text-light);">${g.waktu}</small></td>
      `;
      tbody.appendChild(tr);
    });
  }

  const elHadir = document.getElementById('sumHadir');
  const elPax = document.getElementById('sumPax');
  const elTidak = document.getElementById('sumTidak');
  const elMungkin = document.getElementById('sumMungkin');
  if (elHadir) elHadir.textContent = countHadir;
  if (elPax) elPax.textContent = totalPax;
  if (elTidak) elTidak.textContent = countTidak;
  if (elMungkin) elMungkin.textContent = countMungkin;
}

function exportGuestCSV() {
  const guests = getSavedGuests();
  if (guests.length === 0) {
    toast('Belum ada data tamu untuk diunduh.');
    return;
  }

  let csvContent = 'No,Nama Lengkap,Nomor WhatsApp,Status Kehadiran,Jumlah Tamu (Pax),Waktu Konfirmasi\n';

  guests.forEach((g, idx) => {
    const no = idx + 1;
    const name = '"' + (g.nama || '').replace(/"/g, '""') + '"';
    const phone = '"' + (g.telepon || '').replace(/"/g, '""') + '"';
    let status = 'Akan Hadir';
    if (g.hadir === 'tidak') status = 'Berhalangan';
    if (g.hadir === 'mungkin') status = 'Mungkin Hadir';
    const pax = g.hadir === 'hadir' ? g.tamu : '0';
    const time = '"' + (g.waktu || '') + '"';

    csvContent += `${no},${name},${phone},${status},${pax},${time}\n`;
  });

  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'Daftar_Tamu_Hendry_Nesra.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  toast('File spreadsheet CSV berhasil diunduh!');
}

// ── UCAPAN & DOA ──────────────────────────────────────────────
const ucapanData = [
  {
    name: 'Keluarga Besar Halawa & Larosa',
    msg: 'Selamat menempuh hidup baru untuk Hendry & Nesra. Semoga senantiasa diberkati dalam kasih dan damai sejahtera Tuhan Yesus Kristus. Amin.'
  }
];

function submitUcapan(e) {
  e.preventDefault();
  const name = document.getElementById('ucapanName').value.trim();
  const msg = document.getElementById('ucapanText').value.trim();
  if (!name || !msg) return;

  ucapanData.unshift({ name, msg });
  renderUcapan();
  document.getElementById('ucapanName').value = '';
  document.getElementById('ucapanText').value = '';
  toast('Ucapan & doa Anda telah terkirim!');
}

function renderUcapan() {
  const list = document.getElementById('ucapanList');
  if (!list) return;
  list.innerHTML = '';
  ucapanData.forEach(u => {
    const item = document.createElement('div');
    item.className = 'ucapan-item';
    item.innerHTML = `
      <div class="ucapan-avatar">${esc(u.name).charAt(0).toUpperCase()}</div>
      <div class="ucapan-body">
        <div class="ucapan-sender">${esc(u.name)}</div>
        <div class="ucapan-msg">${esc(u.msg)}</div>
      </div>
    `;
    list.appendChild(item);
  });
}

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ── SALIN REKENING ────────────────────────────────────────────
function copyRekening(bank, noRek, holder) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(noRek)
      .then(() => toast('Nomor rekening ' + bank + ' (' + noRek + ') berhasil disalin!'))
      .catch(() => fallbackCopy(noRek));
  } else {
    fallbackCopy(noRek);
    toast('Nomor rekening ' + bank + ' (' + noRek + ') berhasil disalin!');
  }
}

// ── QR CODE GENERATOR (Lightweight inline – no external lib) ──
function initQRCode() {
  const el = document.getElementById('qrCodeEl');
  if (!el) return;
  el.innerHTML = '';
  // Use a free QR API as image (no JS library needed)
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(WEDDING_URL)}&color=31-1B-1B&bgcolor=FF-FF-FF&format=svg`;
  const img = document.createElement('img');
  img.src = qrUrl;
  img.alt = 'QR Code Undangan';
  img.width = 180;
  img.height = 180;
  img.style.borderRadius = '8px';
  img.loading = 'lazy';
  el.appendChild(img);
}

// ── OUTSIDE CLICK HANDLER ─────────────────────────────────────
document.addEventListener('click', e => {
  const menu = document.getElementById('shareMenu');
  const btn = document.getElementById('shareBtn');
  if (menu && !menu.classList.contains('hidden') &&
    !menu.contains(e.target) && (!btn || !btn.contains(e.target))) {
    menu.classList.add('hidden');
  }

  const modal = document.getElementById('storyModal');
  if (modal && !modal.classList.contains('hidden') && e.target === modal) {
    modal.classList.add('hidden');
  }
});

// ── DOM LOADED ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  createFireflies();
  loadGuestName();
  bgMusic = document.getElementById('bgMusic');
  document.body.style.overflow = 'hidden';
});

/* ---------------------------------------------------------------
   SPLASH SCREEN LOGIC
   --------------------------------------------------------------- */
window.addEventListener('load', () => {
  const splash = document.getElementById('splashScreen');
  if (splash) {
    setTimeout(() => {
      splash.style.opacity = '0';
      splash.style.visibility = 'hidden';
      setTimeout(() => splash.remove(), 800);
    }, 1500); // 1.5 seconds minimum splash screen
  }
});

/* ---------------------------------------------------------------
   PARTICLES LOGIC
   --------------------------------------------------------------- */
function createParticle() {
  const container = document.getElementById('particles');
  if (!container) return;

  const particle = document.createElement('div');
  particle.classList.add('particle');

  // Randomize size, position, and duration
  const size = Math.random() * 8 + 4; // 4px to 12px
  particle.style.width = size + 'px';
  particle.style.height = size + 'px';

  particle.style.left = Math.random() * 100 + 'vw';
  particle.style.animationDuration = Math.random() * 3 + 4 + 's'; // 4s to 7s
  particle.style.animationDelay = Math.random() * 2 + 's';

  container.appendChild(particle);

  // Remove particle after animation ends to free up memory
  setTimeout(() => {
    particle.remove();
  }, 10000);
}

// Create particles periodically
setInterval(createParticle, 1200);

/* ---------------------------------------------------------------
   LIVE TOAST LOGIC
   --------------------------------------------------------------- */
let liveToastTimer;
function showLiveToast() {
  if (!ucapanData || ucapanData.length === 0) return;

  const toastContainer = document.getElementById('liveToast');
  if (!toastContainer) return;

  // Pick a random wish
  const randomWish = ucapanData[Math.floor(Math.random() * ucapanData.length)];

  document.getElementById('toastName').textContent = randomWish.name;
  document.getElementById('toastMsg').textContent = randomWish.msg;
  document.getElementById('toastAvatar').textContent = randomWish.name.charAt(0).toUpperCase();

  toastContainer.classList.add('show');

  // Hide after 5 seconds
  setTimeout(() => {
    toastContainer.classList.remove('show');
  }, 5000);
}

// Initial start of live toast loop after a delay
setTimeout(() => {
  showLiveToast();
  // Show a toast every 15 seconds
  liveToastTimer = setInterval(showLiveToast, 15000);
}, 5000);
