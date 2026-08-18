/**
 * Modern Interactions for Feathers and CO
 * Adds dynamic animations, smooth interactions, and premium effects
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // ============================================
  // 1. SCROLL PROGRESS BAR
  // ============================================
  const scrollProgress = document.createElement('div');
  scrollProgress.className = 'scroll-progress';
  document.body.appendChild(scrollProgress);

  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
  });

  // ============================================
  // 2. PAGE LOADER
  // ============================================
  const loader = document.createElement('div');
  loader.className = 'page-loader';
  loader.innerHTML = `
    <div class="loader-content">
      <div class="loader-logo">FEATHERS & CO</div>
      <div class="loader-bar"></div>
    </div>
  `;
  document.body.appendChild(loader);

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('loaded');
    }, 500);
  });

  // ============================================
  // 3. SMOOTH REVEAL ON SCROLL
  // ============================================
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .zoom-on-scroll, .text-reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ============================================
  // 4. PARALLAX HERO EFFECT
  // ============================================
  const heroImages = document.querySelectorAll('.hero-parallax');
  const heroContent = document.querySelectorAll('.hero-content-parallax');

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    heroImages.forEach(img => {
      const speed = 0.5;
      img.style.transform = `translateY(${scrolled * speed}px)`;
    });

    heroContent.forEach(content => {
      const speed = 0.3;
      content.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // ============================================
  // 5. MAGNETIC BUTTONS
  // ============================================
  const magneticBtns = document.querySelectorAll('.magnetic-btn');

  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });

  // ============================================
  // 6. ANIMATED COUNTERS
  // ============================================
  const counters = document.querySelectorAll('.counter');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
          current += step;
          if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };

        updateCounter();
        counterObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  // ============================================
  // 7. TILT EFFECT ON CARDS
  // ============================================
  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });

  // ============================================
  // 8. CURSOR FOLLOWER
  // ============================================
  const cursor = document.createElement('div');
  cursor.className = 'cursor-follower';
  document.body.appendChild(cursor);

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    cursor.style.left = cursorX - 20 + 'px';
    cursor.style.top = cursorY - 20 + 'px';
    
    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  // Cursor hover effect on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .hover-lift, .tilt-card');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  });

  // ============================================
  // 9. SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        const offsetTop = target.offsetTop - 100;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================
  // 10. ENHANCED HEADER SCROLL EFFECT
  // ============================================
  const header = document.querySelector('#header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });

  // ============================================
  // 11. IMAGE LAZY LOADING WITH FADE
  // ============================================
  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        img.onload = () => {
          img.style.opacity = '1';
        };
        
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));

  // ============================================
  // 12. TEXT TYPING EFFECT (Optional)
  // ============================================
  const typingElements = document.querySelectorAll('.typing-effect');

  typingElements.forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    let i = 0;

    const typeWriter = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };

    const typingObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          typeWriter();
          typingObserver.unobserve(entry.target);
        }
      });
    });

    typingObserver.observe(element);
  });

  // ============================================
  // 13. PARALLAX ON MOUSE MOVE (Hero Section)
  // ============================================
  const heroSection = document.querySelector('.hero');

  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      const parallaxElements = heroSection.querySelectorAll('.parallax-layer');
      
      parallaxElements.forEach((el, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
    });
  }

  // ============================================
  // 14. SMOOTH PAGE TRANSITIONS
  // ============================================
  const links = document.querySelectorAll('a:not([href^="#"]):not([target="_blank"])');

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href && !href.includes('mailto:') && !href.includes('tel:') && !href.includes('javascript:')) {
        e.preventDefault();
        
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
          window.location.href = href;
        }, 300);
      }
    });
  });

  // Fade in on page load
  document.body.style.opacity = '0';
  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });

  // ============================================
  // 15. SCROLL-TRIGGERED ANIMATIONS
  // ============================================
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const elementBottom = el.getBoundingClientRect().bottom;
      const isVisible = (elementTop >= 0) && (elementBottom <= window.innerHeight);
      
      if (isVisible) {
        el.classList.add('animated');
      }
    });
  };

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on load

});