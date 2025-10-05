document.addEventListener('DOMContentLoaded', () => {
    // Select the necessary elements
    const slider = document.querySelector(".slider");
    const slides = document.querySelectorAll(".featured-story");
    const next = document.querySelector(".next");
    const prev = document.querySelector(".prev");
    const currentYear = document.getElementById('current-year');
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');



    // Add click event listener to the toggle button
    menuToggle.addEventListener('click', () => {
        // Toggle the 'active' class on the navigation menu
        // The CSS handles showing/hiding based on this class
        mainNav.classList.toggle('active');

        // Optional: Update the accessibility attribute
        const isExpanded = mainNav.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);

        // Optional: Change the button text/icon (e.g., 'X' for close)
        if (isExpanded) {
             menuToggle.textContent = '✕'; // Times symbol for close
        } else {
             menuToggle.textContent = '☰'; // Hamburger for menu
        }
    });

    //Set year
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    //Slider
    let index = 0;
    const total = slides.length;

    function showSlide(i) {
        slider.style.transform = `translateX(-${i * 100}%)`;
    }

    next.addEventListener("click", () => {
        index = (index + 1) % total;
        showSlide(index);
    });

    prev.addEventListener("click", () => {
        index = (index - 1 + total) % total;
        showSlide(index);
    });

    // Optional auto-slide every 5 seconds
    setInterval(() => {
        index = (index + 1) % total;
        showSlide(index);
    }, 5000);
});
