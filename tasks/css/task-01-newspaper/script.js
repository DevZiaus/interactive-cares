document.addEventListener('DOMContentLoaded', () => {
    // Select the necessary elements
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
});