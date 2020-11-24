$(function() {
  const saveRecipe = $('#saveRecipe');
  const recipeName = $('#recipe-name');
  const recipePortion = $('#recipe-portion');
  const recipeInstruction = $('#recipe-instruction');
  const {id, UserId} = JSON.parse(localStorage.getItem('create-recipe'));

  saveRecipe.on('click', function(event) {
    event.preventDefault();
    if (recipeName.val() === '' ||
    recipePortion.val() === '' ||
    recipeInstruction.val() === '') {
      alert('Please enter a valid Name, Instruction and Portion.');
    } else {
      const updateRecipe = {
        id: id,
        name: recipeName.val().trim(),
        instruction: recipeInstruction.val().trim(),
        portion: recipePortion.val().trim(),
        UserId: UserId,
      };
      $.ajax(`/api/recipes/${id}`, {
        type: 'PUT',
        data: updateRecipe,
      }).then(
          (result) => {
            // Reload the page to get the updated list
            window.location.replace('/recipe');
          },
      );
    }
  });
});
