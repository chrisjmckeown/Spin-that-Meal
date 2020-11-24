// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  // Getting references to our form and inputs
  const createForm = $('#create-form');
  const measurementName = $('.measurement-name');
  const editBtn = $('.edit');
  const updateForm = $('.update-form');
  const deleteBtn = $('.delete');

  // ADD new measurement
  createForm.on('click', function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    $('#alert .msg').text('');
    $('#alert').fadeOut(0);
    const newItem = {
      name: measurementName.val().trim(),
    };
    if (!newItem.name) {
      $('#alert .msg').text('Please enter a valid Name.');
      $('#alert').fadeIn(500);
      return;
    }
    // Send the POST request.
    $.ajax('/api/measurements', {
      type: 'POST',
      data: newItem,
    }).then(
        () => {
          // Reload the page to get the updated list
          location.reload();
        },
    );
  });

  // EDIT measurements
  editBtn.on('click', function(event) {
    const id = $(this).data('id');
    location.assign(`/api/measurements/${id}`);
  });

  updateForm.on('submit', function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    $('#alert .msg').text('');
    $('#alert').fadeOut(0);
    const id = $(this).data('id');
    const updatedItem = {
      id: id,
      name: measurementName.val().trim(),
    };
    if (!updatedItem.name) {
      $('#alert .msg').text('Please enter a valid Name.');
      $('#alert').fadeIn(500);
      return;
    }
    // Send the POST request.
    $.ajax(`/api/measurements`, {
      type: 'PUT',
      data: updatedItem,
    }).then(
        () => {
          // Reload the page to get the updated list
          location.assign('/api/measurements');
        },
    );
  });

  // DELETE measurement
  deleteBtn.on('click', function(event) {
    const id = $(this).data('id');
    // Send the DELETE request.
    $.ajax(`/api/measurements/${id}`, {
      type: 'DELETE',
    }).then(
        () => {
          // Reload the page to get the updated list
          location.reload();
        },
    );
  });
});
