// ==========================================================================
// RASOI EQUIPMENTS — GLOBAL JAVASCRIPT
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Mobile Navigation Menu Toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mainNav.classList.toggle('open');
      navToggle.classList.toggle('active');
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
      if (!mainNav.contains(e.target) && !navToggle.contains(e.target)) {
        mainNav.classList.remove('open');
        navToggle.classList.remove('active');
      }
    });

    // Add mobile dropdown arrow trigger for products dropdown submenu
    const dropdownParents = mainNav.querySelectorAll('li:has(.dropdown)');
    dropdownParents.forEach(parent => {
      const link = parent.querySelector('a');
      
      // Create a toggle button for sub-menus on mobile
      const arrowBtn = document.createElement('span');
      arrowBtn.className = 'dropdown-arrow-toggle';
      arrowBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
      arrowBtn.style.cssText = 'display: none; padding: 10px; margin-left: auto; cursor: pointer; color: var(--blue);';
      
      link.after(arrowBtn);
      
      arrowBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        parent.classList.toggle('open');
        arrowBtn.querySelector('i').classList.toggle('fa-chevron-up');
        arrowBtn.querySelector('i').classList.toggle('fa-chevron-down');
      });
    });
  }

  // 2. Sticky Header on Scroll
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('sticky');
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
      } else {
        header.classList.remove('sticky');
        header.style.boxShadow = '0 2px 16px rgba(0,0,0,0.08)';
      }
    });
  }

  // 3. Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });
    
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 4. Scroll Fade-in Animations (Intersection Observer)
  const fadeElements = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window && fadeElements.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.12
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Once visible, we can stop observing it
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    fadeElements.forEach(el => el.classList.add('visible'));
  }

  // 5. Shared Contact Form Submission Handler
  const contactForms = document.querySelectorAll('.enquiry-form, .contact-form');
  contactForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Basic input gathering for demonstration
      const nameInput = form.querySelector('input[type="text"]');
      const phoneInput = form.querySelector('input[type="tel"]');
      const emailInput = form.querySelector('input[type="email"]');
      const selectCategory = form.querySelector('select');
      const messageInput = form.querySelector('textarea');
      
      const nameVal = nameInput ? nameInput.value.trim() : '';
      const phoneVal = phoneInput ? phoneInput.value.trim() : '';
      
      if (!nameVal || !phoneVal) {
        alert('Please fill in your name and phone number.');
        return;
      }
      
      // Pre-fill a WhatsApp message if the user desires
      const whatsappMsg = `Hi Rasoi Equipments,\n\nMy name is *${nameVal}*.\nPhone: *${phoneVal}*\n${emailInput && emailInput.value ? 'Email: ' + emailInput.value + '\n' : ''}${selectCategory && selectCategory.value ? 'Category: *' + selectCategory.value + '*\n' : ''}${messageInput && messageInput.value ? 'Message: ' + messageInput.value : ''}`;
      
      const encodedMsg = encodeURIComponent(whatsappMsg);
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Determine WhatsApp URL based on device
      const waNumber = '918318551885'; // Contact us primary number
      const waUrl = isMobile 
        ? `https://api.whatsapp.com/send?phone=${waNumber}&text=${encodedMsg}` 
        : `https://web.whatsapp.com/send?phone=${waNumber}&text=${encodedMsg}`;
      
      // Show confirmation dialog before redirection
      if (confirm('Thank you! Would you like to send this enquiry directly to our WhatsApp support team?')) {
        window.open(waUrl, '_blank');
      } else {
        alert('Thank you! Your enquiry has been received. Our team will contact you shortly.');
      }
      
      // Reset the form
      form.reset();
    });
  });

});
