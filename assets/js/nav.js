/**
 * Navigation Module
 * Handles mobile menu, focus trap, and accessibility
 */

(function() {
  'use strict';

  let hamburger = null;
  let navMobile = null;
  let navOverlay = null;
  const body = document.body;
  
  let focusableElements = [];
  let firstFocusable = null;
  let lastFocusable = null;
  let initialized = false;

  // Initialize navigation
  function init() {
    // Prevent double initialization
    if (initialized) {
      return;
    }
    
    // Query elements fresh on init
    hamburger = document.querySelector('.hamburger');
    navMobile = document.querySelector('.nav-mobile');
    navOverlay = document.querySelector('.nav-overlay');
    
    if (!hamburger || !navMobile || !navOverlay) {
      return;
    }
    
    initialized = true;
    console.log('Navigation initialized successfully');
    
    // Hamburger click
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Overlay click
    navOverlay.addEventListener('click', closeMobileMenu);
    
    // Escape key
    document.addEventListener('keydown', handleEscape);
    
    // Mobile dropdown toggles
    const dropdownToggles = document.querySelectorAll('.nav-mobile-dropdown-toggle');
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', handleMobileDropdown);
    });
    
    // Desktop dropdown keyboard accessibility
    const desktopDropdowns = document.querySelectorAll('.nav-dropdown-toggle');
    desktopDropdowns.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', !isExpanded);
      });
    });
    
    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    });
  }

  function toggleMobileMenu() {
    const isOpen = navMobile.classList.contains('active');
    
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  function openMobileMenu() {
    navMobile.classList.add('active');
    navOverlay.classList.add('active');
    body.classList.add('nav-open');
    hamburger.classList.add('active');
    
    // Update ARIA
    hamburger.setAttribute('aria-expanded', 'true');
    navOverlay.setAttribute('aria-hidden', 'false');
    
    // Set up focus trap
    focusableElements = navMobile.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled])'
    );
    firstFocusable = focusableElements[0];
    lastFocusable = focusableElements[focusableElements.length - 1];
    
    // Focus first element
    if (firstFocusable) {
      setTimeout(() => firstFocusable.focus(), 100);
    }
    
    // Focus trap
    navMobile.addEventListener('keydown', trapFocus);
  }

  function closeMobileMenu() {
    navMobile.classList.remove('active');
    navOverlay.classList.remove('active');
    body.classList.remove('nav-open');
    hamburger.classList.remove('active');
    
    // Update ARIA
    hamburger.setAttribute('aria-expanded', 'false');
    navOverlay.setAttribute('aria-hidden', 'true');
    
    // Remove focus trap
    navMobile.removeEventListener('keydown', trapFocus);
    
    // Return focus to hamburger
    hamburger.focus();
  }

  function handleEscape(e) {
    if (e.key === 'Escape' && navMobile.classList.contains('active')) {
      closeMobileMenu();
    }
  }

  function trapFocus(e) {
    if (e.key !== 'Tab') return;
    
    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  }

  function handleMobileDropdown(e) {
    const toggle = e.currentTarget;
    const submenu = toggle.nextElementSibling;
    const isExpanded = toggle.classList.contains('active');
    
    // Close all other dropdowns
    document.querySelectorAll('.nav-mobile-dropdown-toggle.active').forEach(t => {
      if (t !== toggle) {
        t.classList.remove('active');
        t.setAttribute('aria-expanded', 'false');
        t.nextElementSibling.classList.remove('active');
      }
    });
    
    // Toggle current dropdown
    toggle.classList.toggle('active');
    submenu.classList.toggle('active');
    toggle.setAttribute('aria-expanded', !isExpanded);
  }

  // Initialize when partials are loaded
  function tryInit() {
    const testHamburger = document.querySelector('.hamburger');
    
    if (testHamburger) {
      init();
    } else {
      // Wait for partials to load with both event and polling fallback
      
      // Method 1: Listen for custom event
      document.addEventListener('partialsLoaded', () => {
        const hamburger = document.querySelector('.hamburger');
        if (hamburger) {
          init();
        }
      }, { once: true });
      
      // Method 2: Poll for element (fallback)
      let attempts = 0;
      const pollInterval = setInterval(() => {
        attempts++;
        const hamburger = document.querySelector('.hamburger');
        
        if (hamburger) {
          clearInterval(pollInterval);
          init();
        } else if (attempts > 20) {
          // Stop after 2 seconds (20 * 100ms)
          clearInterval(pollInterval);
        }
      }, 100);
    }
  }

  // Start initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryInit);
  } else {
    tryInit();
  }
})();
