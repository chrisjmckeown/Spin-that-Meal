// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  // Getting references to our form and inputs
  const createForm = $('#create-form');
  const recipeName = $('.recipe-name');
  const recipeInstruction = $('.recipe-instruction');
  const recipePortion = $('.recipe-portion');
  const editBtn = $('.edit');
  const updateForm = $('.update-form');
  const deleteBtn = $('.delete');

  let userId;

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
  }

  // ADD new category
  createForm.on('submit', function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    $('#alert .msg').text('');
    $('#alert').fadeOut(0);
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
          // Reload the page to get the updated list

          location.reload();
        },
    );
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
});
