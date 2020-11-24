// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  // Getting references to our form and inputs
  const createForm = $('#create-form');
  const playListName = $('.play-list-name');
  const editBtn = $('.edit');
  const updateForm = $('.update-form');
  const deleteBtn = $('.delete');

  const recipeListPlaylist = $('.recipe-list-playlist');
  const userListPlaylist = $('.user-name-playlist');
  const addRecipePlaylistBtn = $('.add-recipe-playlist');
  const allLinkedRecipes = $('.all-linked-recipes');
  const removeRecipePlaylist = $('.remove-recipe-playlist');
  let userId;
  let playListUserId;

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


    $.get('/api/recipes-in-list', {
    }).then(
        (result) => {
          $.each(result.Recipe, function(index, item) {
            recipeListPlaylist.append(
                `<option value="${item.id}">${item.name}</option>`);
          });
        },
    );
    $.get('/api/recipe-playlist', {
    }).then(
        (result) => {
          $.each(result.PlayList, function(index, item) {
            allLinkedRecipes.append(
                `<li data-id="${item.Recipe.id}">` +
               `<div class="uk-grid" uk-grid>` +
               `<div class="uk-width-expand">` +
                  `${item.Recipe.name}` +
                  ` </div>` +
                `<div>` +
                `<button class="uk-button btn-flex-size ` +
                `remove-recipe-playlist" ` +
                `recipeid="${item.Recipe.id}"` +
                `playlistid="${item.PlayList.id}">Remove</button>` +
                `</div>` +
                `</div>` +
                `</li>`,
            );
          });
          playListUserId =result.PlayList[0].PlayList.UserId;
          $.get('/api/users-in-list', {
          }).then(
              (result) => {
                $.each(result.User, function(index, item) {
                  userListPlaylist.append(
                      `<option value="${item.id}">` +
                      `${item.firstName} ${item.lastName}</option>`,
                  );
                });
                userListPlaylist.val(playListUserId);
              },
          );
        },
    );
  }

  // ADD new Playlist
  createForm.on('submit', function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    $('#alert .msg').text('');
    $('#alert').fadeOut(0);
    const newItem = {
      name: playListName.val().trim(),
      UserId: userId,
    };
    if (!newItem.name) {
      $('#alert .msg').text('Please enter a valid Name.');
      $('#alert').fadeIn(500);
      return;
    }
    // Send the POST request.
    $.ajax('/api/play-lists', {
      type: 'POST',
      data: newItem,
    }).then(
        () => {
          // Reload the page to get the updated list
          location.reload();
        },
    );
  });

  // EDIT Playlist
  editBtn.on('click', function(event) {
    const id = $(this).data('id');
    location.assign(`/api/play-lists/${id}`);
  });

  updateForm.on('submit', function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    $('#alert .msg').text('');
    $('#alert').fadeOut(0);
    const id = $(this).data('id');
    const updatedItem = {
      id: id,
      name: playListName.val().trim(),
      UserId: userListPlaylist.val(),
    };
    if (!updatedItem.name) {
      $('#alert .msg').text('Please enter a valid Name.');
      $('#alert').fadeIn(500);
      return;
    }
    // Send the PUT request.
    $.ajax(`/api/play-lists`, {
      type: 'PUT',
      data: updatedItem,
    }).then(
        () => {
          // Reload the page to get the updated list
          location.assign('/api/play-lists');
        },
    );
  });

  // DELETE Playlist
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

  addRecipePlaylistBtn.on('click', function(event) {
    event.preventDefault();
    const playlistId = updateForm.data('id');
    const recipeId = recipeListPlaylist.val();
    const newRecipePlayList = {
      PlayListId: playlistId,
      RecipeId: recipeId,
    };
    // Send the POST request.
    $.ajax('/api/recipe-playlist', {
      type: 'POST',
      data: newRecipePlayList,
    }).then(
        () => {
          // Reload the page to get the updated list
          location.reload();
        },
    );
  });

  $(document).on('click', removeRecipePlaylist, function(event) {
    const recipeid = parseInt(event.target.attributes.recipeid.value);
    const playlistid = parseInt(event.target.attributes.playlistid.value);

    // Send the DELETE request.
    $.ajax(`/api/recipe-playlist/${playlistid}/${recipeid}`, {
      type: 'DELETE',
    }).then(
        () => {
          // Reload the page to get the updated list
          location.reload();
        },
    );
  });
});
