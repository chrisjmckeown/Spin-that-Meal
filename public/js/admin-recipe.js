// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  // Getting references to our form and inputs
  const createForm = $('.btn-add-recipe');
  const recipeName = $('.recipe-name');
  const recipeInstruction = $('.recipe-instruction');
  const recipePortion = $('.recipe-portion');
  const editBtn = $('.edit');
  const updateForm = $('.update-form');
  const deleteBtn = $('.delete');
  const categoryList = $('.category-dropdown-list');
  const addCategoryBtn = $('.btn-add-category');
  const recipeCategories = $('.recipe-Categories');


  const ingredientList = $('.ingredient-dropdown-list');
  const addIngredientBtn = $('.btn-add-ingredient');
  const recipeIngredients = $('.recipe-Ingredients');

  let userId;

  let measurements = document.createElement('div');
  load();

  /**
* Loads existing chat messages.
*/
  function load() {
    // Send the POST request.
    $.get('/api/member', {
    }).then(
        (result) => {
          userId = result.id;
        },
    );
    $.get('/api/categories-list', {
    }).then(
        (result) => {
          $.each(result, function(index, item) {
            categoryList.append(
                `<option value="${item.id}">${item.name}</option>`,
            );
          });
        },
    );
    $.get('/api/ingredients-list', {
    }).then(
        (result) => {
          $.each(result, function(index, item) {
            ingredientList.append(
                `<option value="${item.id}">${item.name}</option>`,
            );
          });
        },
    );
    $.get('/api/measurements', {
    }).then(
        (result) => {
          measurements = `<div class="uk-width-expand">
            <select class="uk-select ingredient-dropdown-list">`;
          $.each(result, function(index, item) {
            measurements += `<option value="${item.id}">${item.name}</option>`;
          });
          measurements += `</select></div>`;
        },
    );
  }

  // ADD new category
  createForm.on('click', function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    $('#alert .msg').text('');
    $('#alert').fadeOut(0);
    if (!$('.recipe-Categories li').length) {
      $('#alert .msg').text(
          'Please select at least 1 Category.',
      );
      $('#alert').fadeIn(500);
      return;
    }
    if (!$('.recipe-Ingredients li').length) {
      $('#alert .msg').text(
          'Please select at least 1 Ingredient.',
      );
      $('#alert').fadeIn(500);
      return;
    }
    const newItem = {
      name: recipeName.val().trim(),
      instruction: recipeInstruction.val().trim(),
      portion: recipePortion.val().trim(),
      UserId: userId,
    };
    if (!newItem.name || !newItem.instruction || !newItem.portion) {
      $('#alert .msg').text(
          'Please enter a valid Name, Instruction and Portion.',
      );
      $('#alert').fadeIn(500);
      return;
    }
    // Send the POST request.
    $.ajax('/api/recipes', {
      type: 'POST',
      data: newItem,
    }).then(
        (result) => {
          $('.recipe-Categories li').each(function() {
            const id = $(this).data('id');

            const newItemCategories = {
              RecipeId: result.id,
              CategoryId: id,
            };
            // Send the POST request.
            $.ajax('/api/recipe-categories', {
              type: 'POST',
              data: newItemCategories,
            }).then(
                () => {
                  $('.recipe-Ingredients li').each(function() {
                    const id = $(this).data('id');
                    const quantity = $(this)[0].childNodes[0].
                        childNodes[3].childNodes[1].value.trim();
                    const measurementId = $(this)[0].childNodes[0].
                        childNodes[5].childNodes[1].selectedOptions[0].value;
                    const newItemIngredients = {
                      amount: quantity,
                      RecipeId: result.id,
                      MeasurementId: measurementId,
                      IngredientId: id,
                    };
                    // Send the POST request.
                    $.ajax('/api/recipe-ingredients', {
                      type: 'POST',
                      data: newItemIngredients,
                    }).then(
                        () => {
                          location.reload();
                        });
                  },
                  );
                });
          },
          );
        });
  });

  // EDIT Category
  editBtn.on('click', function(event) {
    const id = $(this).data('id');
    location.assign(`/api/recipes/${id}`);
  });

  updateForm.on('submit', function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    $('#alert .msg').text('');
    $('#alert').fadeOut(0);
    const id = $(this).data('id');
    const updatedItem = {
      id: id,
      name: recipeName.val().trim(),
      instruction: recipeInstruction.val().trim(),
      portion: recipePortion.val().trim(),
      UserId: userId,
    };
    if (!updatedItem.name || !updatedItem.instruction || !updatedItem.portion) {
      $('#alert .msg').text(
          'Please enter a valid Name, Instruction and Portion.',
      );
      $('#alert').fadeIn(500);
      return;
    }
    // Send the POST request.
    $.ajax(`/api/recipes`, {
      type: 'PUT',
      data: updatedItem,
    }).then(
        () => {
          // Reload the page to get the updated list
          location.assign('/api/recipes');
        },
    );
  });

  // DELETE Category
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

  addCategoryBtn.on('click', function(event) {
    event.preventDefault();
    const categoryId = categoryList.val();
    const categoryName = categoryList.find('option:selected').text();
    recipeCategories.append(
        `<li data-id="${categoryId}"><div class="uk-grid" uk-grid>
        <div class="uk-width-expand">
        ${categoryName}
        </div>
        <div>
        <button class="uk-button btn-flex-size remove-recipe-category"
        data-id="${categoryId}">
        Remove</button>
        </div>
        </div>
        </li>`
        ,
    );
  });

  $(document).on('click', '.remove-recipe-category', function(event) {
    event.preventDefault();
    event.target.parentElement.parentElement.parentElement.remove();
  });

  addIngredientBtn.on('click', function(event) {
    event.preventDefault();
    const ingredientId = ingredientList.val();
    const ingredientName = ingredientList.find('option:selected').text();
    recipeIngredients.append(
        `<li data-id="${ingredientId}"><div class="uk-grid" uk-grid>
        <div class="uk-width-expand">
        ${ingredientName}
        </div>
        <div class="uk-width-expand">
        <input class="uk-input amount" type="number" 
        placeholder="quantity" min="1" value="1">
        </div>
        ${measurements}
        <div>
        <button class="uk-button btn-flex-size remove-recipe-ingredient"
        data-id="${ingredientId}">
        Remove</button>
        </div>
        </div>
        </li>`
        ,
    );
  });

  $(document).on('click', '.remove-recipe-ingredient', function(event) {
    event.preventDefault();
    event.target.parentElement.parentElement.parentElement.remove();
  });
});
