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

// Typing Effect Function
function startTypingEffect(selector, textArray) {
    const textElement = document.querySelector(selector);

    // Safety check: stop if element doesn't exist
    if (!textElement) return;

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = textArray[wordIndex];

        // 1. Handle Typing vs Deleting logic
        if (isDeleting) {
            textElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        // 2. Determine Typing Speed
        let typeSpeed = 100; // Normal typing speed

        if (isDeleting) {
            typeSpeed = 50; // Deleting is faster
        }

        // 3. Check bounds to switch states
        if (!isDeleting && charIndex === currentWord.length) {
            // Finished typing the word, pause before deleting
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting, move to next word
            isDeleting = false;
            wordIndex++;

            // Loop back to start
            if (wordIndex >= textArray.length) {
                wordIndex = 0;
            }
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typeSpeed);
    }

    // Initialize the loop
    type();
}

//Invoke the startTypingEffect function on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    const myTitles = [
        "Full-stack developer",
        "MERN Stack Developer",
        "Front-End Developer",
        "Back-End Developer",
    ];

    startTypingEffect(".intro-role", myTitles);
});

//Invoke navToggle function
navToggle();

// Invoke themeToggler function
themeToggler();

// invoke setFooterYear function
setFooterYear();
