// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
    // Getting references to our form and inputs
    const save = $("#save");
    const recipeIngredientAmount = $("#recipe-ingredient-amount");
    // const editBtn = $(".edit");
    // const updateForm = $(".update-form");
    const recipeIngiredientName = $("#recipe-ingredient-name")
    const deleteBtn = $(".delete");
    const recipeId = JSON.parse(localStorage.getItem("create-recipe")).id;
    const measurement = $("#measurement");
    const type = $("#type")

    // ADD new category  
    save.on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        if (!recipeIngiredientName.val() || !recipeIngredientAmount.val() || !measurement.val() || !type.val()) {
            alert("please input or select all field")
        } else {
            const newIngredient = {
                name: recipeIngiredientName.val().trim(),
                TypeId: type.val()
            };
            // Send the POST request.
            $.ajax(`/api/recipe-ingredients/${name}`, {
                type: "POST",
                data: newIngredient
            }).then(
                () => {
                    // Reload the page to get the updated list
                    location.reload();
                }
            );
        }

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
