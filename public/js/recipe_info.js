$(function () {
    const saveRecipe = $("#saveRecipe");
    const recipeName = $(".recipe-name");
    const recipePortion = $(".recipe-portion");
    const recipeInstruction = $(".recipe-instruction");
    const { id, UserId } = JSON.parse(localStorage.getItem("create-recipe"));
    const numbers = /^[0-9]+$/

    saveRecipe.on("submit", function (event) {
        if (recipeName.val() === "" || recipePortion.val() === "" || recipeInstruction.val() === "") {
            event.preventDefault();
            alert("Please input all filed before submit");
            return false;
        } else if (!recipePortion.val().match(numbers)) {
            event.preventDefault();
            alert("Please input numeric characters only in portion");
            return false;
        } else {
            const updateRecipe = {
                id: id,
                name: recipeName.val().trim(),
                instruction: recipeInstruction.val().trim(),
                portion: recipePortion.val().trim(),
                UserId: UserId
            };
            $.ajax(`/api/recipes`, {
                type: "PUT",
                data: updateRecipe
            }).then(
                () => {
                    // Reload the page to get the updated list
                    window.location.replace("/create-recipe");
                }
            );
        }


    })







})