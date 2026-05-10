// Sndbxlife - Main JavaScript
// Adapted from Paradox Cafe

document.addEventListener("DOMContentLoaded", function () {
  // === NAVBAR HAMBURGER TOGGLE ===
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", !isExpanded);
      navLinks.classList.toggle("active");
    });

    // Close menu on link click
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close menu on outside click
    document.addEventListener("click", function (e) {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // === ACTIVE NAV LINK HIGHLIGHT ===
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.style.color = "var(--accent)";
      link.style.textShadow = "0 0 10px var(--accent)";
    }
  });

  // === SCROLL REVEAL ANIMATION ===
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Apply reveal to cards and gallery items
  const revealElements = document.querySelectorAll(
    ".card, .gallery-item, .feature-card, .product-card, .event-card, .member-card",
  );
  revealElements.forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s`;
    observer.observe(el);
  });

  // === NAVBAR SCROLL EFFECT ===
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.style.background = "rgba(5, 5, 10, 0.98)";
        navbar.style.boxShadow = "0 2px 40px rgba(0, 0, 0, 0.9)";
      } else {
        navbar.style.background = "var(--bg)";
        navbar.style.boxShadow = "0 2px 30px rgba(0, 0, 0, 0.8)";
      }
    }
  });

  // === PRODUCT CARD ADD BUTTON FEEDBACK ===
  document.querySelectorAll(".add-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const original = this.textContent;
      this.textContent = "✓ Added";
      this.style.background = "var(--accent)";
      this.style.color = "var(--primary)";
      setTimeout(() => {
        this.textContent = original;
        this.style.background = "";
        this.style.color = "";
      }, 1500);
    });
  });

  // === TYPING EFFECT ON HERO TITLE (index only) ===
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle && document.title.includes("Home")) {
    heroTitle.style.animation = "glow 3s ease-in-out infinite alternate";
  }

  // === FLOATING ELEMENT MOUSE PARALLAX ===
  document.addEventListener("mousemove", function (e) {
    const floatingEls = document.querySelectorAll(".floating-element");
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    floatingEls.forEach((el, i) => {
      const factor = (i + 1) * 0.5;
      el.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
  });
});
