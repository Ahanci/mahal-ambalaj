// Mahal Ambalaj - JavaScript Functions

document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Close mobile menu when clicking on links
  const mobileMenuLinks = mobileMenu?.querySelectorAll("a");
  mobileMenuLinks?.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.add("hidden");
    });
  });

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Back to top button
  const backToTopBtn = document.getElementById("back-to-top");

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("visible");
      backToTopBtn.style.opacity = "1";
      backToTopBtn.style.visibility = "visible";
    } else {
      backToTopBtn.classList.remove("visible");
      backToTopBtn.style.opacity = "0";
      backToTopBtn.style.visibility = "hidden";
    }
  });

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-in-up");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".product-card, .bg-white.rounded-lg, .text-center"
  );
  animateElements.forEach((el) => {
    observer.observe(el);
  });

  // Product category filtering (if needed in future)
  function filterProducts(category) {
    const products = document.querySelectorAll(".product-card");

    products.forEach((product) => {
      if (category === "all" || product.dataset.category === category) {
        product.style.display = "block";
        product.classList.add("animate-fade-in-up");
      } else {
        product.style.display = "none";
      }
    });
  }

  // Search functionality
  const searchInput = document.querySelector("#search-input");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      const products = document.querySelectorAll(".product-card");

      products.forEach((product) => {
        const title = product.querySelector("h3").textContent.toLowerCase();
        const description = product
          .querySelector("p")
          .textContent.toLowerCase();

        if (title.includes(searchTerm) || description.includes(searchTerm)) {
          product.style.display = "block";
        } else {
          product.style.display = "none";
        }
      });
    });
  }

  // Notification system
  function showNotification(message, type = "info") {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll(".notification");
    existingNotifications.forEach((notification) => notification.remove());

    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 translate-x-full`;

    // Set notification content based on type
    let icon, bgColor, textColor;

    switch (type) {
      case "success":
        icon = "fas fa-check-circle";
        bgColor = "bg-green-500";
        textColor = "text-white";
        break;
      case "error":
        icon = "fas fa-exclamation-circle";
        bgColor = "bg-red-500";
        textColor = "text-white";
        break;
      case "warning":
        icon = "fas fa-exclamation-triangle";
        bgColor = "bg-yellow-500";
        textColor = "text-white";
        break;
      default:
        icon = "fas fa-info-circle";
        bgColor = "bg-blue-500";
        textColor = "text-white";
    }

    notification.className += ` ${bgColor} ${textColor}`;
    notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <i class="${icon} text-xl"></i>
                <p class="font-medium">${message}</p>
                <button class="ml-auto text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.classList.remove("translate-x-full");
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.classList.add("translate-x-full");
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 5000);
  }

  // Lazy loading for images
  function lazyLoadImages() {
    const images = document.querySelectorAll("img[loading='lazy']");

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add("loaded");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }

  // Initialize lazy loading
  lazyLoadImages();

  // Add product card hover effects
  const productCards = document.querySelectorAll(".product-card");
  productCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Add click to copy phone number
  const phoneNumbers = document.querySelectorAll(".phone-number");
  phoneNumbers.forEach((phone) => {
    phone.addEventListener("click", function () {
      const number = this.textContent;
      navigator.clipboard.writeText(number).then(() => {
        showNotification("Telefon numarası kopyalandı!", "success");
      });
    });
  });

  // Add WhatsApp click handler
  const whatsappLinks = document.querySelectorAll(".whatsapp-link");
  whatsappLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const phone = "905551234567"; // Replace with actual phone number
      const message = "Merhaba, Mahal Ambalaj hakkında bilgi almak istiyorum.";
      const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
        message
      )}`;
      window.open(whatsappUrl, "_blank");
    });
  });

  // Add scroll progress indicator
  function addScrollProgress() {
    const progressBar = document.createElement("div");
    progressBar.className =
      "fixed top-0 left-0 w-full h-1 bg-blue-600 z-50 transform origin-left";
    progressBar.style.transform = "scaleX(0)";
    document.body.appendChild(progressBar);

    window.addEventListener("scroll", () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      progressBar.style.transform = `scaleX(${scrollPercent})`;
    });
  }

  // Initialize scroll progress
  addScrollProgress();

  // Add keyboard navigation support
  document.addEventListener("keydown", function (e) {
    // Escape key to close mobile menu
    if (e.key === "Escape" && !mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.add("hidden");
    }

    // Enter key to submit form when focused on submit button
    if (e.key === "Enter" && document.activeElement.type === "submit") {
      document.activeElement.click();
    }
  });

  // Add touch support for mobile
  let touchStartY = 0;
  let touchEndY = 0;

  document.addEventListener("touchstart", function (e) {
    touchStartY = e.changedTouches[0].screenY;
  });

  document.addEventListener("touchend", function (e) {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe up - could be used for navigation
        console.log("Swipe up detected");
      } else {
        // Swipe down - could be used for navigation
        console.log("Swipe down detected");
      }
    }
  }

  // Performance optimization: Debounce scroll events
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

  // Apply debouncing to scroll events
  const debouncedScrollHandler = debounce(() => {
    // Handle scroll-based animations and effects
  }, 16); // ~60fps

  window.addEventListener("scroll", debouncedScrollHandler);

  // Add service worker registration (for PWA features)
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("./sw.js")
        .then((registration) => {
          console.log("SW registered: ", registration);
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError);
        });
    });
  }

  // Add offline/online status handling
  window.addEventListener("online", function () {
    showNotification("İnternet bağlantısı yeniden kuruldu!", "success");
  });

  window.addEventListener("offline", function () {
    showNotification("İnternet bağlantısı kesildi!", "warning");
  });

  // Initialize all components
  console.log("Mahal Ambalaj website loaded successfully!");
});

// Global functions for external use
window.MahalAmbalaj = {
  showNotification: function (message, type) {
    // This will be available globally
    if (typeof showNotification === "function") {
      showNotification(message, type);
    }
  },

  filterProducts: function (category) {
    // This will be available globally
    if (typeof filterProducts === "function") {
      filterProducts(category);
    }
  },
};

  // Image Slider Functionality
  function initSlider() {
    const slider = document.getElementById('slider-container');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.slider-dot');
    
    if (!slider || !prevBtn || !nextBtn) return;
    
    let currentSlide = 0;
    const totalSlides = 4; // Number of slides
    let autoSlideInterval;
    
    // Function to update slider position
    function updateSlider() {
      const translateX = -currentSlide * 100;
      slider.style.transform = `translateX(${translateX}%)`;
      
      // Update dots
      dots.forEach((dot, index) => {
        if (index === currentSlide) {
          dot.classList.add('bg-white', 'bg-opacity-100');
          dot.classList.remove('bg-opacity-60');
        } else {
          dot.classList.remove('bg-white', 'bg-opacity-100');
          dot.classList.add('bg-opacity-60');
        }
      });
    }
    
    // Function to go to next slide
    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlider();
    }
    
    // Function to go to previous slide
    function prevSlide() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSlider();
    }
    
    // Function to go to specific slide
    function goToSlide(slideIndex) {
      currentSlide = slideIndex;
      updateSlider();
    }
    
    // Auto slide function
    function startAutoSlide() {
      autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    
    function stopAutoSlide() {
      clearInterval(autoSlideInterval);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', () => {
      nextSlide();
      stopAutoSlide();
      startAutoSlide(); // Restart auto slide
    });
    
    prevBtn.addEventListener('click', () => {
      prevSlide();
      stopAutoSlide();
      startAutoSlide(); // Restart auto slide
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        goToSlide(index);
        stopAutoSlide();
        startAutoSlide(); // Restart auto slide
      });
    });
    
    // Pause auto slide on hover
    const sliderContainer = document.getElementById('slider');
    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', stopAutoSlide);
      sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
      }
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    slider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
    
    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe left - next slide
          nextSlide();
        } else {
          // Swipe right - previous slide
          prevSlide();
        }
        stopAutoSlide();
        startAutoSlide();
      }
    }
    
    // Initialize slider
    updateSlider();
    startAutoSlide();
    
    // Pause auto slide when page is not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAutoSlide();
      } else {
        startAutoSlide();
      }
    });
  }
  
  // Initialize slider when DOM is loaded
  initSlider();
