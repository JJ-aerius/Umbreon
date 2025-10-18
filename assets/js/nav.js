/**
 * Navigation Module
 * Handles mobile menu, focus trap, and accessibility
 */

(function() {
  'use strict';

  const hamburger = document.querySelector('.hamburger');
  const navMobile = document.querySelector('.nav-mobile');
  const navOverlay = document.querySelector('.nav-overlay');
  const body = document.body;
  
  let focusableElements = [];
  let firstFocusable = null;
  let lastFocusable = null;

  // Initialize navigation
  function init() {
    if (!hamburger || !navMobile) return;
    
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

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
