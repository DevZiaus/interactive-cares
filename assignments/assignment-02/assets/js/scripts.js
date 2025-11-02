document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".main-nav");

    toggle.addEventListener("click", () => {
        toggle.classList.toggle("toggled");
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

    // Menu Link Active State Management
    nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            nav.querySelectorAll("a").forEach((navLink) => {
                navLink.classList.remove("active");
            });
            link.classList.add("active");
        });
    });
});
