(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader || (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top'))) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  if (mobileNavToggleBtn) {
    function mobileNavToogle() {
      document.querySelector('body').classList.toggle('mobile-nav-active');
      mobileNavToggleBtn.classList.toggle('bi-list');
      mobileNavToggleBtn.classList.toggle('bi-x');
    }
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Preloader
   */
  document.addEventListener("DOMContentLoaded", function () {
    const currentUrl = window.location.pathname.toLowerCase();
    
    document.querySelectorAll('#navmenu a').forEach(link => {
      const linkHref = link.getAttribute('href');

      // Handle only internal .html links or same-page links
      if (linkHref && !linkHref.startsWith('http') && !linkHref.startsWith('#')) {
        const linkPath = new URL(linkHref, window.location.origin).pathname.toLowerCase();

        if (currentUrl === linkPath) {
          link.classList.add('active');
        }
      }

      // Also handle hash-based navigation (e.g., #hero)
      if (linkHref && linkHref.startsWith('#') && window.location.hash === linkHref) {
        link.classList.add('active');
      }
    });
  });

  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  if (typeof GLightbox !== 'undefined') {
    const glightbox = GLightbox({
      selector: '.glightbox'
    });
  }

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        if (typeof Swiper !== 'undefined') {
          new Swiper(swiperElement, config);
        }
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Contact Form - Complete Validation
   */
  document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a page with the contact form
    const contactForm = document.querySelector('.php-email-form');
    if (!contactForm) return; // Exit if no contact form on this page
    
    const phoneField = document.getElementById('phoneField');
    const phoneInput = document.getElementById('phone');
    const contactEmailRadio = document.getElementById('contactEmail');
    const contactPhoneRadio = document.getElementById('contactPhone');
    const contactWhatsAppRadio = document.getElementById('contactWhatsApp');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const helpTypeSelect = document.getElementById('helpType');
    const messageTextarea = document.getElementById('message');

    // Phone validation function (strict South African formats only)
    function validatePhoneNumber(phone) {
      if (!phone || phone.trim() === '') return false;
      
      // Remove all spaces, dashes, and parentheses (keep + for country code detection)
      const cleaned = phone.replace(/[\s\-\(\)]/g, '');
      
      // Check for valid South African formats:
      // +27XXXXXXXXX (country code + 9 digits = 12 chars total with +)
      // 0XXXXXXXXX (10 digits starting with 0)
      const regexWithCountryCode = /^\+27[0-9]{9}$/;
      const regexLocal = /^0[0-9]{9}$/;
      
      return regexWithCountryCode.test(cleaned) || regexLocal.test(cleaned);
    }

    // Show error message helper
    function showError(input, message) {
      if (!input) return;
      
      let errorDiv = input.parentElement.querySelector('.field-error');
      if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'field-error text-danger small mt-1';
        input.parentElement.appendChild(errorDiv);
      }
      errorDiv.textContent = message;
      input.classList.add('is-invalid');
      input.classList.remove('is-valid');
    }

    // Clear error message helper
    function clearError(input) {
      if (!input) return;
      
      const errorDiv = input.parentElement.querySelector('.field-error');
      if (errorDiv) {
        errorDiv.remove();
      }
      input.classList.remove('is-invalid');
      if (input.value.trim() !== '') {
        input.classList.add('is-valid');
      } else {
        input.classList.remove('is-valid');
      }
    }

    // Validate full name
    function validateFullName() {
      if (!fullNameInput) return true;
      
      const value = fullNameInput.value.trim();
      if (value === '') {
        showError(fullNameInput, 'Full name is required');
        return false;
      }
      if (value.length < 2) {
        showError(fullNameInput, 'Please enter your full name');
        return false;
      }
      clearError(fullNameInput);
      return true;
    }

    // Validate email
    function validateEmail() {
      if (!emailInput) return true;
      
      const value = emailInput.value.trim();
      if (value === '') {
        showError(emailInput, 'Email address is required');
        return false;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        showError(emailInput, 'Please enter a valid email address');
        return false;
      }
      clearError(emailInput);
      return true;
    }

    // Validate help type
    function validateHelpType() {
      if (!helpTypeSelect) return true;
      
      if (helpTypeSelect.value === '' || helpTypeSelect.value === 'Select an option') {
        showError(helpTypeSelect, 'Please select how we can help you');
        return false;
      }
      clearError(helpTypeSelect);
      return true;
    }

    // Validate phone (when required)
    function validatePhone() {
      const selectedMethod = document.querySelector('input[name="contactMethod"]:checked');
      
      // Phone validation only required for phone/whatsapp contact methods
      if (!selectedMethod || (selectedMethod.value !== 'phone' && selectedMethod.value !== 'whatsapp')) {
        // Clear phone field and errors if not required
        if (phoneInput) {
          clearError(phoneInput);
          phoneInput.classList.remove('is-invalid', 'is-valid');
        }
        return true;
      }
      
      if (!phoneInput) return false;
      
      const value = phoneInput.value.trim();
      if (value === '') {
        showError(phoneInput, 'Phone number is required for this contact method');
        return false;
      }
      
      if (!validatePhoneNumber(value)) {
        showError(phoneInput, 'Please enter a valid South African phone number (e.g., +27821234567 or 0821234567)');
        return false;
      }
      
      clearError(phoneInput);
      return true;
    }

    // Show/hide phone field based on contact method selection
    if (contactEmailRadio) {
      contactEmailRadio.addEventListener('change', function() {
        if (this.checked && phoneField && phoneInput) {
          phoneField.style.display = 'none';
          phoneInput.removeAttribute('required');
          phoneInput.value = '';
          phoneInput.classList.remove('is-invalid', 'is-valid');
          clearError(phoneInput);
        }
      });
    }

    if (contactPhoneRadio) {
      contactPhoneRadio.addEventListener('change', function() {
        if (this.checked && phoneField && phoneInput) {
          phoneField.style.display = 'block';
          phoneInput.setAttribute('required', '');
          phoneInput.placeholder = 'Enter your phone number (e.g., +27821234567 or 0821234567)';
          // Trigger validation when switching to phone
          setTimeout(() => {
            if (phoneInput.value.trim() !== '') {
              validatePhone();
            }
          }, 100);
        }
      });
    }

    if (contactWhatsAppRadio) {
      contactWhatsAppRadio.addEventListener('change', function() {
        if (this.checked && phoneField && phoneInput) {
          phoneField.style.display = 'block';
          phoneInput.setAttribute('required', '');
          phoneInput.placeholder = 'Enter your WhatsApp number (e.g., +27821234567 or 0821234567)';
          // Trigger validation when switching to whatsapp
          setTimeout(() => {
            if (phoneInput.value.trim() !== '') {
              validatePhone();
            }
          }, 100);
        }
      });
    }

    // Real-time validation for all fields
    if (fullNameInput) {
      fullNameInput.addEventListener('blur', validateFullName);
      fullNameInput.addEventListener('input', function() {
        if (this.classList.contains('is-invalid')) {
          validateFullName();
        }
      });
    }

    if (emailInput) {
      emailInput.addEventListener('blur', validateEmail);
      emailInput.addEventListener('input', function() {
        if (this.classList.contains('is-invalid')) {
          validateEmail();
        }
      });
    }

    if (helpTypeSelect) {
      helpTypeSelect.addEventListener('change', validateHelpType);
      helpTypeSelect.addEventListener('blur', validateHelpType);
    }

    // Real-time validation for phone
    if (phoneInput) {
      phoneInput.addEventListener('input', function() {
        const selectedMethod = document.querySelector('input[name="contactMethod"]:checked');
        
        if (selectedMethod && (selectedMethod.value === 'phone' || selectedMethod.value === 'whatsapp')) {
          const value = this.value.trim();
          
          if (value === '') {
            this.classList.remove('is-invalid', 'is-valid');
            const errorDiv = phoneInput.parentElement.querySelector('.field-error');
            if (errorDiv) errorDiv.remove();
          } else if (validatePhoneNumber(value)) {
            clearError(this);
          } else {
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
            // Show error on input
            const errorDiv = phoneInput.parentElement.querySelector('.field-error');
            if (!errorDiv) {
              showError(this, 'Invalid format. Use +27821234567 or 0821234567');
            }
          }
        }
      });

      phoneInput.addEventListener('blur', function() {
        const selectedMethod = document.querySelector('input[name="contactMethod"]:checked');
        if (selectedMethod && (selectedMethod.value === 'phone' || selectedMethod.value === 'whatsapp')) {
          validatePhone();
        }
      });
    }

    // Form submission validation - CAPTURE PHASE (runs before any other handlers)
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        // IMMEDIATELY prevent default to block submission
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        // Validate all fields
        let isValid = true;
        let firstInvalidField = null;
        
        // Validate full name
        if (!validateFullName()) {
          isValid = false;
          if (!firstInvalidField) firstInvalidField = fullNameInput;
        }
        
        // Validate email
        if (!validateEmail()) {
          isValid = false;
          if (!firstInvalidField) firstInvalidField = emailInput;
        }
        
        // Validate help type
        if (!validateHelpType()) {
          isValid = false;
          if (!firstInvalidField) firstInvalidField = helpTypeSelect;
        }
        
        // Validate phone (if required)
        if (!validatePhone()) {
          isValid = false;
          if (!firstInvalidField) firstInvalidField = phoneInput;
        }
        
        // Check if contact method is selected
        const selectedMethod = document.querySelector('input[name="contactMethod"]:checked');
        if (!selectedMethod) {
          alert('Please select a preferred contact method');
          return false;
        }
        
        // Check for any visible error messages
        const allErrors = contactForm.querySelectorAll('.field-error');
        const invalidInputs = contactForm.querySelectorAll('.is-invalid');
        
        if (allErrors.length > 0 || invalidInputs.length > 0 || !isValid) {
          // Focus on first invalid field
          if (firstInvalidField) {
            firstInvalidField.focus();
            firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          
          // Show error message
          const errorMessage = contactForm.querySelector('.error-message');
          if (errorMessage) {
            errorMessage.textContent = 'Please fix the errors in the form before submitting.';
            errorMessage.classList.remove('d-none');
            
            // Hide error after 5 seconds
            setTimeout(() => {
              errorMessage.classList.add('d-none');
            }, 5000);
          }
          
          return false;
        }
        
        // All validations passed - NOW submit the form manually
        // Remove this listener temporarily to avoid infinite loop
        contactForm.removeEventListener('submit', arguments.callee);
        
        // Submit the form
        contactForm.submit();
        
        return false;
      }, true); // TRUE = capture phase, runs FIRST
      
      // Also add a second layer of protection in bubble phase
      contactForm.addEventListener('submit', function(e) {
        const allErrors = contactForm.querySelectorAll('.field-error');
        const invalidInputs = contactForm.querySelectorAll('.is-invalid');
        
        if (allErrors.length > 0 || invalidInputs.length > 0) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          return false;
        }
      }, false);
    }
  });

})();