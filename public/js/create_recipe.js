const { JSON } = require("sequelize/types");

$(function () {
    const create = $("#create")
    // const recipeName = $(".recipe-name");
    // const recipePortion = $(".recipe-portion");
    // const recipeInstruction = $(".recipe-instruction");
    // const saveRecipe = $("#saveRecipe");
    const { id } = JSON.parse(localStorage.getItem("user-details"));

    // ADD new category  
    create.on("submit", function (event) {
        localStorage.deleteItem("create-recipe");
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        const newRecipe = {
            name: "blank",
            instruction: "blank",
            portion: "blank",
            UserId: id
        };
        // Send the POST request.
        $.ajax("/api/recipes", {
            type: "POST",
            data: newRecipe
        }).then((res) => {
            // Reload the page to get the updated list
            localStorage.setItem("create-recipe", JSON.stringify(res));
            window.location.replace("/recipe-info");
        }).catch((err) => {
            if (err) throw err;
        })

    });
})