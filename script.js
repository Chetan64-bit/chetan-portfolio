document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const cursorGlow = document.querySelector(".cursor-glow");
  const cursorRing = document.querySelector(".cursor-ring");

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
    mobileMenu.classList.toggle("is-open", !isOpen);
    mobileMenu.setAttribute("aria-hidden", String(isOpen));
  });

  mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    mobileMenu.classList.remove("is-open");
    mobileMenu.setAttribute("aria-hidden", "true");
  }));

  window.addEventListener("pointermove", (event) => {
    cursorGlow.style.transform = `translate3d(${event.clientX - 160}px, ${event.clientY - 160}px, 0)`;
    cursorRing.style.transform = `translate3d(${event.clientX - 12}px, ${event.clientY - 12}px, 0)`;
    document.documentElement.style.setProperty("--mouse-x", `${event.clientX / window.innerWidth * 100}%`);
    document.documentElement.style.setProperty("--mouse-y", `${event.clientY / window.innerHeight * 100}%`);
  });

  document.querySelectorAll("a, button").forEach((element) => {
    element.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    element.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
  });

  const caseStudyModal = document.querySelector(".case-study-modal");
  const modalTitle = caseStudyModal.querySelector(".modal-title");
  const modalCopy = caseStudyModal.querySelector(".modal-copy");
  const modalStack = caseStudyModal.querySelector(".modal-stack");
  document.querySelectorAll(".case-study-trigger").forEach((trigger) => trigger.addEventListener("click", () => {
    const project = trigger.closest(".project-card");
    modalTitle.textContent = project.querySelector("h3").textContent;
    modalCopy.textContent = project.querySelector("p").textContent;
    modalStack.textContent = project.querySelector(".project-meta span:last-child").textContent;
    caseStudyModal.showModal();
  }));
  caseStudyModal.querySelector(".modal-close").addEventListener("click", () => caseStudyModal.close());
  caseStudyModal.addEventListener("click", (event) => { if (event.target === caseStudyModal) caseStudyModal.close(); });

  const contactForm = document.querySelector(".contact-form");
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const subject = encodeURIComponent(`Portfolio inquiry from ${formData.get("name")}`);
    const body = encodeURIComponent(`Name: ${formData.get("name")}\nEmail: ${formData.get("email")}\n\n${formData.get("message")}`);
    document.querySelector(".form-status").textContent = "Opening your email app...";
    window.location.href = `mailto:cshinde000@gmail.com?subject=${subject}&body=${body}`;
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
});
