// DevoraByte motion effects: subtle, accessible animations.
document.documentElement.classList.add("js-motion");

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });
}

// Portfolio filters
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;

    projectCards.forEach((card) => {
      const show = filter === "all" || card.dataset.category === filter;
      card.hidden = !show;
    });
  });
});

// Contact form: prepares an email draft. Replace this address with the studio's real inbox.
// IMPORTANT: replace these placeholders with your real business details before publishing.
const CONTACT_EMAIL = "hello@devorabyte.com";
const SOCIAL_PROFILES = {
  instagram: "https://www.instagram.com/devorabyte?srtk=OTV0YTQ4MnNnbTBv",
  linkedin: "https://linkedin.com/in/YOUR_PROFILE",
  github: "https://github.com/YOUR_USERNAME",
  whatsapp: "https://wa.me/201020904097"
};
const contactForm = document.querySelector("#contactForm");
const formNote = document.querySelector("#formNote");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const service = String(formData.get("service") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const subject = encodeURIComponent(`DevoraByte project inquiry — ${service}`);
    const body = encodeURIComponent(
      `Hi DevoraByte,\n\nMy name is ${name}.\nEmail: ${email}\nService: ${service}\n\nProject details:\n${message}\n\nSent from the DevoraByte website.`
    );

    formNote.textContent = `Opening your email app. If it doesn't open, email ${CONTACT_EMAIL} directly after updating it to your real inbox.`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  });
}

// Theme switcher (remembers the visitor's choice on this device).
const themeToggle = document.querySelector(".theme-toggle");
const savedTheme = localStorage.getItem("devorabyte-theme");
if (savedTheme === "light") document.body.classList.add("light-theme");
function updateThemeButton() {
  if (!themeToggle) return;
  const light = document.body.classList.contains("light-theme");
  themeToggle.textContent = light ? "☾" : "☼";
  themeToggle.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
  themeToggle.title = light ? "Switch to dark theme" : "Switch to light theme";
}
updateThemeButton();
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    localStorage.setItem("devorabyte-theme", document.body.classList.contains("light-theme") ? "light" : "dark");
    updateThemeButton();
  });
}

// Social links are intentionally placeholders until the real profiles are supplied.
document.querySelectorAll("[data-profile]").forEach((link) => {
  const profile = SOCIAL_PROFILES[link.dataset.profile];
  if (profile && !/YOUR_USERNAME|YOUR_PROFILE|YOUR_PHONE_NUMBER/.test(profile)) {
    link.href = profile;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  } else {
    link.href = "#contact";
    link.title = "Add your real profile URL in script.js before publishing";
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const note = document.querySelector("#formNote");
      if (note) note.textContent = `Add your real ${link.dataset.profile} profile URL in script.js before publishing.`;
      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
    });
  }
});

// Package buttons preselect the matching service in the inquiry form.
document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    const serviceSelect = document.querySelector("#service");
    const requested = link.dataset.service;
    if (!serviceSelect) return;
    const option = [...serviceSelect.options].find((item) => item.text.toLowerCase() === requested.toLowerCase());
    if (option) serviceSelect.value = option.value || option.text;
    else if (requested === "Landing page") serviceSelect.value = "New website";
    else if (requested === "Business website") serviceSelect.value = "New website";
    else if (requested === "Custom solution") serviceSelect.value = "Something else";
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();


// Scroll reveal: elements fade and rise into view as the visitor scrolls.
const revealSelectors = [
  ".section-heading",
  ".service-card",
  ".price-card",
  ".project-card",
  ".about-visual",
  ".about-copy",
  ".why-card",
  ".security-panel",
  ".process-grid article",
  ".contact-copy",
  ".contact-form",
  ".trust-inner > *"
];

const revealElements = document.querySelectorAll(revealSelectors.join(","));

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  revealElements.forEach((element, index) => {
    element.classList.add("reveal-on-scroll");
    if (element.matches(".service-card, .price-card, .process-grid article, .trust-inner > *")) {
      element.style.setProperty("--reveal-delay", `${(index % 4) * 90}ms`);
    }

    // Hero content should be visible immediately; reveal the other sections on scroll.
    if (element.closest(".hero")) {
      element.classList.remove("reveal-on-scroll");
      return;
    }
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

  revealElements.forEach((element) => {
    if (element.classList.contains("reveal-on-scroll")) revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}


// Extra premium motion: reading progress, pointer glow, and gentle card tilt.
const progressBar = document.createElement("div");
progressBar.className = "scroll-progress";
progressBar.setAttribute("aria-hidden", "true");
document.body.prepend(progressBar);
let progressTicking = false;
function updateScrollProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  progressTicking = false;
}
window.addEventListener("scroll", () => {
  if (!progressTicking) {
    window.requestAnimationFrame(updateScrollProgress);
    progressTicking = true;
  }
}, { passive: true });
updateScrollProgress();

// Soft pointer-follow glow on desktop; no movement on touch or reduced-motion devices.
const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (canHover && !reduceMotion) {
  document.body.classList.add("pointer-motion");
  window.addEventListener("pointermove", (event) => {
    document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
    document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
  }, { passive: true });

  document.querySelectorAll(".service-card, .price-card, .why-card, .project-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      card.style.setProperty("--tilt-x", `${(0.5 - y) * 3}deg`);
      card.style.setProperty("--tilt-y", `${(x - 0.5) * 3}deg`);
      card.style.setProperty("--shine-x", `${x * 100}%`);
      card.style.setProperty("--shine-y", `${y * 100}%`);
    });
    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    });
  });
}
