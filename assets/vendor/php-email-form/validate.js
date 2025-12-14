// validate.js - Handles contact form and redirects to booking

(function () {
  "use strict";

  console.log('✅ Validate.js loaded');

  // Handle contact method change to show/hide phone field
  let contactMethodRadios = document.querySelectorAll('input[name="contactMethod"]');
  let phoneField = document.getElementById('phoneField');
  let phoneInput = document.getElementById('phone');
  let emailInput = document.getElementById('email');

  if (contactMethodRadios.length > 0 && phoneField) {
    contactMethodRadios.forEach(function(radio) {
      radio.addEventListener('change', function() {
        if (this.value === 'phone' || this.value === 'whatsapp') {
          phoneField.style.display = 'block';
          phoneInput.setAttribute('required', '');
          emailInput.removeAttribute('required');
        } else {
          phoneField.style.display = 'none';
          phoneInput.removeAttribute('required');
          phoneInput.value = '';
          emailInput.setAttribute('required', '');
        }
      });
    });
  }

  let forms = document.querySelectorAll('.php-email-form');
  console.log('✅ Found', forms.length, 'form(s)');

  forms.forEach(function(form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      console.log('📝 Form submitted');

      let thisForm = this;
      let action = thisForm.getAttribute('action');
      
      if(!action) {
        displayError(thisForm, 'The form action property is not set!');
        return;
      }
      
      // Get form data
      let name = thisForm.querySelector('[name="name"]').value.trim();
      let email = thisForm.querySelector('[name="email"]').value.trim();
      let phone = thisForm.querySelector('[name="phone"]') ? thisForm.querySelector('[name="phone"]').value.trim() : '';
      let helpType = thisForm.querySelector('[name="helpType"]') ? thisForm.querySelector('[name="helpType"]').value : '';
      let contactMethod = thisForm.querySelector('[name="contactMethod"]:checked') ? thisForm.querySelector('[name="contactMethod"]:checked').value : 'email';
      let message = thisForm.querySelector('[name="message"]') ? thisForm.querySelector('[name="message"]').value.trim() : '';
      
      // Validation
      if (!name) {
        displayError(thisForm, 'Please enter your name.');
        return;
      }
      
      if (helpType && !helpType) {
        displayError(thisForm, 'Please select how we can help you.');
        return;
      }
      
      if (contactMethod === 'email') {
        if (!email) {
          displayError(thisForm, 'Please enter your email address.');
          return;
        }
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
          displayError(thisForm, 'Please enter a valid email address.');
          return;
        }
      } else if (contactMethod === 'phone' || contactMethod === 'whatsapp') {
        if (!phone) {
          displayError(thisForm, 'Please enter your phone number.');
          return;
        }
      }
      
      // Show loading
      let loadingEl = thisForm.querySelector('.loading');
      let errorEl = thisForm.querySelector('.error-message');
      let successEl = thisForm.querySelector('.sent-message');
      
      if(loadingEl) loadingEl.classList.add('d-block');
      if(errorEl) errorEl.classList.remove('d-block');
      if(successEl) successEl.classList.remove('d-block');

      // Check if this form should redirect to booking
      let shouldRedirectToBooking = thisForm.hasAttribute('data-redirect-to-booking') || 
                                     thisForm.classList.contains('contact-to-booking');

      console.log('🔄 Should redirect to booking:', shouldRedirectToBooking);

      // Submit to Formspree
      let formData = new FormData(thisForm);

      fetch(action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if(loadingEl) loadingEl.classList.remove('d-block');
        
        if(response.ok) {
          
          if (shouldRedirectToBooking) {
            console.log('✅ Contact form submitted successfully');
            
            // Save ALL contact info to sessionStorage for booking page
            let contactData = {
              name: name,
              email: email,
              phone: phone,
              helpType: helpType,
              contactMethod: contactMethod,
              message: message,
              timestamp: new Date().toISOString(),
              // Save Formspree response for reference
              contactFormSubmitted: true
            };
            
            sessionStorage.setItem('contactFormData', JSON.stringify(contactData));
            console.log('💾 Saved contact data to sessionStorage:', contactData);
            
            // Show success message
            alert('✅ Thank you! Your information has been received. Now let\'s schedule your appointment!');
            
            // Redirect to booking page immediately
            console.log('🔄 Redirecting to booking.html...');
            setTimeout(() => {
              window.location.href = 'booking.html';
            }, 500);
            
          } else {
            // Standard form submission (no booking redirect)
            console.log('✅ Form submitted (no booking redirect)');
            
            alert('✅ Success! Your message has been sent. We\'ll get back to you within 24 hours!');
            
            if(successEl) successEl.classList.add('d-block');
            thisForm.reset();
            
            // Reset phone field visibility
            if (phoneField) {
              phoneField.style.display = 'none';
              if (phoneInput) phoneInput.removeAttribute('required');
              if (emailInput) emailInput.setAttribute('required', '');
            }
            
            setTimeout(() => {
              if(successEl) successEl.classList.remove('d-block');
            }, 8000);
          }
          
        } else {
          return response.json().then(data => {
            if(data.errors) {
              throw new Error(data.errors.map(error => error.message).join(", "));
            } else {
              throw new Error('Form submission failed. Please try again.');
            }
          });
        }
      })
      .catch((error) => {
        console.error('❌ Form submission error:', error);
        if(loadingEl) loadingEl.classList.remove('d-block');
        displayError(thisForm, error.message || 'An error occurred. Please try again or contact us directly.');
      });
    });
  });

  function displayError(thisForm, error) {
    let loadingEl = thisForm.querySelector('.loading');
    let errorEl = thisForm.querySelector('.error-message');
    
    if(loadingEl) loadingEl.classList.remove('d-block');
    if(errorEl) {
      errorEl.innerHTML = '<i class="bi bi-exclamation-triangle-fill me-2"></i>' + error;
      errorEl.classList.add('d-block');
    }
  }

})();