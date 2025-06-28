// ===== OUTLAW WEBSITE JAVASCRIPT =====

// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const blogPosts = document.getElementById('blog-posts');

// ===== MOBILE NAVIGATION =====
function initMobileNav() {
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Smooth scroll for hero CTA button
  const heroCTA = document.querySelector('.hero-cta a');
  if (heroCTA) {
    heroCTA.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = heroCTA.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  }
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Add animation classes and observe elements
  const animatedElements = [
    '.section-header',
    '.about-text',
    '.about-stats',
    '.video-card',
    '.blog-post',
    '.contact-method',
    '.stat-item'
  ];

  animatedElements.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
      element.classList.add('fade-in');
      element.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(element);
    });
  });

  // Special animations for specific elements
  const leftElements = document.querySelectorAll('.about-text');
  leftElements.forEach(element => {
    element.classList.remove('fade-in');
    element.classList.add('slide-in-left');
    observer.observe(element);
  });

  const rightElements = document.querySelectorAll('.about-stats');
  rightElements.forEach(element => {
    element.classList.remove('fade-in');
    element.classList.add('slide-in-right');
    observer.observe(element);
  });
}

// ===== HEADER SCROLL EFFECT =====
function initHeaderScrollEffect() {
  const header = document.querySelector('.header');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      header.style.background = 'rgba(10, 10, 10, 0.98)';
      header.style.backdropFilter = 'blur(15px)';
    } else {
      header.style.background = 'rgba(10, 10, 10, 0.95)';
      header.style.backdropFilter = 'blur(10px)';
    }

    lastScrollY = currentScrollY;
  });
}

// ===== ACTIVE NAVIGATION HIGHLIGHTING =====
function initActiveNavigation() {
  const sections = document.querySelectorAll('.section');
  const headerHeight = document.querySelector('.header').offsetHeight;

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerHeight - 100;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// ===== VIDEO INTERACTIONS =====
function initVideoInteractions() {
  // Select video thumbnails that have the data-video-id attribute
  const videoThumbnails = document.querySelectorAll('.video-thumbnail[data-video-id]');

  videoThumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', (e) => {
      e.preventDefault();
      const videoId = thumbnail.dataset.videoId; // Get the video ID
      const videoTitle = thumbnail.closest('.video-card').querySelector('.video-title').textContent; // Get the title from the card

      showVideoModal(videoTitle, videoId); // Pass both title and videoId
    });
  });
}

// MODIFIED: showVideoModal now accepts videoId
function showVideoModal(title, videoId) {
  // Create modal overlay
  const modal = document.createElement('div');
  modal.className = 'video-modal';

  // Construct YouTube embed URL
  const embedUrl = `https://www.youtube.com/watch?v=HgIwppE9yOQ0${videoId}?autoplay=1&rel=0`; // autoplay=1 to start immediately

  modal.innerHTML = `
    <div class="video-modal-content">
      <div class="video-modal-header">
        <h3>${title}</h3>
        <button class="video-modal-close">&times;</button>
      </div>
      <div class="video-modal-body">
        <div class="video-player-container">
          <iframe src="${embedUrl}"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen>
          </iframe>
        </div>
      </div>
    </div>
  `;

  // Add modal styles (move this to style.css for cleaner code)
  // For quick testing, we'll keep it here, but best practice is in CSS file
  const modalStyles = `
    .video-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      animation: fadeIn 0.3s ease;
    }
    .video-modal-content {
      background: var(--color-secondary);
      border-radius: 12px;
      max-width: 800px; /* Max width of the modal */
      width: 90%; /* Responsive width */
      max-height: 90%;
      overflow: hidden;
      border: 1px solid var(--color-border);
      display: flex; /* Added flex to stack header/body vertically */
      flex-direction: column; /* Added flex to stack header/body vertically */
    }
    .video-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--spacing-md);
      border-bottom: 1px solid var(--color-border);
    }
    .video-modal-header h3 {
      color: var(--color-text-primary);
      margin: 0;
    }
    .video-modal-close {
      background: none;
      border: none;
      color: var(--color-text-primary);
      font-size: 2rem;
      cursor: pointer;
      padding: 0;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: var(--transition-fast);
    }
    .video-modal-close:hover {
      background: var(--color-accent-orange);
    }
    .video-modal-body {
      /* Removed fixed padding: var(--spacing-lg); as it affects iframe directly */
      /* Flex grow to take available space */
      flex-grow: 1; 
      position: relative; /* For absolute positioning of video-player-container */
      padding: 0; /* Remove padding from modal body */
    }
    .video-player-container {
        position: relative;
        padding-bottom: 56.25%; /* 16:9 Aspect Ratio (height / width = 9 / 16 = 0.5625) */
        height: 0;
        overflow: hidden;
        max-width: 100%;
        background: black; /* Just in case video loads slowly */
    }
    .video-player-container iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    /* Removed .video-placeholder styles as it's no longer used */
  `;

  // Add styles to head if not already present
  if (!document.querySelector('#video-modal-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'video-modal-styles';
    styleSheet.textContent = modalStyles;
    document.head.appendChild(styleSheet);
  }

  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';

  // Close modal functionality
  const closeModal = () => {
    modal.remove();
    document.body.style.overflow = '';
  };

  modal.querySelector('.video-modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Close on escape key
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', handleEscape);
    }
  };
  document.addEventListener('keydown', handleEscape);
}

// ===== CONTACT FORM =====
function initContactForm() {
  if (contactForm && formMessage) {
    contactForm.addEventListener('submit', function(e) {
      // You still want client-side validation before sending to Formspree
      const formData = new FormData(contactForm);
      const name = formData.get('name').trim();
      const email = formData.get('email').trim();
      const subject = formData.get('subject');
      const message = formData.get('message').trim();

      // Clear previous messages
      formMessage.className = 'form-message';
      formMessage.textContent = '';

      // Validation (KEEP THIS PART)
      if (!name || !email || !subject || !message) {
        showFormMessage('Please fill in all fields.', 'error');
        e.preventDefault(); // Prevent submission if validation fails
        return;
      }

      if (!isValidEmail(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        e.preventDefault(); // Prevent submission if validation fails
        return;
      }

      // Formspree will handle the submission.
      // You can show a "Sending..." message here if you want immediate feedback.
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;
      submitButton.innerHTML = '<span>Sending...</span>';
      submitButton.disabled = true;

      // Formspree will handle success/error messages on its own page by default.
      // For AJAX submission (to stay on the same page), you'd need more JS:

      // OPTIONAL: For AJAX submission (to show success message without redirect)
      // Add this part if you want to stay on the same page after submission
      // Make sure your form HTML has method="POST" action="YOUR_FORMSPREE_ENDPOINT"
      e.preventDefault(); // Prevent default form submission to handle it via JS

      fetch(contactForm.action, {
          method: contactForm.method,
          body: formData,
          headers: {
              'Accept': 'application/json'
          }
      }).then(response => {
          if (response.ok) {
              showFormMessage(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon.`, 'success');
              contactForm.reset();
          } else {
              response.json().then(data => {
                  if (Object.hasOwnProperty.call(data, 'errors')) {
                      showFormMessage(data["errors"].map(error => error["message"]).join(", "), 'error');
                  } else {
                      showFormMessage('Oops! There was a problem submitting your form.', 'error');
                  }
              })
          }
      }).catch(error => {
          showFormMessage('Oops! There was a network error. Please try again later.', 'error');
      }).finally(() => {
          submitButton.innerHTML = originalText;
          submitButton.disabled = false;
      });
    });
  }
}

function showFormMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;

  // Auto-hide success messages after 5 seconds
  if (type === 'success') {
    setTimeout(() => {
      formMessage.textContent = '';
      formMessage.className = 'form-message';
    }, 5000);
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ===== BLOG RSS INTEGRATION =====
function initBlogSection() {
  // Simulate blog posts loading (in real implementation, this would fetch from Blogger RSS)
  loadBlogPosts();
}

function loadBlogPosts() {
  // Simulate loading delay
  setTimeout(() => {
    const mockPosts = [
      {
        title: "The Brotherhood of the Road: Sturgis 2024 Reflections",
        excerpt: "Another year, another incredible journey to the Black Hills. This year's Sturgis rally brought together riders from across the globe, each with their own story to tell...",
        date: "December 15, 2024",
        link: "#"
      },
      {
        title: "Capturing Love in Motion: Wedding Videography Tips",
        excerpt: "After filming over 50 weddings, I've learned that the best moments happen between the planned shots. Here's how I approach wedding videography with a biker's eye for authenticity...",
        date: "December 10, 2024",
        link: "#"
      },
      {
        title: "Chrome and Character: The Art of Motorcycle Photography",
        excerpt: "Every bike has a story, and every rider has a journey. In this post, I share my techniques for capturing the soul of motorcycle culture through the lens...",
        date: "December 5, 2024",
        link: "#"
      },
      {
        title: "From Harley to Altar: When Bikers Say 'I Do'",
        excerpt: "Some of my favorite weddings have been when two riders decide to take the ultimate ride together. These ceremonies blend tradition with rebellion in the most beautiful ways...",
        date: "November 28, 2024",
        link: "#"
      }
    ];

    displayBlogPosts(mockPosts);
  }, 1500);
}

function displayBlogPosts(posts) {
  if (!blogPosts) return;

  const postsHTML = posts.map(post => `
    <article class="blog-post fade-in">
      <h3 class="blog-post-title">
        <a href="${post.link}">${post.title}</a>
      </h3>
      <div class="blog-post-meta">
        <time datetime="${post.date}">${post.date}</time>
      </div>
      <div class="blog-post-excerpt">
        ${post.excerpt}
      </div>
    </article>
  `).join('');

  blogPosts.innerHTML = postsHTML;

  // Animate new blog posts
  const newPosts = blogPosts.querySelectorAll('.blog-post');
  newPosts.forEach((post, index) => {
    post.style.transitionDelay = `${index * 0.1}s`;
    setTimeout(() => post.classList.add('visible'), 100);
  });
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function initPerformanceOptimizations() {
  // Lazy load images when they come into view
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));

  // Preload critical resources
  const criticalResources = [
    'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap'
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    link.as = 'style';
    document.head.appendChild(link);
  });
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
function initAccessibility() {
  // Add keyboard navigation for video cards
  const videoCards = document.querySelectorAll('.video-card');
  videoCards.forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Play video: ${card.querySelector('.video-title').textContent}`);

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        // Check if there's a play-btn or if the card itself triggers the video
        const playTrigger = card.querySelector('.play-btn') || card; // Prefer play-btn, else the card itself
        if (playTrigger) {
            playTrigger.click(); // Simulate a click on the play trigger
        }
      }
    });
  });

  // Add focus indicators for better keyboard navigation
  const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]');
  focusableElements.forEach(element => {
    element.addEventListener('focus', () => {
      element.style.outline = '2px solid var(--color-accent-orange)';
      element.style.outlineOffset = '2px';
    });

    element.addEventListener('blur', () => {
      element.style.outline = '';
      element.style.outlineOffset = '';
    });
  });
}

// ===== EASTER EGGS =====
function initEasterEggs() {
  // Konami code easter egg
  let konamiCode = [];
  const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ];

  document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
      konamiCode.shift();
    }

    if (konamiCode.join(',') === konamiSequence.join(',')) {
      triggerEasterEgg();
      konamiCode = [];
    }
  });
}

function triggerEasterEgg() {
  // Add special styling to the hero title
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTitle.style.animation = 'none';
    heroTitle.style.background = 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)';
    heroTitle.style.backgroundSize = '400% 400%';
    heroTitle.style.webkitBackgroundClip = 'text';
    heroTitle.style.webkitTextFillColor = 'transparent';
    heroTitle.style.animation = 'gradientShift 2s ease infinite, glow 1s ease-in-out infinite alternate';

    // Show a fun message
    const message = document.createElement('div');
    message.innerHTML = '🏍️ RIDE ON, OUTLAW! 🏍️';
    message.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: var(--color-accent-orange);
      color: var(--color-text-primary);
      padding: var(--spacing-md);
      border-radius: 8px;
      font-family: var(--font-primary);
      font-size: 2rem;
      z-index: 10000;
      animation: fadeInUp 0.5s ease;
      box-shadow: var(--shadow-heavy);
    `;

    document.body.appendChild(message);

    setTimeout(() => {
      message.remove();
      heroTitle.style.animation = 'glow 3s ease-in-out infinite alternate';
      heroTitle.style.background = '';
      heroTitle.style.webkitBackgroundClip = '';
      heroTitle.style.webkitTextFillColor = '';
    }, 3000);
  }
}

// ===== INITIALIZATION =====
function init() {
  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
    return;
  }

  // Initialize all functionality
  initMobileNav();
  initSmoothScrolling();
  initScrollAnimations();
  initHeaderScrollEffect();
  initActiveNavigation();
  initVideoInteractions();
  initContactForm();
  initBlogSection();
  initPerformanceOptimizations();
  initAccessibility();
  initEasterEggs();

  // Add loaded class to body for CSS animations
  document.body.classList.add('loaded');
}

// Start initialization
init();

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Export functions for potential external use
window.OutlawSite = {
  showVideoModal,
  showFormMessage,
  loadBlogPosts
};