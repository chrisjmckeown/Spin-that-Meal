$(function () {
    var recentSearch = [];
    var recipe;
    var storedRecipes = JSON.parse(window.localStorage.getItem("storedRecipes")) || [];

    function recentlySearched() {

        $("#searchResults").empty();

        if (recentSearch) {
            $("#recentlySearched").empty();

            var btns = $("<div>").attr("class", "buttons");
            for (var i = 0; storedRecipes.length > i; i++) {
                var recipeBtn = $("<button>").attr("href", "#").attr("id", "recipeBtn").text(storedRecipes[i]);
                recipeBtn.attr("class", "uk-button uk-button-primary uk-button-large");
                btns.prepend(recipeBtn);
                $("#recentlySearched").append(btns);
            }
        }
    };

    function searchRecipes(recipe) {
        recentlySearched();

        $.ajax({
            url: "https://api.edamam.com/search?q=" + recipe + "&app_id=b208d965&app_key=168bd55cfd40d63ac22f125ce7280e08&from=0&to=4",
            method: "GET",
            dataType: "json",
            success: function (data) {
                console.log(data);
            }
        }).then(function (data) {

            $("#searchResults").empty();
            //loop through array response to find the forecasts
            for (var i = 0; i <= 3; i++) {

                var newCard = $("<div>").attr("class", "uk-child-width-1-2@s uk-grid-match");

                var bodyDiv = $("<div>").attr("class", "uk-card uk-card-hover uk-card-body");
                var footerDiv = $("<div>").attr("class", "uk-card-footer")

                var cardTitle = $("<div>").attr("class", "uk-card-title").text(data.hits[i].recipe.label);
                bodyDiv.append(cardTitle);

                bodyDiv.append($("<p>").attr("class", "card-text").html(data.hits[i].recipe.healthLabels));
                bodyDiv.append($("<p>").attr("class", "card-text").text("Calories: " + data.hits[i].recipe.totalTime));
                bodyDiv.append($("<p>").attr("class", "card-text").text("Total Time: " + data.hits[i].recipe.calories));

                footerDiv.append($("<a>").attr("href", (data.hits[i].recipe.url)).attr("class", "uk-button uk-button-text").text("View Full Recipe Here"));
                newCard.append(bodyDiv);
                bodyDiv.append(footerDiv)
                $("#searchResults").append(newCard);
            };
        })
    }
    // Event handler for user clicking the search forecast button
    $("#searchBtn").on("click", function (event) {
        // Preventing the button from trying to submit the form
        event.preventDefault();
        recipe = $("#searchInput").val().trim();
        console.log("You searched for " + recipe)
        if (recipe != "") {

            if (storedRecipes.indexOf(recipe) === -1) {
                storedRecipes.push(recipe);
            }
            localStorage.setItem("storedRecipes", JSON.stringify(storedRecipes));
            recentlySearched();
            searchRecipes(recipe);
        }
    });

    $("#recentlySearched").on("click", "button", function (event) {
        event.preventDefault();
        var prevRecipe = $(this).text();

        searchRecipes(prevRecipe, recipe);
    });

    function clearHistory() {

        $("#recentlySearched").empty();
        storedRecipes = [];
        localStorage.setItem("storedRecipes", JSON.stringify(storedRecipes));

    };
    $("#clearHistory").click(clearHistory);
});