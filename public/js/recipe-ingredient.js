/* eslint-disable require-jsdoc */
// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  // Getting references to our form and inputs
  const save = $('#save');
  const recipeIngredientAmount = $('#recipe-ingredient-amount');
  // const editBtn = $(".edit");
  // const updateForm = $(".update-form");
  const recipeIngiredientName = $('#recipe-ingredient-name');
  const recipeId = JSON.parse(localStorage.getItem('create-recipe')).id;
  const measurement = $('#measurement');
  const type = $('#type');
  const ingredientList = $('#ingredientList');

  init();

  function init() {
    // Send the POST request.
    $.ajax('/api/types', {
      type: 'GET',
    }).then((res) => {
      console.log('type', res);
      res.forEach((item) => {
        type.append(
            `<option value="${item.id}">${item.name}</option>`,
        );
      });
    });
    $.ajax('/api/measurements', {
      type: 'GET',
    }).then((res) => {
      console.log('measurement', res);
      res.forEach((item) => {
        measurement.append(
            `<option value="${item.id}">${item.name}</option>`,
        );
      });
    });
  }

  // ADD new category
  save.on('click', function(event) {
    if (recipeIngredientAmount.val() === ''||
    recipeIngiredientName.val() === '') {
      alert('Please enter a valid name, and Amount.');
    } else {
    // Make sure to preventDefault on a click event.
      event.preventDefault();
      const newIngredient = {
        name: recipeIngiredientName.val().trim(),
        TypeId: type.val(),
      };
      // Send the POST request.
      $.ajax(`/api/ingredients/`, {
        type: 'POST',
        data: newIngredient,
      }).then(
          (res) => {
            console.log('newingredient', res);
            const ingredientId = res.id;
            const newRecipeIngredient = {
              amount: recipeIngredientAmount.val().trim(),
              IngredientId: ingredientId,
              MeasurementId: measurement.val(),
              RecipeId: recipeId,
            };
            $.ajax('/api/recipe-ingredients', {
              type: 'POST',
              data: newRecipeIngredient,
            }).then((res) => {
              console.log('newRecipeIngredient', res);
              const recipeIngredientId = res.id;
              ingredientList.append(
                  `<li>${newIngredient.name} 
                  ${newRecipeIngredient.amount}
                  ${measurement.children(':selected').text()} 
                  <button class="delete-ingredient" id="${recipeIngredientId}">
                  Delete</button></li>`,
              );
              recipeIngiredientName.val('');
              recipeIngredientAmount.val('');
            });
          },
      );
    }
  })
  ;

  // DELETE Category
  $(document).on('click', '.delete-ingredient', function(event) {
    event.preventDefault();
    const id = event.target.id;
    // Send the DELETE request.
    $.ajax(`/api/recipe-ingredients/${id}`, {
      type: 'DELETE',
    }).then(
        (res) => {
          console.log(res);
          // Reload the page to get the updated list
          $(this).parent().remove();
        },
    );
  });
});
