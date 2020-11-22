// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  // Getting references to our form and inputs
  const createForm = $('#create-form');
  const ingredientName = $('.ingredient-name');
  const editBtn = $('.edit');
  const updateForm = $('.update-form');
  const deleteBtn = $('.delete');

  // ADD new ingredients
  createForm.on('submit', function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    const newItem = {
      name: ingredientName.val().trim(),
    };
    // Send the POST request.
    $.ajax('/api/ingredients', {
      type: 'POST',
      data: newItem,
    }).then(
        () => {
          // Reload the page to get the updated list
          location.reload();
        },
    );
  });

  // EDIT ingredients
  editBtn.on('click', function(event) {
    const id = $(this).data('id');
    location.assign(`/api/ingredients/${id}`);
  });

  updateForm.on('submit', function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    const id = $(this).data('id');
    const updatedItem = {
      id: id,
      name: ingredientName.val().trim(),
    };
    // Send the POST request.
    $.ajax(`/api/ingredients`, {
      type: 'PUT',
      data: updatedItem,
    }).then(
        () => {
          // Reload the page to get the updated list
          location.assign('/api/ingredients');
        },
    );
  });

  // DELETE ingredients
  deleteBtn.on('click', function(event) {
    const id = $(this).data('id');
    // Send the DELETE request.
    $.ajax(`/api/ingredients/${id}`, {
      type: 'DELETE',
    }).then(
        () => {
          // Reload the page to get the updated list
          location.reload();
        },
    );
  });
});
