// ===== OUTLAW WEBSITE JAVASCRIPT =====

// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const blogPostsContainer = document.getElementById('blog-posts');

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
    '.blog-post-card', // Ensure this class is targeted
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
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`; // Correct YouTube embed format

  modal.innerHTML = `
    <div class="video-modal-content">
      <div class="video-modal-header">
        <h3>${title}</h3>
        <button class="video-modal-close">×</button>
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
      background: #1a1a1a; /* Dark background for modal */
      border-radius: 12px;
      max-width: 800px;
      width: 90%;
      max-height: 90%;
      overflow: hidden;
      border: 1px solid #333;
      display: flex;
      flex-direction: column;
    }
    .video-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid #333;
    }
    .video-modal-header h3 {
      color: #d4af37; /* Gold title */
      margin: 0;
    }
    .video-modal-close {
      background: none;
      border: none;
      color: #fff;
      font-size: 2rem;
      cursor: pointer;
      padding: 0;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: all 0.3s ease;
    }
    .video-modal-close:hover {
      background: #b8941f; /* Darker gold on hover */
    }
    .video-modal-body {
      flex-grow: 1;
      position: relative;
      padding: 0;
    }
    .video-player-container {
        position: relative;
        padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
        height: 0;
        overflow: hidden;
        max-width: 100%;
        background: black;
    }
    .video-player-container iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
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
      const formData = new FormData(contactForm);
      const name = formData.get('name').trim();
      const email = formData.get('email').trim();
      const subject = formData.get('subject');
      const message = formData.get('message').trim();

      formMessage.className = 'form-message';
      formMessage.textContent = '';

      if (!name || !email || !subject || !message) {
        showFormMessage('Please fill in all fields.', 'error');
        e.preventDefault();
        return;
      }

      if (!isValidEmail(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        e.preventDefault();
        return;
      }

      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;
      submitButton.innerHTML = '<span>Sending...</span>';
      submitButton.disabled = true;

      e.preventDefault();

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
const blogRssFeedUrl = 'https://svakodneva-filozofija.blogspot.com/feeds/posts/default?alt=rss';

// Function to decode HTML entities
function decodeHtmlEntities(text) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
}

// New helper function to aggressively clean text from unwanted characters
function cleanTextContent(text) {
    if (!text) return '';
    // Decode HTML entities first
    text = decodeHtmlEntities(text);
    // Regex to remove common non-printable ASCII, Unicode control, and zero-width characters
    // It also specifically targets and removes the BOM (Byte Order Mark) if present.
    text = text.replace(/[\u0000-\u001F\u007F-\u009F\u00AD\u034F\u061C\u115F\u1160\u17B4\u17B5\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u206A-\u206F\u3164\uFEFF\uFFA0]+/g, '');
    // Remove any leading/trailing whitespace including non-breaking spaces (trim aggressively)
    text = text.trim();
    // Replace multiple spaces with a single space (e.g., from character removal)
    text = text.replace(/\s\s+/g, ' ');
    return text;
}


// Function to strip HTML tags from a string
function stripHtml(html) {
    // Create a temporary div to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    // Get text content of the div
    let text = tempDiv.textContent || tempDiv.innerText || '';
    // Further clean up after stripping HTML, just in case
    text = text.replace(/\s+/g, ' '); // Replace multiple spaces with a single space
    return text.trim();
}


async function fetchRssFeed() {
    if (!blogPostsContainer || !blogRssFeedUrl) {
        console.error('Blog posts container or RSS feed URL not set for RSS integration.');
        blogPostsContainer.innerHTML = '<p>Blog feed is not configured. Please set the RSS feed URL in script.js.</p>';
        return;
    }

    blogPostsContainer.innerHTML = `
        <div class="blog-loading">
            <div class="loading-spinner"></div>
            <p>Loading latest stories...</p>
        </div>
    `;

    try {
        const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(blogRssFeedUrl)}`;
        
        console.log('Attempting to fetch RSS feed from proxy:', proxyUrl);

        const response = await fetch(proxyUrl);
        if (!response.ok) {
            console.error('Network response was not ok:', response.status, response.statusText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        console.log('RSS Feed Data received:', data);

        if (data.status === 'ok' && data.items && data.items.length > 0) {
            blogPostsContainer.innerHTML = '';

            data.items.slice(0, 3).forEach(item => {
                const postElement = document.createElement('div');
                postElement.classList.add('blog-post-card', 'fade-in');

                // Extract image from content or use placeholder
                let imageUrl = ''; // Start with an empty string, so no <img> is generated unless a valid image is found
                const parser = new DOMParser();
                const contentHtml = item.content || item.description || ''; // Use description if content is empty
                const doc = parser.parseFromString(contentHtml, 'text/html');
                const imgElement = doc.querySelector('img');

                if (imgElement && imgElement.src && !imgElement.src.includes('data:image/gif')) { // Exclude tracking gifs
                    // Try to get a larger image if Blogger provides 'sXXX-c' in URL, e.g., 's1600-c' for large
                    imageUrl = imgElement.src.replace(/\/s\d+-c\//, '/s1600/'); // Example: replace /s320-c/ with /s1600/
                    if (!imageUrl.startsWith('http')) { // Ensure it's an absolute URL
                        // If not absolute, consider it invalid for display
                        imageUrl = ''; // Don't use a placeholder, just hide the image
                    }
                } else {
                    // Fallback to media:thumbnail or other common RSS image fields if available in item.enclosures
                    if (item.enclosures && item.enclosures.length > 0) {
                        const thumbnail = item.enclosures.find(enc => enc.type.startsWith('image/') && !enc.url.includes('data:image/gif') && enc.url.startsWith('http'));
                        if (thumbnail && thumbnail.url) {
                            imageUrl = thumbnail.url;
                        }
                    }
                }
                
                // === TEXT CLEANING ===
                // Apply the robust cleanTextContent function
                const cleanedTitle = cleanTextContent(item.title || '');

                let rawDescription = item.description || item.content || '';
                // Remove blogger specific elements like <div class="blogger-post-footer">
                rawDescription = rawDescription.replace(/<div\s+class=["']blogger-post-footer["']>.*?<\/div>/gis, '');
                // Remove any remaining script tags or style tags
                rawDescription = rawDescription.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
                rawDescription = rawDescription.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
                
                // Apply cleanTextContent to the description after stripping HTML
                const cleanedDescription = cleanTextContent(stripHtml(rawDescription)).substring(0, 150) + '...';

                // Conditionally render the thumbnail div ONLY if a valid imageUrl was found
                const thumbnailHtml = imageUrl ? 
                    `<div class="blog-post-thumbnail">
                        <img src="${imageUrl}" alt="${cleanedTitle}">
                    </div>` : '';

                postElement.innerHTML = `
                    ${thumbnailHtml}
                    <div class="blog-post-info">
                        <h3 class="blog-post-title">${cleanedTitle}</h3>
                        <p class="blog-post-description">${cleanedDescription}</p>
                        <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="read-more-btn">Read More</a>
                        <div class="blog-post-meta">
                            <span class="post-date">${new Date(item.pubDate).toLocaleDateString()}</span>
                            <span class="post-author">${item.author || data.feed.title || 'Outlaw'}</span>
                        </div>
                    </div>
                `;
                blogPostsContainer.appendChild(postElement);
            });
            initScrollAnimations();
        } else {
            console.warn('RSS feed fetched successfully, but no items found or data.status is not "ok":', data);
            blogPostsContainer.innerHTML = '<p>Could not load blog posts. The RSS feed might be empty or invalid.</p>';
        }
    } catch (error) {
        console.error('Error fetching RSS feed:', error);
        blogPostsContainer.innerHTML = '<p>Failed to load blog posts. Please try again later or check the RSS feed URL.</p>';
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function initPerformanceOptimizations() {
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
  const videoCards = document.querySelectorAll('.video-card');
  videoCards.forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Play video: ${card.querySelector('.video-title').textContent}`);

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const playTrigger = card.querySelector('.play-btn') || card;
        if (playTrigger) {
            playTrigger.click();
        }
      }
    });
  });

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
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTitle.style.animation = 'none';
    heroTitle.style.background = 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)';
    heroTitle.style.backgroundSize = '400% 400%';
    heroTitle.style.webkitBackgroundClip = 'text';
    heroTitle.style.webkitTextFillColor = 'transparent';
    heroTitle.style.animation = 'gradientShift 2s ease infinite, glow 1s ease-in-out infinite alternate';

    const message = document.createElement('div');
    message.innerHTML = '🏍️ RIDE ON, OUTLAW! 🏍️';
    message.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #d4af37;
      color: #fff;
      padding: 1rem;
      border-radius: 8px;
      font-family: 'Bebas Neue', sans-serif;
      font-size: 2rem;
      z-index: 10000;
      animation: fadeInUp 0.5s ease;
      box-shadow: 0 5px 15px rgba(0,0,0,0.3);
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
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
    return;
  }

  initMobileNav();
  initSmoothScrolling();
  initHeaderScrollEffect();
  initActiveNavigation();
  initVideoInteractions();
  initContactForm();
  fetchRssFeed(); // Call this function to load the real blog posts
  initPerformanceOptimizations();
  initAccessibility();
  initEasterEggs();

  document.body.classList.add('loaded');
}

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

window.OutlawSite = {
  showVideoModal,
  showFormMessage,
  fetchRssFeed
};