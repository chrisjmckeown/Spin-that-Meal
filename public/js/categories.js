// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  // Getting references to our form and inputs
  const createForm = $('#create-form');
  const categoryName = $('.category-name');
  const editBtn = $('.edit');
  const updateForm = $('.update-form');
  const deleteBtn = $('.delete');

  // ADD new category
  createForm.on('submit', function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    const newCategory = {
      name: categoryName.val().trim(),
    };
    // Send the POST request.
    $.ajax('/api/categories', {
      type: 'POST',
      data: newCategory,
    }).then(
        () => {
          // Reload the page to get the updated list
          location.reload();
        },
    );
  });

  // EDIT Category
  editBtn.on('click', function(event) {
    const id = $(this).data('id');
    location.assign(`/api/categories/${id}`);
  });

  updateForm.on('submit', function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    const id = $(this).data('id');
    const updatedCategory = {
      id: id,
      name: categoryName.val().trim(),
    };
    // Send the POST request.
    $.ajax(`/api/categories`, {
      type: 'PUT',
      data: updatedCategory,
    }).then(
        () => {
          // Reload the page to get the updated list
          location.assign('/api/categories');
        },
    );
  });

  // DELETE Category
  deleteBtn.on('click', function(event) {
    const id = $(this).data('id');
    // Send the DELETE request.
    $.ajax(`/api/categories/${id}`, {
      type: 'DELETE',
    }).then(
        () => {
          // Reload the page to get the updated list
          location.reload();
        },
    );
  });
});
