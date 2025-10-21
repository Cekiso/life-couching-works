/**
* PHP Email Form Validation - v3.10
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
// (function () {
//   "use strict";

//   let forms = document.querySelectorAll('.php-email-form');

//   forms.forEach( function(e) {
//     e.addEventListener('submit', function(event) {
//       event.preventDefault();

//       let thisForm = this;

//       let action = thisForm.getAttribute('action');
//       let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');
      
//       if( ! action ) {
//         displayError(thisForm, 'The form action property is not set!');
//         return;
//       }
//       thisForm.querySelector('.loading').classList.add('d-block');
//       thisForm.querySelector('.error-message').classList.remove('d-block');
//       thisForm.querySelector('.sent-message').classList.remove('d-block');

//       let formData = new FormData( thisForm );

//       if ( recaptcha ) {
//         if(typeof grecaptcha !== "undefined" ) {
//           grecaptcha.ready(function() {
//             try {
//               grecaptcha.execute(recaptcha, {action: 'php_email_form_submit'})
//               .then(token => {
//                 formData.set('recaptcha-response', token);
//                 php_email_form_submit(thisForm, action, formData);
//               })
//             } catch(error) {
//               displayError(thisForm, error);
//             }
//           });
//         } else {
//           displayError(thisForm, 'The reCaptcha javascript API url is not loaded!')
//         }
//       } else {
//         php_email_form_submit(thisForm, action, formData);
//       }
//     });
//   });

//   function php_email_form_submit(thisForm, action, formData) {
//     fetch(action, {
//       method: 'POST',
//       body: formData,
//       headers: {'X-Requested-With': 'XMLHttpRequest'}
//     })
//     .then(response => {
//       if( response.ok ) {
//         return response.text();
//       } else {
//         throw new Error(`${response.status} ${response.statusText} ${response.url}`); 
//       }
//     })
//     .then(data => {
//       thisForm.querySelector('.loading').classList.remove('d-block');
//       if (data.trim() == 'OK') {
//         thisForm.querySelector('.sent-message').classList.add('d-block');
//         thisForm.reset(); 
//       } else {
//         throw new Error(data ? data : 'Form submission failed and no error message returned from: ' + action); 
//       }
//     })
//     .catch((error) => {
//       displayError(thisForm, error);
//     });
//   }

//   function displayError(thisForm, error) {
//     thisForm.querySelector('.loading').classList.remove('d-block');
//     thisForm.querySelector('.error-message').innerHTML = error;
//     thisForm.querySelector('.error-message').classList.add('d-block');
//   }

// })();
(function () {
  "use strict";

  // Form submission handler
  let forms = document.querySelectorAll('.formspree-form');

  forms.forEach(function(form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      event.stopPropagation();

      let thisForm = this;
      let action = thisForm.getAttribute('action');
      
      // Validate action exists
      if(!action || action.includes('xeorwpke')) {
        displayError(thisForm, 'Please update the form action with your Formspree form ID!');
        return;
      }
      
      // Check HTML5 validation
      if (!thisForm.checkValidity()) {
        thisForm.classList.add('was-validated');
        return;
      }
      
      // Show loading, hide other messages
      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      let formData = new FormData(thisForm);

      // Submit to Formspree
      fetch(action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        thisForm.querySelector('.loading').classList.remove('d-block');
        
        if(response.ok) {
          thisForm.querySelector('.sent-message').classList.add('d-block');
          thisForm.reset();
          thisForm.classList.remove('was-validated');
          
          // Scroll to success message
          thisForm.querySelector('.sent-message').scrollIntoView({ behavior: 'smooth', block: 'center' });
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
        displayError(thisForm, error.message || 'An error occurred. Please try again or contact us directly.');
      });
    });
  });

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = '<i class="bi bi-exclamation-triangle-fill me-2"></i>' + error;
    thisForm.querySelector('.error-message').classList.add('d-block');
    thisForm.querySelector('.error-message').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // Radio button functionality - ensure only one is selected
  const radioButtons = document.querySelectorAll('input[name="contact_method"]');
  radioButtons.forEach(radio => {
    radio.addEventListener('change', function() {
      // Visual feedback
      radioButtons.forEach(r => {
        r.parentElement.style.fontWeight = r.checked ? 'bold' : 'normal';
      });
    });
  });

  // Dropdown change handler (for visual feedback)
  const helpTypeSelect = document.getElementById('helpType');
  helpTypeSelect.addEventListener('change', function() {
    this.style.fontWeight = this.value ? 'bold' : 'normal';
  });

  // Book Discovery Call button handler
  const bookDiscoveryBtn = document.getElementById('bookDiscoveryBtn');
  const discoveryModal = new bootstrap.Modal(document.getElementById('discoveryModal'));
  
  bookDiscoveryBtn.addEventListener('click', function() {
    discoveryModal.show();
  });

  // Fill form button in modal
  const fillFormBtn = document.getElementById('fillFormBtn');
  fillFormBtn.addEventListener('click', function() {
    // Close modal
    discoveryModal.hide();
    
    // Pre-fill the form
    document.getElementById('helpType').value = 'discovery-call';
    document.getElementById('helpType').style.fontWeight = 'bold';
    
    // Scroll to form
    document.getElementById('fullName').scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Focus on name field
    setTimeout(() => {
      document.getElementById('fullName').focus();
    }, 500);
  });

  // Add keyboard accessibility for radio buttons
  radioButtons.forEach((radio, index) => {
    radio.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIndex = (index + 1) % radioButtons.length;
        radioButtons[nextIndex].checked = true;
        radioButtons[nextIndex].focus();
        radioButtons[nextIndex].dispatchEvent(new Event('change'));
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = (index - 1 + radioButtons.length) % radioButtons.length;
        radioButtons[prevIndex].checked = true;
        radioButtons[prevIndex].focus();
        radioButtons[prevIndex].dispatchEvent(new Event('change'));
      }
    });
  });

})();