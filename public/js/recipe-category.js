$(function() {
  const categoryName = $('#category-name');
  const categoryList = $('#categoryList');
  const addBtn = $('#add');
  const deleteBtn = $('.delete');
  const recipeId = JSON.parse(localStorage.getItem('create-recipe')).id;
  console.log(recipeId);

  addBtn.on('click', function(event) {
    event.preventDefault();
    if (categoryName.val() === '') {
      alert('Input cannot be blank!');
    } else {
      const name = categoryName.val().trim();
      $.ajax(`/api/categories/${name}`, {
        type: 'GET',
      }).then((res) => {
        console.log(res);
        const categoryId = res[0].id;
        console.log('categoryId' + categoryId);
        console.log('recipeId' + recipeId);
        const newRecipeCategory = {
          RecipeId: recipeId,
          CategoryId: categoryId,
        };
        $.ajax('/api/recipe-categories', {
          type: 'POST',
          data: newRecipeCategory,
        }).then((res) => {
          console.log('res', res);
          const recipeCategoryId = res.id;
          const recipeCategoryName = res.name;
          console.log(recipeCategoryId, recipeCategoryName);
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
    console.log('delete' + id);
    $.ajax(`/api/recipe-categories/${id}`, {
      type: 'DELETE',
    }).then(() => {
      $(this).parent().remove();
    });
  });
});
