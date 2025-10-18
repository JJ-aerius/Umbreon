/**
 * Main JavaScript Module
 * Handles partials injection, forms, smooth scrolling, and Speed Intelligence
 */

// Formspree endpoint configuration
const FORMSPREE_ENDPOINTS = {
  business: "https://formspree.io/f/xdkwbqkz",
  careers: "https://formspree.io/f/mblzwnld",
  investors: "https://formspree.io/f/mldpzqdp"
};

// Speed Intelligence Data
const SPEED_DATA = {
  bands: [
    { name: "Speed of sound (Mach 1)", mach: "1", speed: "≈ 1235 km/h", description: "Sea level, varies with altitude/temperature" },
    { name: "Subsonic", mach: "< 0.8", speed: "< 980 km/h", description: "Below the speed of sound" },
    { name: "Transonic", mach: "0.8–1.2", speed: "980–1470 km/h", description: "Near the speed of sound" },
    { name: "Supersonic", mach: "1–5", speed: "1235–6125 km/h", description: "Faster than sound" },
    { name: "Hypersonic", mach: "5–10", speed: "6125–12,250 km/h", description: "Five times the speed of sound" },
    { name: "High Hypersonic", mach: "10–25", speed: "12,250–30,625 km/h", description: "Extremely high speeds" },
    { name: "Re-entry / Orbital", mach: "25+", speed: "> 30,000 km/h", description: "Orbital and re-entry speeds" }
  ],
  
  aircraft: [
    { name: "Small general aviation airplane", example: "Cessna 172", speed: "~230 km/h" },
    { name: "Fast turboprop", example: "Pilatus PC-12, Dash 8", speed: "~500–600 km/h" },
    { name: "Commercial jet", example: "B737/A320", speed: "~850–900 km/h", mach: "Mach ~0.78–0.85" },
    { name: "Fastest subsonic jet", example: "B747/A380 cruising", speed: "~950 km/h" }
  ],
  
  relativeSpeeds: [
    { name: "Speed of sound (Mach 1)", speed: "~1235 km/h", note: "varies" },
    { name: "Subsonic", mach: "< 0.8", speed: "< 980 km/h" },
    { name: "Transonic", mach: "0.8–1.2", speed: "980–1470 km/h" },
    { 
      name: "Supersonic", 
      mach: "1–5", 
      speed: "1235–6125 km/h",
      examples: "Concorde (Mach 2.0 ≈ 2,450 km/h); SR-71 (Mach 3.2 ≈ 3,950 km/h)"
    },
    { 
      name: "Hypersonic", 
      mach: "5–10", 
      speed: "6125–12,250 km/h",
      examples: "X-15 (Mach 6.7 ≈ 8,000 km/h)"
    },
    { 
      name: "High Hypersonic", 
      mach: "10–25", 
      speed: "12,250–30,625 km/h",
      examples: "Apollo re-entry ~Mach 32 initially (~39,000 km/h), slowing to Mach 25"
    },
    { 
      name: "Re-entry / Orbital", 
      mach: "25+", 
      speed: "> 30,000 km/h",
      examples: "Space Shuttle orbital re-entry ≈ 28,000 km/h"
    }
  ],
  
  drones: [
    { name: "Consumer drones", example: "DJI Mavic/Phantom", speed: "~50–80 km/h" },
    { name: "Racing drones", example: "FPV", speed: "~150–200 km/h" },
    { name: "Fastest drone (record 2023)", example: "DRL RacerX, experimental", speed: "~360 km/h" },
    { name: "Fastest drone (record 2025)", example: "Fastboy 2, HEIA-FR", speed: "557.64 km/h", highlight: true }
  ]
};

(function() {
  'use strict';

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    injectPartials();
    setActiveNav();
    initSmoothScroll();
    initKeyboardFocus();
    initForms();
    initSpeedIntelligence();
    initLightbox();
  }

  // ===== Partials Injection =====
  async function injectPartials() {
    try {
      // Inject header
      const headerPlaceholder = document.getElementById('header-placeholder');
      if (headerPlaceholder) {
        const headerResponse = await fetch('partials/header.html');
        const headerHTML = await headerResponse.text();
        headerPlaceholder.outerHTML = headerHTML;
      }

      // Inject footer
      const footerPlaceholder = document.getElementById('footer-placeholder');
      if (footerPlaceholder) {
        const footerResponse = await fetch('partials/footer.html');
        const footerHTML = await footerResponse.text();
        footerPlaceholder.outerHTML = footerHTML;
      }

      // Dispatch event to signal partials are loaded
      document.dispatchEvent(new CustomEvent('partialsLoaded'));
    } catch (error) {
      console.error('Error loading partials:', error);
    }
  }

  // ===== Active Navigation =====
  function setActiveNav() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    setTimeout(() => {
      // Desktop nav
      const navLinks = document.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes(currentPath)) {
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
        }
      });

      // Mobile nav
      const mobileLinks = document.querySelectorAll('.nav-mobile-link');
      mobileLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes(currentPath)) {
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
        }
      });
    }, 100);
  }

  // ===== Smooth Scroll =====
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Update focus for accessibility
          target.setAttribute('tabindex', '-1');
          target.focus();
        }
      });
    });
  }

  // ===== Keyboard Focus Styles =====
  function initKeyboardFocus() {
    let isUsingMouse = false;

    document.addEventListener('mousedown', () => {
      isUsingMouse = true;
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        isUsingMouse = false;
      }
    });

    document.addEventListener('focusin', () => {
      if (isUsingMouse) {
        document.body.classList.add('using-mouse');
      } else {
        document.body.classList.remove('using-mouse');
      }
    });
  }

  // ===== Form Handling =====
  function initForms() {
    const forms = document.querySelectorAll('form[data-formspree]');
    
    if (forms.length === 0) {
      return;
    }
    
    forms.forEach(form => {
      // Get the form type from data attribute
      const formType = form.getAttribute('data-formspree');
      const endpoint = FORMSPREE_ENDPOINTS[formType];
      
      // Check if endpoint is set
      if (!endpoint || endpoint === "") {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
        }
        
        const notice = document.createElement('div');
        notice.className = 'form-notice warning';
        notice.innerHTML = '<p><strong>Note:</strong> Form temporarily unavailable—please check back later.</p>';
        form.insertBefore(notice, form.firstChild);
        return;
      }

      // Simple validation - only on submit, not on blur/input
      const inputs = form.querySelectorAll('input:not([type="hidden"]):not([name="_honeypot"]), textarea, select');

      // Form submission
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        inputs.forEach(input => {
          if (!validateField(input)) {
            isValid = false;
          }
        });

        if (!isValid) return;

        // Check honeypot
        const honeypot = form.querySelector('.honeypot input');
        if (honeypot && honeypot.value) {
          console.log('Spam detected');
          return;
        }

        // Submit form
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
          const formData = new FormData(form);
          const response = await fetch(endpoint, {
            method: 'POST',
            body: formData,
            headers: {
              'Accept': 'application/json'
            }
          });

          if (response.ok) {
            showFormSuccess(form);
          } else {
            throw new Error('Form submission failed');
          }
        } catch (error) {
          console.error('Form error:', error);
          alert('There was an error submitting the form. Please try again or email us directly.');
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }
      });
    });
  }

  function validateField(field) {
    const errorEl = field.parentElement.querySelector('.form-error') || createErrorElement(field);
    let isValid = true;
    let errorMessage = '';

    // Checkbox validation
    if (field.type === 'checkbox') {
      if (field.hasAttribute('required') && !field.checked) {
        isValid = false;
        errorMessage = 'This field is required';
      }
    }
    // Required check for other fields
    else if (field.hasAttribute('required') && !field.value.trim()) {
      isValid = false;
      errorMessage = 'This field is required';
    }
    // Email check
    else if (field.type === 'email' && field.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value.trim())) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    }
    // Min length check
    else if (field.hasAttribute('minlength') && field.value.trim()) {
      const minLength = parseInt(field.getAttribute('minlength'));
      if (field.value.trim().length < minLength) {
        isValid = false;
        errorMessage = `Minimum ${minLength} characters required`;
      }
    }
    // URL check
    else if (field.type === 'url' && field.value.trim()) {
      try {
        new URL(field.value.trim());
      } catch {
        isValid = false;
        errorMessage = 'Please enter a valid URL';
      }
    }

    // Update UI
    if (isValid) {
      field.classList.remove('error');
      field.setAttribute('aria-invalid', 'false');
      errorEl.textContent = '';
      errorEl.classList.remove('active');
    } else {
      field.classList.add('error');
      field.setAttribute('aria-invalid', 'true');
      errorEl.textContent = errorMessage;
      errorEl.classList.add('active');
    }

    return isValid;
  }

  function createErrorElement(field) {
    const errorEl = document.createElement('div');
    errorEl.className = 'form-error';
    errorEl.setAttribute('role', 'alert');
    errorEl.setAttribute('aria-live', 'polite');
    field.parentElement.appendChild(errorEl);
    return errorEl;
  }

  function showFormSuccess(form) {
    const successHTML = `
      <div class="form-success">
        <h3>Thank You!</h3>
        <p>We've received your submission and will get back to you shortly.</p>
      </div>
    `;
    form.outerHTML = successHTML;
  }

  // ===== Speed Intelligence Module =====
  function initSpeedIntelligence() {
    const container = document.getElementById('speed-intelligence');
    if (!container) return;

    // Create tabs
    const tabsHTML = `
      <div class="speed-tabs">
        <button class="speed-tab active" data-tab="bands">Speed Levels</button>
        <button class="speed-tab" data-tab="aircraft">Reference Aircraft</button>
        <button class="speed-tab" data-tab="relative">Relative to Sound</button>
      </div>
    `;

    // Create content sections
    const bandsContent = createBandsContent();
    const aircraftContent = createAircraftContent();
    const relativeContent = createRelativeContent();
    const dronesContent = createDronesContent();
    const sliderContent = createSliderContent();

    container.innerHTML = `
      ${tabsHTML}
      <div class="speed-content active" data-content="bands">${bandsContent}</div>
      <div class="speed-content" data-content="aircraft">${aircraftContent}</div>
      <div class="speed-content" data-content="relative">${relativeContent}</div>
      ${dronesContent}
      ${sliderContent}
    `;

    // Tab switching
    const tabs = container.querySelectorAll('.speed-tab');
    const contents = container.querySelectorAll('.speed-content');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetTab = tab.dataset.tab;

        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        container.querySelector(`[data-content="${targetTab}"]`).classList.add('active');
      });
    });

    // Initialize slider
    initSpeedSlider();
  }

  function createBandsContent() {
    return SPEED_DATA.bands.map(band => `
      <div class="speed-item">
        <h4>${band.name}</h4>
        <p><strong>Mach:</strong> ${band.mach}</p>
        <p><strong>Speed:</strong> ${band.speed}</p>
        <p>${band.description}</p>
      </div>
    `).join('');
  }

  function createAircraftContent() {
    return `
      <div class="grid grid-2">
        ${SPEED_DATA.aircraft.map(item => `
          <div class="card">
            <h4 class="card-title">${item.name}</h4>
            <p class="card-content"><strong>${item.example}</strong></p>
            <p class="card-content">${item.speed}</p>
            ${item.mach ? `<p class="card-content">${item.mach}</p>` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  function createRelativeContent() {
    return SPEED_DATA.relativeSpeeds.map(item => `
      <div class="speed-item">
        <h4>${item.name}</h4>
        ${item.mach ? `<p><strong>Mach:</strong> ${item.mach}</p>` : ''}
        <p><strong>Speed:</strong> ${item.speed}</p>
        ${item.note ? `<p><em>${item.note}</em></p>` : ''}
        ${item.examples ? `<p><strong>Examples:</strong> ${item.examples}</p>` : ''}
      </div>
    `).join('');
  }

  function createDronesContent() {
    return `
      <div class="speed-item" style="margin-top: 2rem; background: var(--bg); border: 2px solid var(--accent);">
        <h4 style="color: var(--accent-2);">Drones Reference</h4>
        ${SPEED_DATA.drones.map(drone => `
          <p ${drone.highlight ? 'style="color: var(--accent); font-weight: 600;"' : ''}>
            <strong>${drone.name}:</strong> ${drone.example} — ${drone.speed}
          </p>
        `).join('')}
      </div>
    `;
  }

  function createSliderContent() {
    return `
      <div class="speed-slider-container">
        <h4 style="text-align: center; margin-bottom: 1rem;">Speed Calculator</h4>
        <p style="text-align: center; color: var(--muted); font-size: 0.9rem;">
          Drag the slider to see which speed band and Mach number a given speed falls into
        </p>
        <input 
          type="range" 
          class="speed-slider" 
          min="0" 
          max="35000" 
          value="1235" 
          step="10"
          aria-label="Speed in km/h"
        />
        <div class="speed-result">
          <div class="speed-result-value"><span id="speed-value">1235</span> km/h</div>
          <div class="speed-result-band" id="speed-band">Supersonic (Mach 1)</div>
          <div class="speed-result-mach" id="speed-mach">
            Approximate Mach 1.0 <span style="font-size: 0.85em;">(calculated at sea level; varies with conditions)</span>
          </div>
        </div>
      </div>
    `;
  }

  function initSpeedSlider() {
    const slider = document.querySelector('.speed-slider');
    if (!slider) return;

    const speedValue = document.getElementById('speed-value');
    const speedBand = document.getElementById('speed-band');
    const speedMach = document.getElementById('speed-mach');

    slider.addEventListener('input', (e) => {
      const speed = parseInt(e.target.value);
      speedValue.textContent = speed;

      // Calculate Mach (approximate at sea level)
      const mach = (speed / 1235).toFixed(2);
      
      // Determine band
      let band = '';
      if (speed < 980) {
        band = 'Subsonic';
      } else if (speed < 1470) {
        band = 'Transonic';
      } else if (speed < 6125) {
        band = 'Supersonic';
      } else if (speed < 12250) {
        band = 'Hypersonic';
      } else if (speed < 30625) {
        band = 'High Hypersonic';
      } else {
        band = 'Re-entry / Orbital';
      }

      speedBand.textContent = band;
      speedMach.innerHTML = `Approximate Mach ${mach} <span style="font-size: 0.85em;">(calculated at sea level; varies with conditions)</span>`;
    });
  }

  // ===== Lightbox =====
  function initLightbox() {
    const galleryImages = document.querySelectorAll('[data-lightbox]');
    if (galleryImages.length === 0) return;

    // Create lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
        <img class="lightbox-img" src="" alt="">
      </div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    galleryImages.forEach(img => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

})();
