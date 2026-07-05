// ==========================================
// Anniversary Website — 8-Bit Pixel Art Theme
// All interactive logic & animations
// ==========================================

// ---- CONFIGURATION ----
const CONFIG = {
  // ✏️ EDIT THIS: Change to your real anniversary date
  anniversaryDate: new Date(2019, 6, 6), // bulan dimulai dari 0 (0=Jan, 6=Jul)
  particleCount: 40,
};

// ==========================================
// PARTICLE SYSTEM — 8-bit hearts, stars & pixels
// ==========================================
class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.init();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  init() {
    const count = window.innerWidth < 768
      ? Math.floor(CONFIG.particleCount * 0.5)
      : CONFIG.particleCount;
    for (let i = 0; i < count; i++) {
      this.particles.push(this.createParticle());
    }
  }

  createParticle() {
    const types = ['heart', 'heart', 'star', 'pixel']; // more hearts
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      size: Math.random() * 10 + 4,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -(Math.random() * 0.5 + 0.15),
      opacity: Math.random() * 0.4 + 0.08,
      type: types[Math.floor(Math.random() * types.length)],
      color: Math.random() > 0.5 ? '#FF1744' : '#FF6B9D',
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.02 + 0.01,
    };
  }

  drawPixelHeart(x, y, size, color, opacity) {
    const ctx = this.ctx;
    const s = size / 7;
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;

    const pattern = [
      [0, 1, 1, 0, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 0, 0, 0],
    ];

    for (let r = 0; r < pattern.length; r++) {
      for (let c = 0; c < pattern[r].length; c++) {
        if (pattern[r][c]) {
          ctx.fillRect(x + (c - 3.5) * s, y + (r - 3) * s, s + 0.5, s + 0.5);
        }
      }
    }
    ctx.globalAlpha = 1;
  }

  drawPixelStar(x, y, size, color, opacity) {
    const ctx = this.ctx;
    const s = size / 5;
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;

    const pattern = [
      [0, 0, 1, 0, 0],
      [0, 1, 1, 1, 0],
      [1, 1, 1, 1, 1],
      [0, 1, 1, 1, 0],
      [0, 0, 1, 0, 0],
    ];

    for (let r = 0; r < pattern.length; r++) {
      for (let c = 0; c < pattern[r].length; c++) {
        if (pattern[r][c]) {
          ctx.fillRect(x + (c - 2) * s, y + (r - 2) * s, s + 0.5, s + 0.5);
        }
      }
    }
    ctx.globalAlpha = 1;
  }

  drawPixelSquare(x, y, size, color, opacity) {
    this.ctx.globalAlpha = opacity;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x - size / 2, y - size / 2, size, size);
    this.ctx.globalAlpha = 1;
  }

  update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const p of this.particles) {
      p.x += p.speedX;
      p.y += p.speedY;
      p.twinkle += p.twinkleSpeed;

      // Subtle twinkle effect
      const twinkleOpacity = p.opacity * (0.7 + 0.3 * Math.sin(p.twinkle));

      // Wrap around
      if (p.y < -20) {
        p.y = this.canvas.height + 20;
        p.x = Math.random() * this.canvas.width;
      }
      if (p.x < -20) p.x = this.canvas.width + 20;
      if (p.x > this.canvas.width + 20) p.x = -20;

      switch (p.type) {
        case 'heart':
          this.drawPixelHeart(p.x, p.y, p.size, p.color, twinkleOpacity);
          break;
        case 'star':
          this.drawPixelStar(p.x, p.y, p.size, p.color, twinkleOpacity);
          break;
        default:
          this.drawPixelSquare(p.x, p.y, p.size * 0.6, p.color, twinkleOpacity);
      }
    }

    requestAnimationFrame(() => this.update());
  }

  start() {
    this.update();
  }
}

// ==========================================
// PIXEL CHARACTER DRAWER — Canvas sprite art
// ==========================================
class PixelCharacter {
  static draw(canvas, sprite, palette) {
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const pixelSize = 4;
    for (let row = 0; row < sprite.length; row++) {
      for (let col = 0; col < sprite[row].length; col++) {
        const key = sprite[row][col];
        if (key !== 0) {
          ctx.fillStyle = palette[key];
          ctx.fillRect(col * pixelSize, row * pixelSize, pixelSize, pixelSize);
        }
      }
    }
  }

  static drawBoy(canvas) {
    const palette = {
      1: '#3B2507', // hair
      2: '#FFD1A4', // skin
      3: '#FF1744', // shirt (red)
      4: '#1A1A2E', // pants
      5: '#333333', // shoes
      6: '#111111', // eyes
      7: '#FF6B9D', // blush
      8: '#CC1133', // shirt shadow
    };

    const sprite = [
      [0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0],
      [0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0],
      [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
      [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
      [0,0,0,2,2,2,2,2,2,2,2,2,2,0,0,0],
      [0,0,2,2,6,2,2,2,2,2,6,2,2,0,0,0],
      [0,0,2,2,6,2,2,2,2,2,6,2,2,0,0,0],
      [0,0,2,7,2,2,2,2,2,2,2,7,2,0,0,0],
      [0,0,0,2,2,2,2,2,2,2,2,2,0,0,0,0],
      [0,0,0,0,2,2,3,3,3,2,2,0,0,0,0,0],
      [0,0,0,3,3,3,3,3,3,3,3,3,3,0,0,0],
      [0,0,3,3,3,3,3,3,3,3,3,3,3,3,0,0],
      [0,0,3,3,8,3,3,3,3,3,8,3,3,3,0,0],
      [0,0,0,3,3,3,3,3,3,3,3,3,3,0,0,0],
      [0,0,0,0,3,3,3,3,3,3,3,3,0,0,0,0],
      [0,0,0,0,4,4,4,0,4,4,4,0,0,0,0,0],
      [0,0,0,0,4,4,4,0,4,4,4,0,0,0,0,0],
      [0,0,0,0,4,4,4,0,4,4,4,0,0,0,0,0],
      [0,0,0,0,5,5,5,0,5,5,5,0,0,0,0,0],
      [0,0,0,5,5,5,5,0,5,5,5,5,0,0,0,0],
    ];

    this.draw(canvas, sprite, palette);
  }

  static drawGirl(canvas) {
    const palette = {
      1: '#4A1A2C', // hair
      2: '#FFD1A4', // skin
      3: '#FF6B9D', // dress (pink)
      4: '#FF1744', // dress accent
      5: '#333333', // shoes
      6: '#111111', // eyes
      7: '#FF8FAB', // blush
      8: '#FFD700', // hair bow
      9: '#E0557F', // dress shadow
    };

    const sprite = [
      [0,0,0,0,8,1,1,1,1,1,1,8,0,0,0,0],
      [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
      [0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
      [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
      [0,1,1,2,2,2,2,2,2,2,2,2,2,1,1,0],
      [0,1,2,2,6,2,2,2,2,2,6,2,2,1,0,0],
      [0,0,2,2,6,2,2,2,2,2,6,2,2,0,0,0],
      [0,0,2,7,2,2,2,2,2,2,2,7,2,0,0,0],
      [0,0,0,2,2,2,4,4,4,2,2,2,0,0,0,0],
      [0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,0],
      [0,0,0,3,3,3,3,3,3,3,3,3,3,0,0,0],
      [0,0,3,3,4,3,3,3,3,3,4,3,3,3,0,0],
      [0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0],
      [0,3,3,9,3,3,3,3,3,3,3,9,3,3,3,0],
      [0,0,3,3,3,3,3,3,3,3,3,3,3,3,0,0],
      [0,0,0,3,3,3,3,3,3,3,3,3,3,0,0,0],
      [0,0,0,0,2,2,0,0,0,2,2,0,0,0,0,0],
      [0,0,0,0,2,2,0,0,0,2,2,0,0,0,0,0],
      [0,0,0,0,5,5,0,0,0,5,5,0,0,0,0,0],
      [0,0,0,5,5,5,5,0,5,5,5,5,0,0,0,0],
    ];

    this.draw(canvas, sprite, palette);
  }
}

// ==========================================
// COUNTDOWN TIMER — Hitung mundur ke anniversary berikutnya
// Reset tepat 00:00 WIB (UTC+7), tidak bergantung timezone device
// ==========================================
class CountdownTimer {
  constructor(anniversaryDate) {
    this.month = anniversaryDate.getMonth(); // 0-indexed
    this.day   = anniversaryDate.getDate();
    this.els = {
      days:    document.getElementById('countdown-days'),
      hours:   document.getElementById('countdown-hours'),
      minutes: document.getElementById('countdown-minutes'),
      seconds: document.getElementById('countdown-seconds'),
    };
    this.update();
    setInterval(() => this.update(), 1000);
  }

  update() {
    const nowMs = Date.now();

    // WIB = UTC+7
    const WIB_OFFSET_MS = 7 * 60 * 60 * 1000;

    // Hitung "sekarang" dalam WIB menggunakan UTC
    const nowInWIB = new Date(nowMs + WIB_OFFSET_MS);
    const yearWIB  = nowInWIB.getUTCFullYear();

    // Target: anniversary tahun ini jam 00:00 WIB
    // = UTC midnight - 7 jam = tanggal tersebut jam 17:00 UTC hari sebelumnya
    let targetMs = Date.UTC(yearWIB, this.month, this.day, 0, 0, 0) - WIB_OFFSET_MS;

    // Kalau sudah lewat, pakai tahun depan
    if (targetMs <= nowMs) {
      targetMs = Date.UTC(yearWIB + 1, this.month, this.day, 0, 0, 0) - WIB_OFFSET_MS;
    }

    const diff    = targetMs - nowMs;
    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (this.els.days)    this.els.days.textContent    = String(days).padStart(3, '0');
    if (this.els.hours)   this.els.hours.textContent   = String(hours).padStart(2, '0');
    if (this.els.minutes) this.els.minutes.textContent = String(minutes).padStart(2, '0');
    if (this.els.seconds) this.els.seconds.textContent = String(seconds).padStart(2, '0');
  }
}

// ==========================================
// SCROLL ANIMATIONS (Intersection Observer)
// ==========================================
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  document.querySelectorAll('[data-scroll]').forEach((el) => {
    observer.observe(el);
  });
}

// ==========================================
// NAVIGATION
// ==========================================
function initNavigation() {
  const toggle = document.getElementById('nav-toggle');
  const linksContainer = document.getElementById('nav-links');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section');

  // Mobile menu toggle
  if (toggle && linksContainer) {
    toggle.addEventListener('click', () => {
      linksContainer.classList.toggle('active');
      toggle.textContent = linksContainer.classList.contains('active') ? '✕' : '☰';
    });
  }

  // Close menu on link click (mobile)
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (linksContainer) linksContainer.classList.remove('active');
      if (toggle) toggle.textContent = '☰';
    });
  });

  // Active link highlight on scroll
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
}

// ==========================================
// GALLERY LIGHTBOX
// ==========================================
function initGallery() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('.gallery-photo');
      const label = item.querySelector('.gallery-item-label');

      if (img && lightbox) {
        lightboxImg.src = img.src;
        lightboxImg.alt = label ? label.textContent : 'Gallery image';
        lightboxCaption.textContent = label ? label.textContent : '';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

// ==========================================
// MUSIC PLAYER
// ==========================================
function initMusicPlayer() {
  const audio = document.getElementById('audio-element');
  const playBtn = document.getElementById('play-btn');
  const progressContainer = document.getElementById('progress-container');
  const progressFill = document.getElementById('progress-fill');
  const currentTimeEl = document.getElementById('current-time');
  const totalTimeEl = document.getElementById('total-time');
  const visualizer = document.getElementById('visualizer');

  if (!playBtn || !audio) return;

  let isPlaying = false;

  playBtn.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause();
      playBtn.textContent = '▶';
      if (visualizer) visualizer.classList.add('paused');
    } else {
      audio.play().catch(() => {
        // Gracefully handle missing audio — visualizer still animates for demo
        console.log('💡 Tip: Add your audio file in assets/ and update <source> in index.html');
      });
      playBtn.textContent = '⏸';
      if (visualizer) visualizer.classList.remove('paused');
    }
    isPlaying = !isPlaying;
  });

  audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
      const progress = (audio.currentTime / audio.duration) * 100;
      progressFill.style.width = progress + '%';
      currentTimeEl.textContent = formatTime(audio.currentTime);
      totalTimeEl.textContent = formatTime(audio.duration);
    }
  });

  if (progressContainer) {
    progressContainer.addEventListener('click', (e) => {
      if (audio.duration) {
        const rect = progressContainer.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        audio.currentTime = pos * audio.duration;
      }
    });
  }

  audio.addEventListener('ended', () => {
    isPlaying = false;
    playBtn.textContent = '▶';
    if (visualizer) visualizer.classList.add('paused');
    progressFill.style.width = '0%';
  });
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// ==========================================
// SMOOTH SCROLL for anchor links
// ==========================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 60; // account for fixed nav
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

// ==========================================
// INITIALIZE EVERYTHING
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Particle system
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ps = new ParticleSystem(canvas);
    ps.start();
  }

  // 2. Pixel art characters
  const boyCanvas = document.getElementById('char-boy');
  const girlCanvas = document.getElementById('char-girl');
  if (boyCanvas) PixelCharacter.drawBoy(boyCanvas);
  if (girlCanvas) PixelCharacter.drawGirl(girlCanvas);

  // 3. Countdown timer
  new CountdownTimer(CONFIG.anniversaryDate);

  // 4. Scroll animations
  initScrollAnimations();

  // 5. Navigation
  initNavigation();

  // 6. Gallery
  initGallery();

  // 7. Music player
  initMusicPlayer();

  // 8. Smooth scroll
  initSmoothScroll();

  // 9. Set visualizer to paused initially
  const visualizer = document.getElementById('visualizer');
  if (visualizer) visualizer.classList.add('paused');
});
