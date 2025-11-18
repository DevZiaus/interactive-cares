function navToggle() {
    const navToggler = document.querySelector(".nav-toggler");
    const line1 = document.querySelector(".line-1");
    const line2 = document.querySelector(".line-2");
    const line3 = document.querySelector(".line-3");
    const navMenu = document.querySelector(".nav-menu");

    // Toggle Nav
    navToggler.addEventListener("click", () => {
        line1.classList.toggle("rotate");
        line2.classList.toggle("none");
        line3.classList.toggle("rotate");
        navMenu.classList.toggle("toggled");
    });

    // Close Nav When Click Outside
    document.body.addEventListener("click", (e) => {
        if (
            !e.target.closest(".nav-toggler") &&
            !e.target.closest(".nav-menu")
        ) {
            line1.classList.remove("rotate");
            line2.classList.remove("none");
            line3.classList.remove("rotate");
            navMenu.classList.remove("toggled");
        }
    });

    // Close Nav When Click Link
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            line1.classList.remove("rotate");
            line2.classList.remove("none");
            line3.classList.remove("rotate");
            navMenu.classList.remove("toggled");
        });
    });

    // Close Nav On Scroll
    window.addEventListener("scroll", () => {
        line1.classList.remove("rotate");
        line2.classList.remove("none");
        line3.classList.remove("rotate");
        navMenu.classList.remove("toggled");
    });

    // Close Nav On Resize
    window.addEventListener("resize", () => {
        line1.classList.remove("rotate");
        line2.classList.remove("none");
        line3.classList.remove("rotate");
        navMenu.classList.remove("toggled");
    });

    // Close Nav On Orientation Change
    window.addEventListener("orientationchange", () => {
        line1.classList.remove("rotate");
        line2.classList.remove("none");
        line3.classList.remove("rotate");
        navMenu.classList.remove("toggled");
    });

    // Close Nav On Load
    window.addEventListener("load", () => {
        line1.classList.remove("rotate");
        line2.classList.remove("none");
        line3.classList.remove("rotate");
        navMenu.classList.remove("toggled");
    });

    // Nav Menu Active state
    navMenu.addEventListener("click", (e) => {
        if (e.target.classList.contains("nav-link")) {
            navLinks.forEach((link) => {
                link.classList.remove("active");
            });
            e.target.classList.add("active");
        }
    });
}

function EnableDarkMode() {
    const body = document.body;
    const sunIcon = document.querySelector(".sun-icon");
    const moonIcon = document.querySelector(".moon-icon");

    body.classList.add("dark");
    localStorage.setItem("theme", "dark");
    sunIcon.style.display = "block";
    moonIcon.style.display = "none";
}

function disableDarkMode() {
    const body = document.body;
    const sunIcon = document.querySelector(".sun-icon");
    const moonIcon = document.querySelector(".moon-icon");

    body.classList.remove("dark");
    localStorage.setItem("theme", "light");
    sunIcon.style.display = "none";
    moonIcon.style.display = "block";
}

function themeToggler() {
    const themeToggler = document.querySelector(".theme-toggle");
    const currentTheme = localStorage.getItem("theme");

    // Set Theme on Initial Load
    if (currentTheme === "dark") {
        EnableDarkMode();
    } else {
        disableDarkMode();
    }

    // Toggle Theme
    themeToggler.addEventListener("click", () => {
        const currentTheme = localStorage.getItem("theme");
        if (currentTheme === "dark") {
            disableDarkMode();
        } else {
            EnableDarkMode();
        }
    });
}

function setFooterYear() {
    const currentYear = new Date().getFullYear();
    document.querySelector(".current-year").textContent = currentYear;
}

navToggle();
themeToggler();
setFooterYear();
