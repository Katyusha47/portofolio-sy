// Main JavaScript for Portfolio Website
(function () {
  "use strict";

  // ==================== Smooth Scroll for Internal Links ====================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
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
          "success",
        );
        contactForm.reset();
        submitBtn.querySelector(".btn-text").textContent = originalBtnText;
        submitBtn.disabled = false;
      }, 1500);
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
})();
