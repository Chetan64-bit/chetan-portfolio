document.addEventListener("DOMContentLoaded", () => {
  // Animate progress bars
  const progressBars = document.querySelectorAll(".progress");
  progressBars.forEach((bar) => {
    const targetWidth = bar.getAttribute("data-width");
    bar.style.width = "0";
    setTimeout(() => {
      bar.style.width = targetWidth;
    }, 500);
  });

// Typewriter effect
  const text = "A passionate Fullstack Developer crafting web experiences with code & creativity.";
  let i = 0;
  const typer = document.querySelector(".typewriter");
  function typeWriter() {
    if (i < text.length) {
      typer.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  }
  typeWriter();
// AOS animation
  AOS.init({
    duration: 800,
    easing: "slide",
    once: true,
  });
});
