// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
    // Getting references to our form and inputs
    const createForm = $("#create-form");
    const recipeName = $(".recipe-name");
    const recipeInstruction = $(".recipe-instruction");
    const recipePortion = $(".recipe-portion");
    const editBtn = $(".edit");
    const updateForm = $(".update-form");
    const deleteBtn = $(".delete");
    const { id } = JSON.parse(localStorage.getItem("user-details"));

    // ADD new category  
    createForm.on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        const newRecipe = {
            name: recipeName.val().trim(),
            instruction: recipeInstruction.val().trim(),
            portion: recipePortion.val().trim(),
            UserId: id
        };
        // Send the POST request.
        $.ajax("/api/recipes", {
            type: "POST",
            data: newRecipe
        }).then(
            (result) => {
                // Reload the page to get the updated list
                
                location.reload();
            }
        );
    });

    // EDIT Category
    editBtn.on("click", function (event) {
        const id = $(this).data("id");
        location.assign(`/api/recipes/${id}`);
    });

    updateForm.on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        const id = $(this).data("id");
        const updatedRecipe = {
            id: id,
            name: recipeName.val().trim(),
            instruction: recipeInstruction.val().trim(),
            portion: recipePortion.val().trim(),
            UserId: id
        };
        // Send the POST request.
        $.ajax(`/api/recipes`, {
            type: "PUT",
            data: updatedRecipe
        }).then(
            () => {
                // Reload the page to get the updated list
                location.assign("/api/recipes");
            }
        );
    });

    // DELETE Category
    deleteBtn.on("click", function (event) {
        const id = $(this).data("id");
        // Send the DELETE request.
        $.ajax(`/api/recipes/${id}`, {
            type: "DELETE"
        }).then(
            () => {
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
});
