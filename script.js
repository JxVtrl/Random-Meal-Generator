let loading = document.getElementById('loading');
let main = document.getElementById('main');
let meal_container = document.getElementById('meal');

// SHOW LOADER
window.onload = () => {
    loading.style = 'display: flex';
    setTimeout(() => {
        loading.style = 'display: none';
        main.classList.remove('hide');
    }, 3000);
}


// Request API
let getMeal_btn = document.getElementById('get_meal');

getMeal_btn.addEventListener('click', () => {
    // Create XMLHttpRequest
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        // transform the XHR Object into json
        .then(res => res.json())
        // create a meal object
        .then(res => createMeal(res.meals[0]))
        // catch any errors
		.catch(e => console.warn(e))
})

const createMeal = meal => {
    console.log(meal);

    const ingredients = []; 

    // create a list of ingredients up to 20
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            // add the ingredient and measure to the array
            ingredients.push(
                `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
            );
        }
        else {
            // break if has no more ingredients
            break;
        }
    }

    const newInnerHTML = `
        <div class="row">
			<div class="columns five">
				<img src="${meal.strMealThumb}" alt="Meal Image" id="mealImg">

                <div id="mealInfo">
                    ${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ''}
                    ${meal.strCategory ? `<p><strong>Category:</strong> ${meal.strCategory}</p>` : ''}
                    ${meal.strTags ? `<p><strong>Tags:</strong> ${meal.strTags.split(',').join(', ')}</p>` : ''}
                </div>
                <div id="ingredients-container">
                    <h5>Ingredients:</h5>
                    <ul id="ingredients-list">
                        ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul>
                </div>
			</div>
			<div id="instruct-container" class="columns seven">
				<h3>${meal.strMeal}</h3>
				<p>${meal.strInstructions}</p>
			</div>
		</div>

		${meal.strYoutube ? `
		<div class="row">
			<h5 id="video-title">Video Recipe</h5>
			<div class="videoWrapper">
				<iframe width="420" height="315"
				src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
				</iframe>
			</div>
		</div>`	: ''}

    `
    meal_container.innerHTML = newInnerHTML;
}