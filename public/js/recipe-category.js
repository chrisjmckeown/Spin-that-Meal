$(function() {
  const categoryName = $('#category-name');
  const categoryList = $('#categoryList');
  const addBtn = $('#add');
  const deleteBtn = $('.delete');
  const recipeId = JSON.parse(localStorage.getItem('create-recipe')).id;

  addBtn.on('click', function(event) {
    event.preventDefault();
    if (categoryName.val() === '') {
      alert('Input cannot be blank!');
    } else {
      const name = categoryName.val().trim();
      $.ajax(`/api/categories/${name}`, {
        type: 'GET',
      }).then((res) => {
        const categoryId = res[0].id;
        const newRecipeCategory = {
          RecipeId: recipeId,
          CategoryId: categoryId,
        };
        $.ajax('/api/recipe-categories', {
          type: 'POST',
          data: newRecipeCategory,
        }).then((res) => {
          const recipeCategoryId = res.id;
          const recipeCategoryName = res.name;
          categoryList.append(
            `<li>${name} <button class="delete" id="${recipeCategoryId}">Delete</button></li>`,
          );
        });
      });
    }
  });

  deleteBtn.on('click', function(event) {
    event.preventDefault();
    const id = $(this).id;
    $.ajax(`/api/recipe-categories/${id}`, {
      type: 'DELETE',
    }).then(() => {
      $(this).parent().remove();
    });
  });
});
