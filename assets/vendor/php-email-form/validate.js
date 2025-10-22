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

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function(form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      let thisForm = this;
      let action = thisForm.getAttribute('action');
      
      // Validate action exists
      if(!action) {
        displayError(thisForm, 'The form action property is not set!');
        return;
      }
      
      // Manual validation for required fields
      let name = thisForm.querySelector('[name="name"]').value.trim();
      let email = thisForm.querySelector('[name="email"]').value.trim();
      let helpType = thisForm.querySelector('[name="helpType"]').value;
      
      if (!name || !email || !helpType) {
        displayError(thisForm, 'Please fill in all required fields.');
        thisForm.classList.add('was-validated');
        return;
      }
      
      // Validate email format
      let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        displayError(thisForm, 'Please enter a valid email address.');
        return;
      }
      
      // Show loading, hide other messages
      let loadingEl = thisForm.querySelector('.loading');
      let errorEl = thisForm.querySelector('.error-message');
      let successEl = thisForm.querySelector('.sent-message');
      
      if(loadingEl) loadingEl.classList.add('d-block');
      if(errorEl) errorEl.classList.remove('d-block');
      if(successEl) successEl.classList.remove('d-block');

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
        if(loadingEl) loadingEl.classList.remove('d-block');
        
        if(response.ok) {
          // Show pop-up alert
          alert('✅ Success! Your message has been sent. We\'ll get back to you!');
          
          if(successEl) successEl.classList.add('d-block');
          thisForm.reset(); // This clears all form fields
          thisForm.classList.remove('was-validated');
          
          // Optionally hide success message after 8 seconds
          setTimeout(() => {
            if(successEl) successEl.classList.remove('d-block');
          }, 8000);
        } else {
          return response.json().then(data => {
            if(data.errors) {
              throw new Error(data.errors.map(error => error.message).join(", "));
            } else {
              throw new Error('Form submission failed. Please try again.');
            }
          }).catch(() => {
            throw new Error('Form submission failed. Please try again.');
          });
        }
      })
      .catch((error) => {
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