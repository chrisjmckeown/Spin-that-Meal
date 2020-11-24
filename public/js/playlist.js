// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  // Getting references to our form and inputs
  const viewBtn = $('.view-recipe');
  const deleteBtn = $('.delete-recipe');
  const displayRecipe =$('.display-recipe');

  // DELETE Recipe
  deleteBtn.on('click', function(event) {
    const id = $(this).data('id');
    // Send the DELETE request.
    $.ajax(`/api/recipes/${id}`, {
      type: 'DELETE',
    }).then(
        () => {
          // Reload the page to get the updated list
          location.reload();
        },
    );
  });

  // View Recipe
  viewBtn.on('click', function(event) {
    const id = $(this).data('id');
    // Send the GET request.
    $.ajax(`/api/recipe/${id}`, {
      type: 'GET',
    }).then(
        (result) => {
          console.log(result);
          displayRecipe.html('');
          const categories = result.Categories.map(
              (item) => `${item.name}`).join(' ');


          const ingredients = result.RecipeIngredients.map(
              (item) =>
                `<li>${item.Ingredient.name}: 
              ${item.amount} 
              ${item.Measurement.name}</li>`).join(' ');
          displayRecipe.append(
              `<div class="uk-card uk-card-default
            uk-card-hover uk-card-body
            <div class="uk-card-title">
            <h3>Name</h3>
            <p>${result.name}</p>
            <h4>Portion</h4>
            <p>${result.portion}</p>
            <h4>Instruction</h4>
            <p>${result.instruction}</p>
            <h5>Ingredients</h5>
            <ul>
            ${ingredients}
            </ul>
            <h5>Categories</h5>
            ${categories}
            </div></div>`);
        },
    );
  });
});

