// small interactions: set current year and simple accessibility
document.addEventListener("DOMContentLoaded", function () {
  const y = new Date().getFullYear();
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = y;

  // Make keyboard accessible focus style for buttons/links (small helper)
  const ctas = document.querySelectorAll(".btn, .learn-more, .read-more");
  ctas.forEach((el) => {
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") el.click();
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    nav.classList.toggle("open");
    const expanded = toggle.classList.contains("active");
    toggle.setAttribute("aria-expanded", expanded);
  });

  // Close nav when clicking a link (on mobile)
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.classList.remove("active");
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", false);
    });
  });

  // Footer year
//   document.getElementById("year").textContent = new Date().getFullYear();
});
