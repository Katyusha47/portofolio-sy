// Main JavaScript for Portfolio Website
(function () {
  "use strict";

  // ==================== Navigation Controls ====================
  const controls = document.querySelectorAll(".control");
  const sections = document.querySelectorAll(".container");

  controls.forEach((button) => {
    button.addEventListener("click", function () {
      const activeBtn = document.querySelector(".active-btn");
      const activeSection = document.querySelector(".active");

      if (activeBtn) activeBtn.classList.remove("active-btn");
      if (activeSection) activeSection.classList.remove("active");

      this.classList.add("active-btn");
      const targetSection = document.getElementById(button.dataset.id);
      if (targetSection) targetSection.classList.add("active");
    });
  });

  // ==================== Theme Toggle ====================
  const themeBtn = document.querySelector(".theme-btn");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      // Save preference to localStorage
      const isLightMode = document.body.classList.contains("light-mode");
      localStorage.setItem("theme", isLightMode ? "light" : "dark");
    });

    // Load saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.body.classList.add("light-mode");
    }
  }

  // ==================== Typing Animation ====================
  const typingText = document.getElementById("typing-text");
  const words = [
    "A Fresher.",
    "A Developer.",
    "A Student.",
    "A Problem Solver.",
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 150;

  function typeEffect() {
    if (!typingText) return;

    const currentWord = words[wordIndex];

    if (isDeleting) {
      typingText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 100;
    } else {
      typingText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 150;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  // Start typing animation after loading
  setTimeout(typeEffect, 1000);

  // ==================== Scroll Progress Bar ====================
  const scrollProgress = document.getElementById("scroll-progress");

  function updateScrollProgress() {
    if (!scrollProgress) return;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = scrollPercentage + "%";
  }

  window.addEventListener("scroll", updateScrollProgress);

  // ==================== Back to Top Button ====================
  const backToTopBtn = document.getElementById("back-to-top");

  function toggleBackToTop() {
    if (!backToTopBtn) return;
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  }

  window.addEventListener("scroll", toggleBackToTop);

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // ==================== Loading Screen ====================
  const loadingScreen = document.getElementById("loading-screen");

  window.addEventListener("load", () => {
    setTimeout(() => {
      if (loadingScreen) {
        loadingScreen.classList.add("hidden");
        setTimeout(() => {
          loadingScreen.style.display = "none";
        }, 500);
      }
    }, 1000);
  });

  // ==================== Particles.js Configuration ====================
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#6366f1",
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#6366f1",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1,
            },
          },
          push: {
            particles_nb: 4,
          },
        },
      },
      retina_detect: true,
    });
  }

  // ==================== Scroll Reveal Animation ====================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Observe elements for fade-in animation
  const fadeElements = document.querySelectorAll(
    ".progress-bar, .timeline-item, .portfolio-item"
  );
  fadeElements.forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });

  // ==================== Contact Form Handler ====================
  const contactForm = document.getElementById("contact-form");
  const formFeedback = document.getElementById("form-feedback");

  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = {
        name: document.getElementById("form-name").value,
        email: document.getElementById("form-email").value,
        subject: document.getElementById("form-subject").value,
        message: document.getElementById("form-message").value,
      };

      // Basic validation
      if (
        !formData.name ||
        !formData.email ||
        !formData.subject ||
        !formData.message
      ) {
        showFormMessage("Please fill in all fields.", "error");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        showFormMessage("Please enter a valid email address.", "error");
        return;
      }

      // Show loading state
      const submitBtn = contactForm.querySelector(".main-btn");
      const originalBtnText = submitBtn.querySelector(".btn-text").textContent;
      submitBtn.querySelector(".btn-text").textContent = "Sending...";
      submitBtn.disabled = true;

      // Simulate form submission (replace with actual backend call)
      setTimeout(() => {
        showFormMessage(
          "Thank you! Your message has been sent successfully. I will get back to you soon!",
          "success"
        );
        contactForm.reset();
        submitBtn.querySelector(".btn-text").textContent = originalBtnText;
        submitBtn.disabled = false;
      }, 1500);

      // For actual implementation with Web3Forms or Formspree:
      /*
            try {
                const response = await fetch('YOUR_FORM_ENDPOINT', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    showFormMessage('Thank you! Your message has been sent successfully.', 'success');
                    contactForm.reset();
                } else {
                    showFormMessage('Oops! Something went wrong. Please try again.', 'error');
                }
            } catch (error) {
                showFormMessage('Oops! Something went wrong. Please try again.', 'error');
            }

            submitBtn.querySelector('.btn-text').textContent = originalBtnText;
            submitBtn.disabled = false;
            */
    });
  }

  function showFormMessage(message, type) {
    if (!formFeedback) return;

    formFeedback.textContent = message;
    formFeedback.className = "form-message " + type;

    setTimeout(() => {
      formFeedback.className = "form-message";
    }, 5000);
  }

  // ==================== Smooth Scroll for Internal Links ====================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      e.preventDefault();
      const targetId = href.substring(1);

      // Trigger section navigation if it's a section link
      const targetControl = document.querySelector(
        `.control[data-id="${targetId}"]`
      );
      if (targetControl) {
        targetControl.click();
      }
    });
  });

  // ==================== Animate Progress Bars on View ====================
  const progressBars = document.querySelectorAll(".progress span");
  const progressObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = "growWidth 1.5s ease-in-out forwards";
        }
      });
    },
    { threshold: 0.5 }
  );

  progressBars.forEach((bar) => progressObserver.observe(bar));
})();

// Add CSS animation for progress bars
const style = document.createElement("style");
style.textContent = `
    @keyframes growWidth {
        from {
            width: 0;
        }
        to {
            width: var(--target-width);
        }
    }
    
    .progress span {
        animation: none;
        --target-width: attr(style);
    }
`;
document.head.appendChild(style);
