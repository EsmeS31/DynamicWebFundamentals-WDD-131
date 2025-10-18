// Sample recipes data
const recipes = [
    {
        name: "Apple Crisp",
        description: "This apple crisp recipe is a simple yet delicious fall dessert that's great served warm with vanilla ice cream.",
        image: "images/apple-crisp.jpg",
        rating: 4,
        tags: ["dessert"],
        ingredients: ["apples", "oats", "brown sugar", "cinnamon", "butter"]
    },
    {
        name: "Chocolate Chip Cookies",
        description: "Classic chocolate chip cookies that are soft, chewy, and loaded with chocolate chips.",
        image: "images/chocolate-chip-cookies.jpg",
        rating: 5,
        tags: ["dessert"],
        ingredients: ["flour", "butter", "sugar", "chocolate chips", "vanilla"]
    },
    {
        name: "Chicken Curry",
        description: "A flavorful and aromatic chicken curry with a perfect blend of spices and creamy coconut milk.",
        image: "images/chicken-curry.webp",
        rating: 4,
        tags: ["main course"],
        ingredients: ["chicken", "coconut milk", "curry powder", "onions", "garlic"]
    },
    {
        name: "Black Beans and Rice",
        description: "A hearty and nutritious dish combining black beans with perfectly seasoned rice.",
        image: "images/black-beans-and-rice.jpg",
        rating: 3,
        tags: ["main course"],
        ingredients: ["black beans", "rice", "onions", "garlic", "cumin"]
    }
];

// Function to generate random number
function getRandomNumber(num) {
    return Math.floor(Math.random() * num);
}

// Function to get random recipe from array
function getRandomListEntry(array) {
    const randomIndex = getRandomNumber(array.length);
    return array[randomIndex];
}

// Template function for tags
function tagsTemplate(tags) {
    let html = '';
    tags.forEach(tag => {
        html += `<p class="category">${tag}</p>`;
    });
    return html;
}

// Template function for rating stars
function ratingTemplate(rating) {
    let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
    
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
        } else {
            html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
        }
    }
    
    html += `</span>`;
    return html;
}

// Template function for recipe display
function recipeTemplate(recipe) {
    return `
        <section class="recipie">
            <img src="${recipe.image}" alt="${recipe.name}" class="recipie-img">
            <div class="recipe-content">
                <div class="tags">
                    ${tagsTemplate(recipe.tags)}
                </div>
                <h2>${recipe.name}</h2>
                <p class="description">${recipe.description}</p>
                ${ratingTemplate(recipe.rating)}
            </div>
        </section>
    `;
}

// Function to render recipes
function renderRecipes(recipeList) {
    const main = document.querySelector('main');
    let html = '';
    
    recipeList.forEach(recipe => {
        html += recipeTemplate(recipe);
    });
    
    main.innerHTML = html;
}

// Function to filter recipes
function filterRecipes(query) {
    const filtered = recipes.filter(recipe => {
        const searchTerm = query.toLowerCase();
        return recipe.name.toLowerCase().includes(searchTerm) ||
               recipe.description.toLowerCase().includes(searchTerm) ||
               recipe.tags.find(tag => tag.toLowerCase().includes(searchTerm)) ||
               recipe.ingredients.find(ingredient => ingredient.toLowerCase().includes(searchTerm));
    });
    
    return filtered.sort((a, b) => a.name.localeCompare(b.name));
}

// Search handler function
function searchHandler(e) {
    e.preventDefault();
    const searchInput = document.getElementById('search-query');
    const query = searchInput.value.toLowerCase();
    
    if (query.trim() === '') {
        // If search is empty, show random recipe
        const randomRecipe = getRandomListEntry(recipes);
        renderRecipes([randomRecipe]);
    } else {
        // Filter and display results
        const filteredRecipes = filterRecipes(query);
        renderRecipes(filteredRecipes);
    }
}

// Initialize function
function init() {
    // Get a random recipe
    const recipe = getRandomListEntry(recipes);
    // Render the recipe
    renderRecipes([recipe]);
    
    // Add event listener to search form
    const searchForm = document.querySelector('form');
    searchForm.addEventListener('submit', searchHandler);
}

// Initialize when page loads
init();
