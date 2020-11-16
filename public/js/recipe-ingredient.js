// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
    // Getting references to our form and inputs
    const createForm = $("#create-form");
    const recipeIngredientAmount = $(".recipe-ingredient-amount");
    const editBtn = $(".edit");
    const updateForm = $(".update-form");
    const deleteBtn = $(".delete");

    // ADD new category  
    createForm.on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        const newRecipe = {
            amount: recipeIngredientAmount.val().trim()
        };
        // Send the POST request.
        $.ajax("/api/recipe-ingredients", {
            type: "POST",
            data: newRecipe
        }).then(
            () => {
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

    // EDIT Category
    editBtn.on("click", function (event) {
        const id = $(this).data("id");
        location.assign(`/api/recipe-ingredients/${id}`);
    });

    updateForm.on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        const id = $(this).data("id");
        const updatedRecipe = {
            id: id,
            amount: recipeIngredientAmount.val().trim()
        };
        // Send the POST request.
        $.ajax(`/api/recipe-ingredients`, {
            type: "PUT",
            data: updatedRecipe
        }).then(
            () => {
                // Reload the page to get the updated list
                location.assign("/api/recipe-ingredients");
            }
        );
    });

    // DELETE Category
    deleteBtn.on("click", function (event) {
        const id = $(this).data("id");
        // Send the DELETE request.
        $.ajax(`/api/recipe-ingredients/${id}`, {
            type: "DELETE"
        }).then(
            () => {
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
});
