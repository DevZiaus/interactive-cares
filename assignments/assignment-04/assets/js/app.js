// Selecting the necessary DOM elements
const modal = document.getElementById('recipe-modal');
const modalTitle = document.getElementById('modal-title');
const modalImg = document.getElementById('modal-img');
const modalDesc = document.getElementById('modal-instructions');
const searchForm = document.getElementById('search-form');
const recipeContainer = document.getElementById('recipes');

// Intial All Meals
let allMeals = [];

function createMealCard(meal) {
    const description = meal.strInstructions
        ? meal.strInstructions.substring(0, 100) + '...'
        : 'No description available';

    return `
        <div class="shadow hover:shadow-md transition-all duration-300 shadow-primary hover:shadow-hover rounded-xl mb-2.5 flex flex-col h-full">
            <img
                class="rounded-t-xl h-48 w-full object-cover"
                src="${meal.strMealThumb}"
                alt="${meal.strMeal}"
            />
            <div class="mt-2.5 p-2.5 flex flex-col items-start gap-2 flex-grow">
                <h3 class="text-base font-bold">${meal.strMeal}</h3>
                <p class="text-xs font-light flex-grow">
                    ${description}
                </p>
                <button
                    data-id="${meal.idMeal}"
                    class="recipe-btn self-end py-1.5 px-2 text-xs bg-primary text-white rounded hover:bg-hover transition-all duration-300 cursor-pointer"
                >
                    View Details
                </button>
            </div>
        </div>
    `;
}

async function fetchAndRenderMeal(query = '') {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

    try {
        const res = await fetch(apiUrl);
        const data = await res.json();

        // Safety check: ensure 'meals' is always an array
        allMeals = data.meals || [];

        if (allMeals.length < 1) {
            recipeContainer.innerHTML =
                '<p class="text-5xl col-span-full text-center text-red-500">No meals found.</p>';
            return;
        }

        const mealsHtml = allMeals.map((meal) => createMealCard(meal)).join('');
        recipeContainer.innerHTML = mealsHtml;
    } catch (err) {
        console.error(err.message);
        recipeContainer.innerHTML =
            '<p class="col-span-full text-center text-red-500">Failed to load recipes.</p>';
    }
}

// Search Meal
function SearchMeal() {
    const query = document.getElementById('search-query').value;
    fetchAndRenderMeal(query);
}

// Add Event Listener to the PARENT container
recipeContainer.addEventListener('click', (e) => {
    // 1. Check if the clicked element (or its parent) is our button
    const btn = e.target.closest('.recipe-btn');

    // 2. If a button was clicked, get the ID and open modal
    if (btn) {
        const id = btn.dataset.id; // Get the ID from data-id attribute
        handleShowDetails(id);
    }
});

// The handleDetails function stays mostly the same
function handleShowDetails(id) {
    console.log('Button clicked for ID:', id); // Debugging check

    const meal = allMeals.find((item) => item.idMeal === id);

    if (meal) {
        modalTitle.innerText = meal.strMeal;
        modalImg.src = meal.strMealThumb;
        modalDesc.innerText = meal.strInstructions;

        // stops from scrolling in the background
        document.body.classList.add('h-screen', 'overflow-hidden');

        // Show Modal
        modal.classList.remove('hidden');
        modal.classList.add('flex');

        // Animation
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modal.classList.add('opacity-100');
        }, 10);
    } else {
        console.error('Meal not found in data');
    }
}

// Function to Close Modal
function closeModal() {
    document.body.classList.remove('h-screen', 'overflow-hidden');

    // 1. Fade Out
    modal.classList.remove('opacity-100');
    modal.classList.add('opacity-0');

    // 2. Hide after transition (300ms matches duration-300 in HTML)
    setTimeout(() => {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
    }, 300);
}

// Close when clicking outside the white box
window.onclick = function (event) {
    if (event.target === modal) {
        closeModal();
    }
};

// Initaial load Meal
fetchAndRenderMeal();

// Search Meal
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    SearchMeal();
});

// Footer Dynamic Year
function setFooterCurrentYear() {
    const yearSpan = document.querySelector('.year');
    const currentYear = new Date().getFullYear();
    yearSpan.innerText = currentYear;
}

// Set footer dynamic Year
setFooterCurrentYear();

// Back to top
/************************
 * Back to Top Function
 ***********************/
function enableBackToTop() {
    // 1. Select the elements using the IDs from the Tailwind HTML
    const backToTopBtn = document.getElementById('progress-btn');
    const percentText = document.getElementById('percent-text');

    // Safety check
    if (!backToTopBtn) return;

    function updateScrollProgress() {
        // 2. Calculate Scroll Data
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;

        // Prevent division by zero
        if (docHeight === 0) return;

        let scrollPercent = (scrollTop / docHeight) * 100;

        // 3. Clamp values
        if (scrollPercent > 100) scrollPercent = 100;
        if (scrollPercent < 0) scrollPercent = 0;

        // 4. Update CSS Variable (This still works with the inline style I gave you)
        backToTopBtn.style.setProperty('--scroll', `${scrollPercent}%`);

        // 5. Update Text
        if (percentText) {
            percentText.textContent = Math.round(scrollPercent) + '%';
        }

        // 6. Toggle Visibility using Tailwind Classes
        if (scrollTop > 100) {
            // SHOW THE BUTTON
            // Remove the "hidden" state classes
            backToTopBtn.classList.remove(
                'opacity-0',
                'invisible',
                'translate-y-8'
            );

            // Add the "visible" state classes (and animation)
            // Note: 'animate-bounce-custom' requires the config I sent previously.
            // If you didn't add that config, use standard 'animate-bounce' or remove it.
            backToTopBtn.classList.add(
                'opacity-100',
                'visible',
                'translate-y-0',
                'animate-bounce-custom'
            );
        } else {
            // HIDE THE BUTTON
            // Remove the "visible" state classes
            backToTopBtn.classList.remove(
                'opacity-100',
                'visible',
                'translate-y-0',
                'animate-bounce-custom'
            );

            // Add the "hidden" state classes
            backToTopBtn.classList.add(
                'opacity-0',
                'invisible',
                'translate-y-8'
            );
        }
    }

    // Scroll to Top on Click
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    });

    // Add the Event Listener
    window.addEventListener('scroll', updateScrollProgress);

    // Run once on load to set initial state
    updateScrollProgress();
}

// Invoke Back to top
document.addEventListener('DOMContentLoaded', enableBackToTop);
