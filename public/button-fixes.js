// Button interaction fixes and enhancements
document.addEventListener('DOMContentLoaded', function() {
  try {
    // Fix button click handlers
    const buttons = document.querySelectorAll('button, .btn, [role="button"]');

    buttons.forEach(button => {
      // Ensure buttons are focusable
      if (!button.hasAttribute('tabindex')) {
        button.setAttribute('tabindex', '0');
      }

      // Add click handler for better accessibility
      button.addEventListener('click', function(e) {
        // Add visual feedback
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
          this.style.transform = 'scale(1)';
        }, 100);
      });

      // Add keyboard support
      button.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
    });

    // Fix form submission buttons
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Submitting...';

          // Re-enable after 3 seconds as fallback
          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit';
          }, 3000);
        }
      });
    });

    console.log('Button fixes applied successfully');

  } catch (error) {
    console.error('Error applying button fixes:', error);
  }
});