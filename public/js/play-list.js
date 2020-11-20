// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  // Getting references to our form and inputs
  const createForm = $('#create-form');
  const playListName = $('.play-list-name');
  const editBtn = $('.edit');
  const updateForm = $('.update-form');
  const deleteBtn = $('.delete');
  const {id} = JSON.parse(localStorage.getItem('user-details'));

  // ADD new category
  createForm.on('submit', function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    const newPlayList = {
      name: playListName.val().trim(),
      UserId: id,
    };
    // Send the POST request.
    $.ajax('/api/play-lists', {
      type: 'POST',
      data: newPlayList,
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
    location.assign(`/api/play-lists/${id}`);
  });

  updateForm.on('submit', function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    const id = $(this).data('id');
    const updatedPlayLists = {
      id: id,
      name: playListName.val().trim(),
      UserId: id,
    };
    // Send the POST request.
    $.ajax(`/api/play-lists`, {
      type: 'PUT',
      data: updatedPlayLists,
    }).then(
        () => {
          // Reload the page to get the updated list
          location.assign('/api/play-lists');
        },
    );
  });

  // DELETE Category
  deleteBtn.on('click', function(event) {
    const id = $(this).data('id');
    // Send the DELETE request.
    $.ajax(`/api/play-lists/${id}`, {
      type: 'DELETE',
    }).then(
        () => {
          // Reload the page to get the updated list
          location.reload();
        },
    );
  });
});
