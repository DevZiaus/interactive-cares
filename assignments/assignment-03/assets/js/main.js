/********************
 * Preloader
 *******************/
window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader");
    if (preloader) {
        preloader.style.opacity = "0";
        setTimeout(() => {
            preloader.style.display = "none";
        }, 500);
    }
});

/********************
 * NavToggle Function
 *******************/
function navToggle() {
    const navToggler = document.querySelector(".nav-toggler");
    const line1 = document.querySelector(".line-1");
    const line2 = document.querySelector(".line-2");
    const line3 = document.querySelector(".line-3");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    // Get all sections with IDs that match the nav links
    const sections = document.querySelectorAll("section[id]");

    // Toggle Nav
    navToggler.addEventListener("click", () => {
        line1.classList.toggle("rotate");
        line2.classList.toggle("none");
        line3.classList.toggle("rotate");
        navMenu.classList.toggle("toggled");
    });

    // Close Nav Function
    function closeNav() {
        line1.classList.remove("rotate");
        line2.classList.remove("none");
        line3.classList.remove("rotate");
        navMenu.classList.remove("toggled");
    }

    // Close Nav When Click Outside
    document.body.addEventListener("click", (e) => {
        if (
            !e.target.closest(".nav-toggler") &&
            !e.target.closest(".nav-menu")
        ) {
            closeNav();
        }
    });

    // Close Nav When Click Link
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            closeNav();
        });
    });

    // Remove active class from all links
    const removeAllActive = () => {
        navLinks.forEach((link) => {
            link.classList.remove("active");
        });
    };

    // Nav Menu Active state
    navMenu.addEventListener("click", (e) => {
        if (e.target.classList.contains("nav-link")) {
            removeAllActive();
            e.target.classList.add("active");
        }
    });

    // Scroll-Spy Logic for Active State
    const activateLinkOnScroll = () => {
        let current = "";

        // 1. Determine the current section
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;

            // Check if the current scroll position is within this section
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute("id");
            }
        });

        // 2. Update the active state on the navigation menu
        removeAllActive();

        // Only proceed if a section ID was successfully found
        if (current) {
            navLinks.forEach((link) => {
                // Get the hash (e.g., "#home") and remove the "#" to compare with 'current' ("home")
                const linkHashId = link.hash.substring(1);

                if (linkHashId === current) {
                    link.classList.add("active");
                }
            });
        }
    };

    // Close Nav On Scroll
    window.addEventListener("scroll", () => {
        // Close Nav logic
        closeNav();

        //Run Scroll-Spy
        activateLinkOnScroll();
    });

    // Close Nav On Resize
    window.addEventListener("resize", () => {
        closeNav();
    });

    // Close Nav On Orientation Change
    window.addEventListener("orientationchange", () => {
        closeNav();
    });

    // Close Nav On Load
    window.addEventListener("load", () => {
        closeNav();

        // Run Scroll-Spy
        activateLinkOnScroll();
    });

    // Run on initial load just in case the user loads the page scrolled down
    activateLinkOnScroll();
}

/***********************************
 * Light/Dark Theme Toggler Function
 **********************************/
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

/**********************************
 * Set Footer Current Year Function
 *********************************/
function setFooterYear() {
    const currentYear = new Date().getFullYear();
    document.querySelector(".current-year").textContent = currentYear;
}

/************************
 * Typing Effect Function
 ***********************/
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

/************************
 * Back to Top Function
 ***********************/
function enableBackToTop() {
    const backToTopBtnOuter = document.querySelector(".back-to-top-outer");
    const backToTopBtn = document.querySelector(".back-to-top");
    const percentText = backToTopBtn.querySelector(".percent");
    if (!backToTopBtn) return;

    function updateScrollProgress() {
        // 2. Calculate Scroll Data
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;

        // Prevent division by zero if page has no scroll
        if (docHeight === 0) return;

        let scrollPercent = (scrollTop / docHeight) * 100;

        // 3. Clamp values
        if (scrollPercent > 100) scrollPercent = 100;
        if (scrollPercent < 0) scrollPercent = 0;

        // 4. Update CSS Variable (for the background fill)
        backToTopBtnOuter.style.setProperty("--scroll", `${scrollPercent}%`);

        // 5. Update Text (if the element exists)
        if (percentText) {
            percentText.textContent = Math.round(scrollPercent) + "%";
        }

        // 6. Toggle Visibility
        if (scrollTop > 100) {
            backToTopBtnOuter.classList.add("active");
            backToTopBtn.classList.add("active");
        } else {
            backToTopBtnOuter.classList.remove("active");
            backToTopBtn.classList.remove("active");
        }
    }

    // Scroll to Top on Click
    backToTopBtn.addEventListener("click", (e) => {
        e.preventDefault();

        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    // Add the Event Listener
    window.addEventListener("scroll", updateScrollProgress);

    // Run once on load to set initial state
    updateScrollProgress();
}

/**********************
 * Function Invokations
 *********************/
//Invoke navToggle function
navToggle();

// Invoke themeToggler function
themeToggler();

// invoke setFooterYear function
setFooterYear();

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

// Invoke enableBackToTop function on DOMContentLoaded
document.addEventListener("DOMContentLoaded", enableBackToTop);
