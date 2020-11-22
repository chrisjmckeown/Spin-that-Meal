$(function () {
    const saveRecipe = $("#saveRecipe");
    const recipeName = $("#recipe-name");
    const recipePortion = $("#recipe-portion");
    const recipeInstruction = $("#recipe-instruction");
    const { id, UserId } = JSON.parse(localStorage.getItem("create-recipe"));

    saveRecipe.on("click", function (event) {
        event.preventDefault();
        if (recipeName.val() === "" || recipePortion.val() === "" || recipeInstruction.val() === "") {
            alert("Please input all filed before submit");
            return false;
        } else {
            const updateRecipe = {
                id: id,
                name: recipeName.val().trim(),
                instruction: recipeInstruction.val().trim(),
                portion: recipePortion.val().trim(),
                UserId: UserId
            };
            $.ajax(`/api/recipes/${id}`, {
                type: "PUT",
                data: updateRecipe
            }).then(
                (result) => {
                    console.log(result)
                    // Reload the page to get the updated list
                    window.location.replace("/recipe");
                }
            );
        }
    })







})