const modal = document.getElementById('recipe-modal');
const modalTitle = document.getElementById('modal-title');
const modalImg = document.getElementById('modal-img');
const modalDesc = document.getElementById('modal-instructions');

let allMeals = [];

const recipeContainer = document.getElementById('recipes');

function createMealCard(meal) {
    const description = meal.strInstructions
        ? meal.strInstructions.substring(0, 100) + '...'
        : 'No description available';

    return `
        <div class="shadow hover:shadow-md transition-all duration-300 shadow-amber-400 rounded-xl mb-2.5 flex flex-col h-full">
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
                    class="recipe-btn self-end py-1.5 px-2 text-xs bg-amber-400 text-white rounded hover:bg-yellow-500 transition-all duration-300 cursor-pointer"
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
                '<p class="col-span-full text-center text-red-500">No meals found.</p>';
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
        // document.body.classList.add('overflow-hidden', 'h-screen');
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';

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
    // document.body.classList.remove('overflow-hidden', 'h-screen');
    document.body.style.overflow = '';
    document.body.style.height = '';

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

fetchAndRenderMeal();
