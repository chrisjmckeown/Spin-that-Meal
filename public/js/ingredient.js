// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
    // Getting references to our form and inputs
    const createForm = $("#create-form");
    const ingredientName = $(".ingredient-name");
    const editBtn = $(".edit");
    const updateForm = $(".update-form");
    const updateName = $(".update-name");
    const deleteBtn = $(".delete");

    // ADD new category  
    createForm.on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        const newIngredients = {
            name: ingredientName.val().trim()
        };
        // Send the POST request.
        $.ajax("/api/ingredients", {
            type: "POST",
            data: newIngredients
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
        location.assign(`/api/ingredients/${id}`);
    });

    updateForm.on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        const id = $(this).data("id");
        const updatedtypes = {
            id: id,
            name: updateName.val().trim()
        };
        // Send the POST request.
        $.ajax(`/api/ingredients`, {
            type: "PUT",
            data: updatedtypes
        }).then(
            () => {
                // Reload the page to get the updated list
                location.assign("/api/ingredients");
            }
        );
    });

    // DELETE Category
    deleteBtn.on("click", function (event) {
        const id = $(this).data("id");
        // Send the DELETE request.
        $.ajax(`/api/ingredients/${id}`, {
            type: "DELETE"
        }).then(
            () => {
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
});
