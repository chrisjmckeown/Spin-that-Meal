/* eslint-disable require-jsdoc */
$(function() {
  const categoryName = $('#category');
  const categoryList = $('#categoryList');
  const addBtn = $('#add');
  const recipeId = JSON.parse(localStorage.getItem('create-recipe')).id;

  init();

  function init() {
    $.get('/api/categories-list', {
    }).then(
        (result) => {
          $.each(result, function(index, item) {
            categoryName.append(
                `<option value="${item.id}">${item.name}</option>`,
            );
          });
        },
    );
  }


  addBtn.on('click', function(event) {
    event.preventDefault();
    const newRecipeCategory = {
      RecipeId: recipeId,
      CategoryId: categoryName.val(),
    };
    $.ajax('/api/recipe-categories', {
      type: 'POST',
      data: newRecipeCategory,
    }).then((res) => {
      console.log(res);
      const recipeCategoryId = res.id;
      console.log('recipeCategoryId'+recipeCategoryId);
      categoryList.append(
          `<li>${categoryName.children(':selected').text()} 
          <button class="delete-category" id="${recipeCategoryId}">
          Delete</button></li>`,
      );
    });
  });

  $(document).on('click', '.delete-category', function(event) {
    event.preventDefault();
    const id = event.target.id;
    $.ajax(`/api/recipe-categories/${id}`, {
      type: 'DELETE',
    }).then((res) => {
      console.log(res);
      $(this).parent().remove();
    });
  });
});
