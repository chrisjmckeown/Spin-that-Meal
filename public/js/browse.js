$(function () {
  const recentSearch = [];
  let recipe;
  let storedRecipes = JSON.parse(window.localStorage.getItem('storedRecipes')) || [];
  // var historyClearBtn = document.querySelector("#clearHistory");

  $('#clearHistory').hide();

  function recentlySearched() {
    $('#searchResults').empty();

    if (recentSearch) {
      $('#recentlySearched').empty();

      const btns = $('<div>').attr('class', 'buttons');
      for (let i = 0; storedRecipes.length > i; i++) {
        const recipeBtn = $('<button>').attr('href', '#').attr('id', 'recipeBtn').text(storedRecipes[i]);
        recipeBtn.attr('class', 'uk-button btn-fixed-size');
        btns.prepend(recipeBtn);
        $('#recentlySearched').append(btns);
      }
    }
  }

  function searchRecipes(recipe) {
    recentlySearched();

    $.ajax({
      url: 'https://api.edamam.com/search?q=' + recipe + '&app_id=b208d965&app_key=168bd55cfd40d63ac22f125ce7280e08&from=0&to=4',
      method: 'GET',
      dataType: 'json',
      success: function (data) {
      },
    }).then(function (data) {
      $('#searchResults').empty();
      // loop through array response to find the forecasts
      for (let i = 0; i <= 3; i++) {
        const newCard = $('<div>').attr('class', 'uk-child-width-1-1@s uk-grid-match');

        const bodyDiv = $('<div>').attr('class', 'uk-card uk-card-default uk-card-hover uk-card-body browse');
        const footerDiv = $('<div>').attr('class', 'uk-card-footer');

        const cardTitle = $('<div>').attr('class', 'uk-card-title uk-float-left').text(data.hits[i].recipe.label);
        bodyDiv.append(cardTitle);

        const addPlaylist = $('<div>').attr('class', 'uk-float-right uk-inline');
        cardTitle.prepend(addPlaylist);
        const plistBtn = $('<button>').attr('class', 'uk-button uk-button-default browseAdd');
        addPlaylist.append(plistBtn);
        const pIcon = $('<span>').attr('uk-icon', 'plus');
        plistBtn.append(pIcon);

        const contentDiv = $('<div>').attr('uk-dropdown', 'pos: right-center');
        addPlaylist.append(contentDiv);

        const listUl = $('<div>').attr('class', 'uk-nav uk-dropdown-nav');
        contentDiv.append(listUl);

        const newList = $('<a>').attr('href', '#').text('Create New List');
        listUl.append(newList);

        const healthTable = $('<table>').attr('class', 'uk-table');
        bodyDiv.append(healthTable);
        const healthBody = $('<tbody>');
        healthTable.append(healthBody);
        const healthTR1 = $('<tr>');
        const healthTR2 = $('<tr>');
        healthBody.append(healthTR1, healthTR2);

        // have a go putting these in a table or column
        healthTR1.append($('<td>').attr('class', 'card-text').html(data.hits[i].recipe.healthLabels[0]));
        healthTR1.append($('<td>').attr('class', 'card-text').text(data.hits[i].recipe.healthLabels[1]));
        healthTR2.append($('<td>').attr('class', 'card-text').text(data.hits[i].recipe.healthLabels[2]));
        healthTR2.append($('<td>').attr('class', 'card-text').text(data.hits[i].recipe.healthLabels[3]));

        bodyDiv.append($('<p>').attr('class', 'card-text').text('Calories: ' + data.hits[i].recipe.totalTime));
        bodyDiv.append($('<p>').attr('class', 'card-text').text('Total Time: ' + data.hits[i].recipe.calories));

        footerDiv.append($('<a>').attr('href', (data.hits[i].recipe.url)).attr('target', '_blank').attr('class', 'uk-button uk-button-text').text('View Full Recipe Here'));
        newCard.append(bodyDiv);
        bodyDiv.append(footerDiv);
        $('#searchResults').append(newCard);
      }
    });
  }
  // Event handler for user clicking the search forecast button
  $('#searchBtn').on('click', function (event) {
    // Preventing the button from trying to submit the form
    $('#clearHistory').show();
    $('#beforeSearch').hide();

    event.preventDefault();
    recipe = $('#searchInput').val().trim();
    if (recipe != '') {
      if (storedRecipes.indexOf(recipe) === -1) {
        storedRecipes.push(recipe);
      }
      localStorage.setItem('storedRecipes', JSON.stringify(storedRecipes));
      recentlySearched();
      searchRecipes(recipe);
    }
  });

  $('#recentlySearched').on('click', 'button', function (event) {
    event.preventDefault();
    const prevRecipe = $(this).text();

    searchRecipes(prevRecipe, recipe);
  });

  function clearHistory() {
    $('#recentlySearched').empty();
    storedRecipes = [];
    localStorage.setItem('storedRecipes', JSON.stringify(storedRecipes));
  }
  $('#clearHistory').click(clearHistory);
});
