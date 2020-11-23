// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  const PORT = 8080; // process.env.PORT ||
  const socket = io.connect(`http://localhost:${PORT}`);
  // Getting references to our form and inputs
  const save = $('#save');
  const recipeIngredientAmount = $('#recipe-ingredient-amount');
  // const editBtn = $(".edit");
  // const updateForm = $(".update-form");
  const recipeIngiredientName = $('#recipe-ingredient-name');
  const deleteBtn = $('.delete');
  const recipeId = JSON.parse(localStorage.getItem('create-recipe')).id;
  const measurement = $('#measurement');
  const type = $('#type');
  const ingredientList = $('#ingredientList');

  init();

  // eslint-disable-next-line require-jsdoc
  function init() {
    $.ajax('api/types', {
      type: 'GET',
    }).then((res) => {
      res.forEach((item, index) => {
        type.append(
            `<option value="${item.id}>${item.name}</option>`,
        );
        $.ajax('api/measurements', {
          type: 'GET',
        }).then((res) => {
          res.forEach((item, index) => {
            measurement.append(
                `<option value="${item.id}>${item.name}</option>`,
            );
          });
        });
      });
    });
  }

  // ADD new category
  save.on('submit', function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    if (!recipeIngiredientName.val() || !recipeIngredientAmount.val() ||
      !measurement.val() || !type.val()) {
      alert('please input or select all field');
    } else {
      const newIngredient = {
        name: recipeIngiredientName.val().trim(),
        TypeId: type.val(),
      };
      // Send the POST request.
      $.ajax(`/api/recipe-ingredients/${name}`, {
        type: 'POST',
        data: newIngredient,
      }).then(
          (res) => {
            const ingredientId = res[0].id;
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
              const recipeIngredientId = res.id;
              ingredientList.append(
                  `<li>${newIngredient.name} ${type.text()} 
                  ${newRecipeIngredient.amount}${measurement.text()} 
                  <button class="delete" id="${recipeIngredientId}">
                  Delete</button></li>`,
              );
            });
          },
      );
    }
  });

  // DELETE Category
  deleteBtn.on('click', function(event) {
    const id = $(this).id;
    // Send the DELETE request.
    $.ajax(`/api/recipe-ingredients/${id}`, {
      type: 'DELETE',
    }).then(
        () => {
        // Reload the page to get the updated list
          $(`#${id}`).parent().remove();
        },
    );
  });
});
