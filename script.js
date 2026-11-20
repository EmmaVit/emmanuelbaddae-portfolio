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
    let targetX = 52;
    let targetY = 48;
    let currentX = 52;
    let currentY = 48;
    let spotSize = 215;
    let targetSize = 215;
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
      targetSize = 230;
      startLoop();
    });

    portraitWrapper.addEventListener('touchmove', (e) => {
      if (!e.touches || !e.touches[0]) return;
      const touch = e.touches[0];
      const rect = portraitWrapper.getBoundingClientRect();
      targetX = Math.max(5, Math.min(95, ((touch.clientX - rect.left) / rect.width) * 100));
      targetY = Math.max(5, Math.min(95, ((touch.clientY - rect.top) / rect.height) * 100));
      targetSize = 195;
      startLoop();
    }, { passive: true });

    portraitWrapper.addEventListener('mouseleave', () => {
      targetX = 52;
      targetY = 48;
      targetSize = 215;
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
    'Offline-First App Developer',
    'Full-Stack Web Developer',
    'Mobile & Web E2E QA'
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

  // Case Study Deep-Dive Data & Real Screenshot Galleries for All 8 Projects
  const projectCaseStudies = {
    treesyt: {
      badge: 'VITARA COMPANY LTD • PRODUCTION',
      title: 'TreeSyt — Offline-First Field Operations App & E2E QA',
      subtitle:
        'Production agricultural and field operations mobile platform engineered at Vitara Company Ltd in Wa, Ghana (retained full-time after completing National Service).',
      screens: [
        {
          src: 'assets/projects/treesyt-home.webp',
          caption: 'Field Agent Home — Budget, Purchases, Warehouse, Profiling & Green Tracker'
        }
      ],
      highlights: [
        'Built and shipped core offline-first mobile features in Flutter & Dart across field modules including Weekly Budget, Purchases, Warehouse Activity, Farmer Profiling, Green Tracker, Farmer Support, Forms, and Trainings.',
        'Contributed to Mobile and Web End-to-End (E2E) test cases across feature workflows to catch regressions before release.',
        'Retained full-time on the mobile engineering team (Oct 2026 – Present) after completing National Service to continue building and maintaining offline-first Flutter workflows.'
      ],
      stack: ['Flutter', 'Dart', 'Offline-First SQLite', 'Mobile & Web E2E QA', 'REST APIs', 'Git / Jira']
    },
    zerohunger: {
      badge: 'AI & AGRITECH',
      title: 'Zero Hunger Pro — Multimodal Smart Farming & Crop Pathology App',
      subtitle:
        'Smart agriculture mobile application pairing Flutter with cloud AI vision, Open-Meteo weather telemetry, multilingual voice guidance, and local data encryption.',
      screens: [
        {
          src: 'assets/projects/zerohunger-dashboard.webp',
          caption: 'Farm Dashboard — Farm Health Score & Open-Meteo Live Weather'
        },
        {
          src: 'assets/projects/zerohunger-lens.webp',
          caption: 'AgroSense AI Lens — Multimodal Camera, GPS Lock & Climate Fusion'
        },
        {
          src: 'assets/projects/zerohunger-settings.webp',
          caption: 'Settings — 5-Language Voice TTS & Ghana Act 843 Local Encryption'
        }
      ],
      highlights: [
        'Built AgroSense AI Lens — a unified multimodal camera screen (Auto-Detect, Soil & Crops, Leaf Scanner) that fuses camera frames, GPS coordinates, and local climate data.',
        'Integrates Open-Meteo live weather telemetry (temperature, humidity, rainfall, UV index) alongside Farm Health Score monitoring and scan history.',
        'Supports Voice Text-to-Speech in 5 Ghanaian & local languages (English, Twi, Ga, Fante, and Hausa) with Ghana Act 843 local encryption for farm GPS and location data.'
      ],
      stack: ['Flutter & Dart', 'Python ML Backend', 'Multimodal Camera AI', 'Open-Meteo API', '5-Language Voice TTS', 'Act 843 Encryption']
    },
    'vitara-suite': {
      badge: 'VITARA COMPANY LTD • INTERNAL SUITE',
      title: 'TreeSyt Agent Onboarding App & Mobile Error Triage Portal',
      subtitle:
        'Internal mobile and web tools built for Vitara Company Ltd to streamline Field Agent recruitment and triage field-reported mobile issues.',
      screens: [
        {
          src: 'assets/projects/onboarding-welcome.webp',
          caption: 'Onboarding Welcome — Join the TreeSyt Field Agent Network'
        },
        {
          src: 'assets/projects/onboarding-journey.webp',
          caption: '5-Step Application Journey — Document Upload, Biometric Match & Voice Interview'
        },
        {
          src: 'assets/projects/onboarding-next.webp',
          caption: 'Post-Submission Timeline — HR Review, AI Voice Interview Invite & Decision'
        },
        {
          src: 'assets/projects/onboarding-form.webp',
          caption: 'Step 1 of 4 — Personal Information Form with Ghana (+233) Input'
        }
      ],
      highlights: [
        'Contributed to the Field Agent Onboarding mobile app covering a 4-step Personal Information form, Document Upload (Government ID, CV, cover letter, guarantor info), AI biometric face & ID match, and live AI voice interview invitations.',
        'Built an in-app Error Reporting History feature enabling field agents to submit mobile issue reports directly from their devices.',
        'Built the companion Flutter Web Administrative Portal for the Mobile Team to review, track, and triage reported issues coming in from the field.'
      ],
      stack: ['Flutter Mobile', 'Flutter Web', 'Dart', 'REST APIs', 'Document & KYC Flows', 'Error Telemetry']
    },
    kekego: {
      badge: 'MOBILITY APP',
      title: 'KekeGo — Local Tricycle (Keke) Ride-Hailing Mobile App',
      subtitle:
        'Local tricycle ("Keke") ride-hailing mobile app built with Flutter and Clean Architecture for Ghanaian commuters.',
      screens: [
        {
          src: 'assets/projects/kekego-splash.webp',
          caption: 'KekeGo Splash Screen — Book a Keke. Ride Smarter.'
        }
      ],
      highlights: [
        'Designed a dedicated Ghanaian mobility experience tailored around everyday Keke tricycle trips ("Book a Keke. Ride Smarter.").',
        'Structured with Clean Architecture separation (Domain, Data, Presentation) to keep booking state, location services, and backend integration modular.',
        'Built with offline-tolerant request handling so booking actions recover gracefully on unreliable mobile connections.'
      ],
      stack: ['Flutter', 'Dart', 'Clean Architecture', 'Firebase', 'Location Services']
    },
    harvestgo: {
      badge: 'E-COMMERCE APP',
      title: 'HarvestGo — Fresh Local Produce & Grocery Delivery App',
      subtitle:
        'Flutter grocery storefront connecting local farms and butchers with location-aware browsing, cart checkout, Google Play Billing, and order tracking in Ghana Cedis.',
      screens: [
        {
          src: 'assets/projects/harvestgo-home.webp',
          caption: 'Storefront Home — Categories, Search & Recommended Fresh Produce'
        },
        {
          src: 'assets/projects/harvestgo-cart.webp',
          caption: 'Shopping Cart — Quantities, Free Delivery Progress & GH₵ Checkout'
        },
        {
          src: 'assets/projects/harvestgo-payment.webp',
          caption: 'Order Confirmation — Order Summary & Google Play Billing'
        },
        {
          src: 'assets/projects/harvestgo-orders.webp',
          caption: 'My Orders — Active & Delivered Filters, Reorder & Track'
        }
      ],
      highlights: [
        'Built a fresh produce storefront with category browsing (Fruits, Vegetables, Dairy, Meat), search & filters, and location-aware pricing in GH₵.',
        'Implemented full cart management, free-delivery threshold indicators, Google Play Billing checkout, and instant order confirmation receipts.',
        'Created the My Orders hub with Active/Delivered tabs, one-tap Reorder, and step-by-step order tracking backed by Cloud Firestore.'
      ],
      stack: ['Flutter', 'Dart', 'Cloud Firestore', 'Firebase Auth', 'Google Play Billing']
    },
    mystore: {
      badge: 'OFFLINE RETAIL POS',
      title: 'MyStoreManagement — Offline Retail POS, Inventory & Expense Tracker',
      subtitle:
        'Offline-first shop management and expense tracking app built for retail shop owners to monitor daily sales, expenses, profit margins, and inventory in Ghana Cedis.',
      screens: [
        {
          src: 'assets/projects/mystore-splash.webp',
          caption: 'App Launch — MyStoreManagement Expense Tracker'
        },
        {
          src: 'assets/projects/mystore-dashboard.webp',
          caption: 'Live POS Dashboard — Today’s Sales, Expenses, Profit Margin & Stock'
        },
        {
          src: 'assets/projects/mystore-reports.webp',
          caption: 'Reports & Analytics — Financial Ratio Donut Chart & Performance Metrics'
        }
      ],
      highlights: [
        'Built a Live POS Dashboard summarizing daily Sales, Expenses, Net Profit & Margin %, and total Inventory Items with low-stock alerts in Ghana Cedis (₵).',
        'Organized counter workflows across five clean tabs — Dashboard, Items, Sales, Expenses, and Reports — with local offline persistence.',
        'Added a visual Reports & Analytics screen featuring an Income vs. Expenses Financial Ratio donut chart and real-time Performance Metrics.'
      ],
      stack: ['Flutter', 'Dart', 'Offline Local Storage', 'Retail POS', 'Financial Charts']
    },
    ministryhub: {
      badge: 'LIVE ON GOOGLE PLAY',
      title: 'OJ Studios — Digital Ministry, Sermons & Community App',
      subtitle:
        'Published Google Play mobile app ("We Create · Teach · Inspire · Impact.") combining ministry community fellowship, learning, programs, and sermon media.',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.ojstudios.app',
      screens: [
        {
          src: 'assets/projects/ojstudios-welcome.webp',
          caption: 'Welcome Screen — Learn, Grow, Participate & Share'
        },
        {
          src: 'assets/projects/ojstudios-onboarding.webp',
          caption: 'Onboarding — Community & Fellowship Overview'
        },
        {
          src: 'assets/projects/ojstudios-home.webp',
          caption: 'Home Feed — Apostolic Voice Quotes, Role-Gated Devotions & Programs'
        },
        {
          src: 'assets/projects/ojstudios-sermons.webp',
          caption: 'Sermons Library — Search by Title, Speaker or Scripture (Audio, Video & Notes)'
        }
      ],
      highlights: [
        'Published on Google Play with structured onboarding, community fellowship features, learning modules, and scheduled ministry programs.',
        'Built a searchable Sermons library filterable by title, speaker, or scripture reference with Audio, Video, and Study Notes per sermon.',
        'Implemented role-based access control for devotionals and ministry sections using Riverpod state management, GoRouter navigation, and Firebase.'
      ],
      stack: ['Flutter', 'Google Play', 'Riverpod', 'GoRouter', 'Firebase Auth & Firestore', 'Media Streaming']
    },
    'hymns-logig': {
      badge: 'LIVE ON GOOGLE PLAY',
      title: 'COC Hymns Player — Bilingual Twi & English Hymnal & Audio App',
      subtitle:
        'Published Google Play digital hymnal and audio player supporting searchable Twi Hymns (Asore Ndwom) and English Hymns with offline downloads and lyrics playback.',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=addemma.coc_music_player',
      screens: [
        {
          src: 'assets/projects/cochymns-list.webp',
          caption: 'Twi Hymns Directory — Search, Favorites, Download Audio & Share'
        },
        {
          src: 'assets/projects/cochymns-lyrics.webp',
          caption: 'Lyrics & Audio Player — Dark Playback View with Scrubber & Controls'
        },
        {
          src: 'assets/projects/cochymns-favorites.webp',
          caption: 'Favorite Audios — Twi & English Categories with Floating Mini-Player'
        }
      ],
      highlights: [
        'Published on Google Play with fast search by hymn number or title across Twi Hymns (Asore Ndwom) and English Hymns.',
        'Designed an immersive dark Lyrics & Audio Player screen with scrubber controls, shuffle/repeat toggles, and readable verse layout.',
        'Includes Add to Favorites, Download Audio for offline worship, Share Hymn, and a categorized Favorite Audios view with a persistent floating mini-player.'
      ],
      stack: ['Flutter', 'Google Play', 'Dart', 'Audio Playback', 'Offline Downloads', 'Bilingual Search']
    }
  };

  const caseModalBackdrop = document.getElementById('caseModalBackdrop');
  const caseModalClose = document.getElementById('caseModalClose');
  const caseModalBadge = document.getElementById('caseModalBadge');
  const caseModalTitle = document.getElementById('caseModalTitle');
  const caseModalSubtitle = document.getElementById('caseModalSubtitle');
  const caseModalGalleryWrap = document.getElementById('caseModalGalleryWrap');
  const caseModalGallery = document.getElementById('caseModalGallery');
  const caseModalHighlights = document.getElementById('caseModalHighlights');
  const caseModalStack = document.getElementById('caseModalStack');
  const caseModalInquire = document.getElementById('caseModalInquire');
  const caseModalPlayLink = document.getElementById('caseModalPlayLink');

  const screenLightbox = document.getElementById('screenLightbox');
  const screenLightboxClose = document.getElementById('screenLightboxClose');
  const screenLightboxImg = document.getElementById('screenLightboxImg');
  const screenLightboxCaption = document.getElementById('screenLightboxCaption');

  function openScreenLightbox(src, caption) {
    if (!screenLightbox || !screenLightboxImg) return;
    screenLightboxImg.src = src;
    screenLightboxImg.alt = caption || 'App screenshot preview';
    if (screenLightboxCaption) {
      screenLightboxCaption.textContent = caption || '';
    }
    screenLightbox.classList.add('open');
    screenLightbox.setAttribute('aria-hidden', 'false');
  }

  function closeScreenLightbox() {
    if (!screenLightbox) return;
    screenLightbox.classList.remove('open');
    screenLightbox.setAttribute('aria-hidden', 'true');
  }

  if (screenLightboxClose) {
    screenLightboxClose.addEventListener('click', closeScreenLightbox);
  }
  if (screenLightbox) {
    screenLightbox.addEventListener('click', (e) => {
      if (e.target === screenLightbox) closeScreenLightbox();
    });
  }

  function openCaseModal(projectId) {
    const data = projectCaseStudies[projectId];
    if (!data || !caseModalBackdrop) return;

    caseModalBadge.textContent = data.badge;
    caseModalTitle.textContent = data.title;
    caseModalSubtitle.textContent = data.subtitle;

    if (caseModalGallery && caseModalGalleryWrap) {
      const screens = Array.isArray(data.screens) ? data.screens : [];
      if (screens.length > 0) {
        caseModalGalleryWrap.hidden = false;
        caseModalGallery.innerHTML = '';
        screens.forEach((screen) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'case-gallery-item';
          btn.setAttribute('aria-label', `Enlarge screenshot: ${screen.caption}`);

          const frame = document.createElement('span');
          frame.className = 'case-gallery-frame';

          const img = document.createElement('img');
          img.src = screen.src;
          img.alt = screen.caption;
          img.loading = 'lazy';
          img.decoding = 'async';

          const cap = document.createElement('span');
          cap.className = 'case-gallery-caption';
          cap.textContent = screen.caption;

          frame.appendChild(img);
          btn.append(frame, cap);
          btn.addEventListener('click', () => openScreenLightbox(screen.src, screen.caption));
          caseModalGallery.appendChild(btn);
        });
      } else {
        caseModalGalleryWrap.hidden = true;
        caseModalGallery.innerHTML = '';
      }
    }

    if (caseModalPlayLink) {
      if (data.playStoreUrl) {
        caseModalPlayLink.href = data.playStoreUrl;
        caseModalPlayLink.style.display = 'inline-flex';
      } else {
        caseModalPlayLink.style.display = 'none';
      }
    }

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

  /* ==========================================================================
     6B. ON-WEB CV PREVIEW & DOWNLOAD MODAL
     ========================================================================== */
  const cvModalBackdrop = document.getElementById('cvModalBackdrop');
  const cvModalClose = document.getElementById('cvModalClose');
  const cvModalIframe = document.getElementById('cvModalIframe');
  const openCvTriggers = document.querySelectorAll('[data-open-cv-modal]');

  function openCvModal() {
    if (!cvModalBackdrop) return;
    // Close mobile navigation drawer first if open
    toggleMobileMenu(false);

    // Lazy-load the embedded PDF iframe on first preview
    if (cvModalIframe && !cvModalIframe.getAttribute('src')) {
      const pdfSrc = cvModalIframe.getAttribute('data-src');
      if (pdfSrc) cvModalIframe.setAttribute('src', pdfSrc);
    }

    cvModalBackdrop.classList.add('open');
    cvModalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCvModal() {
    if (!cvModalBackdrop) return;
    cvModalBackdrop.classList.remove('open');
    cvModalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openCvTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      // Allow Ctrl/Cmd/Middle-click to natively open the PDF preview in a new tab
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
      e.preventDefault();
      openCvModal();
    });
  });

  if (cvModalClose) {
    cvModalClose.addEventListener('click', closeCvModal);
  }

  if (cvModalBackdrop) {
    cvModalBackdrop.addEventListener('click', (e) => {
      if (e.target === cvModalBackdrop) closeCvModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (screenLightbox && screenLightbox.classList.contains('open')) {
        closeScreenLightbox();
        return;
      }
      if (caseModalBackdrop && caseModalBackdrop.classList.contains('open')) {
        closeCaseModal();
      }
      if (cvModalBackdrop && cvModalBackdrop.classList.contains('open')) {
        closeCvModal();
      }
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
    const contactFormStatus = document.getElementById('contactFormStatus');

    const showFormStatus = (type, iconClass, text) => {
      if (!contactFormStatus) return;
      contactFormStatus.className = `form-status-banner is-${type}`;
      contactFormStatus.textContent = '';
      const iconEl = document.createElement('i');
      iconEl.className = iconClass;
      const spanEl = document.createElement('span');
      spanEl.textContent = text;
      contactFormStatus.append(iconEl, spanEl);
      contactFormStatus.hidden = false;
    };

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const botcheck = document.getElementById('contactBotcheck');
      if (botcheck && botcheck.checked) return; // Silently drop automated bot submissions

      const name = document.getElementById('name')?.value.trim() || '';
      const email = document.getElementById('email')?.value.trim() || '';
      const subject = document.getElementById('subject')?.value.trim() || 'Portfolio Inquiry';
      const message = document.getElementById('message')?.value.trim() || '';

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalHTML = submitBtn ? submitBtn.innerHTML : '';

      if (contactFormStatus) {
        contactFormStatus.hidden = true;
      }

      if (submitBtn) {
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> <span>Sending Message...</span>';
        submitBtn.disabled = true;
      }

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            access_key: '496a4cef-1087-4cbb-bdb2-27e940377776',
            from_name: name,
            subject: `Portfolio Inquiry: ${subject}`,
            replyto: email,
            name,
            email,
            topic: subject,
            message,
            botcheck: ''
          })
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok && data.success) {
          contactForm.reset();
          showFormStatus(
            'success',
            'fa-solid fa-circle-check',
            'Message sent directly! Thank you for reaching out — Emmanuel will reply to your email shortly.'
          );
        } else {
          const apiMsg =
            typeof data.message === 'string' && data.message.trim()
              ? data.message
              : 'Could not send message right now. Please try again in a moment.';
          showFormStatus('error', 'fa-solid fa-triangle-exclamation', apiMsg);
        }
      } catch (err) {
        showFormStatus(
          'error',
          'fa-solid fa-triangle-exclamation',
          'Network error while sending your message. Please check your connection and try again.'
        );
      } finally {
        if (submitBtn) {
          submitBtn.innerHTML = originalHTML;
          submitBtn.disabled = false;
        }
      }
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
