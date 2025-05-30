// Enhanced button fixes with proper error handling
(function() {
  'use strict';

  let retryCount = 0;
  const maxRetries = 3;

  function applyButtonFixes() {
    try {
      // Fix button hover states
      const buttons = document.querySelectorAll('button, .btn, [role="button"]');
      buttons.forEach(button => {
        if (!button.style.cursor) {
          button.style.cursor = 'pointer';
        }

        // Add hover effect if missing
        if (!button.classList.contains('hover-fixed')) {
          button.classList.add('hover-fixed');
          button.addEventListener('mouseenter', function() {
            this.style.opacity = '0.8';
          });
          button.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
          });
        }
      });

      // Fix form submission buttons
      const forms = document.querySelectorAll('form');
      forms.forEach(form => {
        const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
        if (submitBtn && !submitBtn.hasAttribute('data-fixed')) {
          submitBtn.setAttribute('data-fixed', 'true');
          submitBtn.addEventListener('click', function(e) {
            if (!form.checkValidity()) {
              e.preventDefault();
              form.reportValidity();
            }
          });
        }
      });

      // Fix navigation buttons
      const navButtons = document.querySelectorAll('nav button, .navigation button');
      navButtons.forEach(btn => {
        if (!btn.getAttribute('aria-label') && btn.textContent) {
          btn.setAttribute('aria-label', btn.textContent.trim());
        }
      });

      console.log('Button fixes applied successfully');
      return true;
    } catch (error) {
      console.error('Error applying button fixes:', error);

      // Retry mechanism
      if (retryCount < maxRetries) {
        retryCount++;
        setTimeout(() => {
          console.log(`Retrying button fixes (attempt ${retryCount}/${maxRetries})`);
          applyButtonFixes();
        }, 1000 * retryCount);
      }
      return false;
    }
  }
  }

  // Apply fixes when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyButtonFixes);
  } else {
    applyButtonFixes();
  }

  // Apply fixes after dynamic content loads
  const observer = new MutationObserver(function(mutations) {
    let shouldApplyFixes = false;
    mutations.forEach(mutation => {
      if (mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1 && (
            node.tagName === 'BUTTON' || 
            node.querySelector && node.querySelector('button')
          )) {
            shouldApplyFixes = true;
          }
        });
      }
    });

    if (shouldApplyFixes) {
      setTimeout(applyButtonFixes, 100);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

})();