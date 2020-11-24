// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  // Getting references to our form and inputs
  const createForm = $('#create-form');
  const ingredientName = $('.ingredient-name');
  const editBtn = $('.edit');
  const updateForm = $('.update-form');
  const deleteBtn = $('.delete');
  const typeList = $('.type-list');

  load();

  /**
* Loads list of types.
*/
  function load() {
    $.get('/api/types', {
    }).then(
        (result) => {
          $.each(result, function(index, item) {
            let found = false;
            Array.from(typeList[0].options).forEach((c) => {
              if (c.value == `${item.id}`) {
                found = true;
              }
            });
            if (!found) {
              typeList.append(
                  `<option value="${item.id}">${item.name}</option>`,
              );
            }
          });
        },
    );
  }

  // ADD new ingredients
  createForm.on('submit', function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    $('#alert .msg').text('');
    $('#alert').fadeOut(0);
    const newItem = {
      name: ingredientName.val().trim(),
      TypeId: typeList.val(),
    };
    if (!newItem.name || !newItem.TypeId) {
      $('#alert .msg').text('Please enter a valid Name and Type.');
      $('#alert').fadeIn(500);
      return;
    }
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
    $('#alert .msg').text('');
    $('#alert').fadeOut(0);
    const id = $(this).data('id');
    const updatedItem = {
      id: id,
      name: ingredientName.val().trim(),
      TypeId: typeList.val(),
    };
    if (!updatedItem.name || !updatedItem.TypeId) {
      $('#alert .msg').text('Please enter a valid Name and Type.');
      $('#alert').fadeIn(500);
      return;
    }
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
