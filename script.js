/**
 * EMMANUEL BRENYAH ADDAE — EDITORIAL PORTFOLIO INTERACTIVE ENGINE
 * Powers the Dribbble-inspired animations, portrait color-spotlight reveal,
 * expandable dark service accordion, experience floating previews, and project modals.
 */

document.addEventListener('DOMContentLoaded', () => {
  const htmlEl = document.documentElement;

  /* ==========================================================================
     1. FOOTER YEAR
     ========================================================================== */
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
     2. THEME TOGGLE (Light Editorial Mist Default + Dark Mode)
     ========================================================================== */
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('emma_editorial_theme') || 'light';
  htmlEl.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = htmlEl.getAttribute('data-theme') || 'light';
      const next = current === 'light' ? 'dark' : 'light';
      htmlEl.setAttribute('data-theme', next);
      localStorage.setItem('emma_editorial_theme', next);
      updateThemeIcon(next);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (!icon) return;
    icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }

  /* ==========================================================================
     3. PORTRAIT SPOTLIGHT REVEAL & STUDIO COLOR MODE TOGGLE (Dribbble Shot 1)
     ========================================================================== */
  const portraitToggle = document.getElementById('portraitToggle');
  const portraitModeLabel = document.getElementById('portraitModeLabel');
  const portraitWrapper = document.getElementById('portraitWrapper');

  const savedPortraitMode = localStorage.getItem('emma_portrait_mode') || 'editorial';
  htmlEl.setAttribute('data-portrait', savedPortraitMode);
  updatePortraitLabel(savedPortraitMode);

  if (portraitToggle) {
    portraitToggle.addEventListener('click', () => {
      const current = htmlEl.getAttribute('data-portrait') || 'editorial';
      const next = current === 'editorial' ? 'color' : 'editorial';
      htmlEl.setAttribute('data-portrait', next);
      localStorage.setItem('emma_portrait_mode', next);
      updatePortraitLabel(next);
    });
  }

  function updatePortraitLabel(mode) {
    if (!portraitModeLabel) return;
    portraitModeLabel.textContent = mode === 'editorial' ? 'Spotlight' : 'Full Color';
  }

  if (portraitWrapper) {
    let targetX = 50;
    let targetY = 33;
    let currentX = 50;
    let currentY = 33;
    let spotSize = 145;
    let targetSize = 145;
    let rafId = null;

    const animateSpotlight = () => {
      currentX += (targetX - currentX) * 0.14;
      currentY += (targetY - currentY) * 0.14;
      spotSize += (targetSize - spotSize) * 0.14;

      portraitWrapper.style.setProperty('--spot-x', `${currentX.toFixed(2)}%`);
      portraitWrapper.style.setProperty('--spot-y', `${currentY.toFixed(2)}%`);
      portraitWrapper.style.setProperty('--spot-size', `${spotSize.toFixed(1)}px`);

      if (
        Math.abs(targetX - currentX) > 0.08 ||
        Math.abs(targetY - currentY) > 0.08 ||
        Math.abs(targetSize - spotSize) > 0.2
      ) {
        rafId = requestAnimationFrame(animateSpotlight);
      } else {
        rafId = null;
      }
    };

    const startLoop = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(animateSpotlight);
      }
    };

    portraitWrapper.addEventListener('mousemove', (e) => {
      const rect = portraitWrapper.getBoundingClientRect();
      targetX = Math.max(5, Math.min(95, ((e.clientX - rect.left) / rect.width) * 100));
      targetY = Math.max(5, Math.min(95, ((e.clientY - rect.top) / rect.height) * 100));
      targetSize = 185;
      startLoop();
    });

    portraitWrapper.addEventListener('mouseleave', () => {
      targetX = 50;
      targetY = 33;
      targetSize = 145;
      startLoop();
    });

    // Click on portrait also toggles between Editorial Spotlight and Full Studio Color
    portraitWrapper.addEventListener('click', () => {
      if (portraitToggle) portraitToggle.click();
    });
  }

  /* ==========================================================================
     4. ROLE KICKER TYPING ANIMATION
     ========================================================================== */
  const typedTextSpan = document.getElementById('typedText');
  const roles = [
    'Flutter & Mobile Engineer',
    'UI/UX & Product Engineer',
    'Full-Stack Web Developer',
    'E2E QA & Systems Architect'
  ];
  let roleIdx = 0;
  let charIdx = roles[0].length;
  let isDeleting = true;

  function tickRoleType() {
    if (!typedTextSpan) return;
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      charIdx--;
      typedTextSpan.textContent = currentRole.substring(0, charIdx);
      if (charIdx <= 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(tickRoleType, 320);
        return;
      }
      setTimeout(tickRoleType, 32);
    } else {
      const nextRole = roles[roleIdx];
      charIdx++;
      typedTextSpan.textContent = nextRole.substring(0, charIdx);
      if (charIdx >= nextRole.length) {
        isDeleting = true;
        setTimeout(tickRoleType, 2400);
        return;
      }
      setTimeout(tickRoleType, 62);
    }
  }

  if (typedTextSpan) {
    setTimeout(tickRoleType, 2200);
  }

  /* ==========================================================================
     5. MOBILE DRAWER MENU
     ========================================================================== */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const drawerClose = document.getElementById('drawerClose');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function toggleMobileMenu(open) {
    if (!mobileDrawer || !mobileOverlay) return;
    mobileDrawer.classList.toggle('active', open);
    mobileOverlay.classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', () => toggleMobileMenu(true));
  if (drawerClose) drawerClose.addEventListener('click', () => toggleMobileMenu(false));
  if (mobileOverlay) mobileOverlay.addEventListener('click', () => toggleMobileMenu(false));
  drawerLinks.forEach((link) => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });

  /* ==========================================================================
     6. /SELECTED WORK FILTER TABS & CASE STUDY MODAL (Dribbble Shot 2)
     ========================================================================== */
  const workTabs = document.querySelectorAll('.work-tab');
  const workCards = document.querySelectorAll('.work-card');

  workTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      workTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filter = tab.getAttribute('data-work-filter');
      workCards.forEach((card) => {
        const cats = card.getAttribute('data-category') || '';
        const matches = filter === 'all' || cats.split(' ').includes(filter);
        if (matches) {
          card.classList.remove('hidden-card');
        } else {
          card.classList.add('hidden-card');
        }
      });
    });
  });

  // Case Study Deep-Dive Data for All 8 Projects
  const projectCaseStudies = {
    treesyt: {
      badge: 'REAL PROJECT • VITARA COMPANY LTD',
      title: 'TreeSyt — Offline-First Field App & E2E Automation Suite',
      subtitle:
        'Enterprise forestry and field operations mobile platform engineered during my tenure as Associate Mobile Developer at Vitara Company Ltd in Wa, Ghana.',
      highlights: [
        'Engineered core offline-first mobile modules in Flutter & Dart, enabling field officers to capture GPS plots and sync seamlessly in low-connectivity zones.',
        'Authored and executed comprehensive End-to-End (E2E) automated test suites across Mobile and Web to prevent regressions and guarantee release stability.',
        'Collaborated with product and backend engineering teams to streamline sync queues and reduce field latency.'
      ],
      stack: ['Flutter', 'Dart', 'SQLite Offline Sync', 'E2E Automated Testing', 'REST APIs', 'Git / Jira']
    },
    zerohunger: {
      badge: 'REAL PROJECT • AI & AGRITECH',
      title: 'Zero Hunger Pro — AI-Powered Smart Farming & Crop Pathology Assistant',
      subtitle:
        'End-to-end SDG-2 smart agriculture ecosystem combining a Flutter mobile app with a Python machine learning backend (Random Forest & Computer Vision).',
      highlights: [
        'Predicts optimal crop suitability from soil N-P-K, pH, rainfall, and live weather telemetry using a trained Random Forest classifier.',
        'Scans plant leaves via device camera to diagnose 38+ crop diseases with organic & chemical treatment action plans.',
        'Features offline bilingual Text-to-Speech (TTS) in English and Twi so local Ghanaian farmers can listen to agronomic guidance hands-free.'
      ],
      stack: ['Flutter & Dart', 'Python ML', 'Random Forest', 'Computer Vision', 'English & Twi TTS', 'Open-Meteo API']
    },
    'vitara-suite': {
      badge: 'REAL PROJECT • VITARA COMPANY LTD',
      title: 'Agent Onboarding Mobile App & Flutter Web Error Triage Console',
      subtitle:
        'Dual-platform internal operations suite built for HR managers, agent supervisors, and engineering QA teams at Vitara Company Ltd.',
      highlights: [
        'Built a dedicated Mobile Agent Onboarding Application managing candidate pipelines, structured interview scoring, and interactive training verification.',
        'Designed an in-app Error Reporting History module that captures device state, stack traces, and sync logs when field exceptions occur.',
        'Developed the companion Flutter Web Administrative Dashboard for real-time bug triage, filtering, and resolution tracking.'
      ],
      stack: ['Flutter Mobile', 'Flutter Web', 'Dart', 'SQLite', 'REST APIs', 'Diagnostic Telemetry']
    },
    kekego: {
      badge: 'REAL PROJECT • URBAN MOBILITY',
      title: 'KekeGo Ghana — Offline-Tolerant Ride-Hailing & Mobility App',
      subtitle:
        'Hyper-local tricycle (Keke) ride-hailing platform tailored for Ghanaian commuters and drivers with Clean Architecture and offline queue resilience.',
      highlights: [
        'Designed dual rider and driver flows with upfront fare estimation, landmark-based pickup selection, and real-time trip status tracking.',
        'Implemented local request queueing and automatic retry orchestration so bookings survive intermittent 3G/edge network drops.',
        'Structured with modular Clean Architecture layers (Domain, Data, Presentation) for rapid feature scaling.'
      ],
      stack: ['Flutter', 'Dart', 'Clean Architecture', 'Firebase', 'Geolocation & Maps', 'Offline Queue']
    },
    harvestgo: {
      badge: 'MULTI-TENANT MVP • E-COMMERCE',
      title: 'HarvestGo — 3-in-1 Hyper-Local Grocery Storefront, Vendor & Admin Suite',
      subtitle:
        'Unified multi-portal Flutter application delivering a 15-minute local produce shopping experience alongside partner inventory and dispatch consoles.',
      highlights: [
        'Single codebase supporting 3 role-based portals: Customer Storefront, Vendor Partner Inventory Manager, and Admin Operations Console.',
        'Real-time order lifecycle updates, cart persistence, and promotional flash deals backed by Cloud Firestore.',
        'Responsive layout engine adapting seamlessly between mobile handsets, tablets, and desktop web browsers.'
      ],
      stack: ['Flutter Multi-Platform', 'Dart', 'Cloud Firestore', 'Firebase Auth', 'Role-Based Routing']
    },
    mystore: {
      badge: 'REAL PROJECT • RETAIL POS',
      title: 'MyStoreManagement — Offline-First Retail Inventory, Barcode & Sales POS',
      subtitle:
        'Production-ready point-of-sale and inventory ledger built for retail shop owners requiring 100% offline reliability with cloud spreadsheet backup.',
      highlights: [
        'Powered by Hive NoSQL local database for zero-latency barcode scanning, stock deduction, and daily profit/loss analytics without internet.',
        'One-tap export and synchronization with Microsoft Excel (.xlsx) and Google Sheets for accountant-ready reporting.',
        'Includes low-stock threshold alerts, batch expiry tracking, and printable receipt summaries.'
      ],
      stack: ['Flutter', 'Dart', 'Hive Local DB', 'Barcode Scanner', 'Excel & Google Sheets API']
    },
    ministryhub: {
      badge: 'REAL PROJECT • COMMUNITY PLATFORM',
      title: 'OJ Studios MinistryHub — Digital Learning, Sermons & Community Platform',
      subtitle:
        'Full-featured faith and digital learning ecosystem built with Flutter, Riverpod, GoRouter, and Firebase for structured courses and community engagement.',
      highlights: [
        'Features daily devotional streaks, audio/video sermon streaming, interactive Bible study courses, and a moderated prayer wall.',
        'Role-based access control allowing ministry leaders to publish content, review submissions, and manage announcements.',
        'Engineered with reactive Riverpod state management and declarative GoRouter deep linking.'
      ],
      stack: ['Flutter', 'Riverpod', 'GoRouter', 'Firebase Auth & Firestore', 'Media Streaming']
    },
    'hymns-logig': {
      badge: 'BILINGUAL AUDIO APP • HERITAGE UX',
      title: 'COC Hymns Player — Bilingual English & Twi Audio Worship Application',
      subtitle:
        'Cross-platform digital hymnal and background audio player supporting side-by-side English and Twi lyrics, offline search, and curated streams.',
      highlights: [
        'Instant bilingual switching between English and Twi hymn lyrics with adjustable typography and dark worship mode.',
        'Background audio playback and YouTube/audio stream integration with persistent favorites and custom service playlists.',
        'Built with clean, accessible UI patterns honed during my web & mobile engineering tenures.'
      ],
      stack: ['Flutter', 'Dart', 'Background Audio Service', 'Bilingual Search', 'Local Persistence']
    }
  };

  const caseModalBackdrop = document.getElementById('caseModalBackdrop');
  const caseModalClose = document.getElementById('caseModalClose');
  const caseModalBadge = document.getElementById('caseModalBadge');
  const caseModalTitle = document.getElementById('caseModalTitle');
  const caseModalSubtitle = document.getElementById('caseModalSubtitle');
  const caseModalHighlights = document.getElementById('caseModalHighlights');
  const caseModalStack = document.getElementById('caseModalStack');
  const caseModalInquire = document.getElementById('caseModalInquire');

  function openCaseModal(projectId) {
    const data = projectCaseStudies[projectId];
    if (!data || !caseModalBackdrop) return;

    caseModalBadge.textContent = data.badge;
    caseModalTitle.textContent = data.title;
    caseModalSubtitle.textContent = data.subtitle;

    caseModalHighlights.innerHTML = data.highlights
      .map(
        (item) => `
        <div class="case-highlight-item">
          <i class="fa-solid fa-circle-check"></i>
          <span>${item}</span>
        </div>
      `
      )
      .join('');

    caseModalStack.innerHTML = data.stack
      .map((tech) => `<span class="meta-pill">${tech}</span>`)
      .join('');

    caseModalBackdrop.classList.add('open');
    caseModalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCaseModal() {
    if (!caseModalBackdrop) return;
    caseModalBackdrop.classList.remove('open');
    caseModalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  workCards.forEach((card) => {
    card.addEventListener('click', () => {
      const pid = card.getAttribute('data-project-id');
      if (pid) openCaseModal(pid);
    });
  });

  if (caseModalClose) caseModalClose.addEventListener('click', closeCaseModal);
  if (caseModalBackdrop) {
    caseModalBackdrop.addEventListener('click', (e) => {
      if (e.target === caseModalBackdrop) closeCaseModal();
    });
  }
  if (caseModalInquire) {
    caseModalInquire.addEventListener('click', () => {
      closeCaseModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && caseModalBackdrop && caseModalBackdrop.classList.contains('open')) {
      closeCaseModal();
    }
  });

  /* ==========================================================================
     7. /SERVICE INTERACTIVE DARK SHOWCASE ACCORDION (Dribbble Shot 3)
     ========================================================================== */
  const serviceItems = document.querySelectorAll('.service-item');

  serviceItems.forEach((item) => {
    const bar = item.querySelector('.service-bar');
    if (!bar) return;

    const activateService = () => {
      const isAlreadyActive = item.classList.contains('active');
      serviceItems.forEach((other) => {
        other.classList.remove('active');
        const otherBar = other.querySelector('.service-bar');
        if (otherBar) otherBar.setAttribute('aria-expanded', 'false');
      });

      if (!isAlreadyActive) {
        item.classList.add('active');
        bar.setAttribute('aria-expanded', 'true');
      }
    };

    bar.addEventListener('click', activateService);
    bar.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateService();
      }
    });
  });

  /* ==========================================================================
     8. /EXPERIENCE INTERACTIVE ROWS & HOVER PREVIEW (Dribbble Shot 4)
     ========================================================================== */
  const expRows = document.querySelectorAll('.exp-row');

  expRows.forEach((row) => {
    row.addEventListener('mouseenter', () => {
      expRows.forEach((r) => r.classList.remove('active'));
      row.classList.add('active');
    });

    row.addEventListener('click', () => {
      expRows.forEach((r) => r.classList.remove('active'));
      row.classList.add('active');
    });

    row.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        expRows.forEach((r) => r.classList.remove('active'));
        row.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     9. /SKILLS & CREDENTIALS CATEGORY FILTER TABS
     ========================================================================== */
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  skillTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      skillTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');
      skillCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================================
     10. CONTACT FORM & STUDIO INTERACTION (Dribbble Shot 5)
     ========================================================================== */
  const toggleContactFormBtn = document.getElementById('toggleContactFormBtn');
  const contactStudio = document.getElementById('contactStudio');
  const contactForm = document.getElementById('contactForm');

  if (toggleContactFormBtn && contactStudio) {
    toggleContactFormBtn.addEventListener('click', () => {
      contactStudio.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const nameInput = document.getElementById('name');
      if (nameInput) {
        setTimeout(() => nameInput.focus(), 450);
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name')?.value.trim() || '';
      const email = document.getElementById('email')?.value.trim() || '';
      const subject = document.getElementById('subject')?.value.trim() || 'Portfolio Inquiry';
      const message = document.getElementById('message')?.value.trim() || '';

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalHTML = submitBtn ? submitBtn.innerHTML : '';

      if (submitBtn) {
        submitBtn.innerHTML = '<span>Opening Email Client...</span> <i class="fa-solid fa-check"></i>';
        submitBtn.disabled = true;
      }

      const mailtoBody = encodeURIComponent(
        `Hello Emmanuel,\n\nMy name is ${name} (${email}).\n\n${message}\n\nBest regards,\n${name}`
      );
      const mailtoUrl = `mailto:addaebemmanuel@gmail.com?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;
      window.location.href = mailtoUrl;

      setTimeout(() => {
        contactForm.reset();
        if (submitBtn) {
          submitBtn.innerHTML = originalHTML;
          submitBtn.disabled = false;
        }
      }, 2500);
    });
  }

  /* ==========================================================================
     11. SCROLL REVEAL & BACK TO TOP BUTTON
     ========================================================================== */
  const revealFrames = document.querySelectorAll('.reveal-frame');
  const backToTopBtn = document.getElementById('backToTop');

  const frameObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  revealFrames.forEach((frame) => frameObserver.observe(frame));

  window.addEventListener(
    'scroll',
    () => {
      if (backToTopBtn) {
        backToTopBtn.classList.toggle('visible', window.scrollY > 520);
      }
    },
    { passive: true }
  );

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     12. CUSTOM MAGNETIC CURSOR & BUTTON PULL (Desktop)
     ========================================================================== */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;

  if (isFinePointer && cursorDot && cursorRing) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener(
      'mousemove',
      (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      },
      { passive: true }
    );

    const renderRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(renderRing);
    };
    requestAnimationFrame(renderRing);

    const interactiveEls = document.querySelectorAll(
      'a, button, .work-card, .service-bar, .exp-row, .portrait-wrapper'
    );
    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('cursor-hover'));
    });
  }

  // Subtle Magnetic Pull on Pill Buttons
  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  if (isFinePointer) {
    magneticBtns.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.18;
        const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.22;
        btn.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }
});
