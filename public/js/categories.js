// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {

    // ADD new category  
    $("#create-form").on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        const newCategory = {
            name: $("#categoryName").val().trim(),
        };
        // Send the POST request.
        $.ajax("/api/categories", {
            type: "POST",
            data: newCategory
        }).then(
            () => {
            // Reload the page to get the updated list
            location.reload();
        }
        );
    });

    // EDIT Category
    $("#edit").on("click", function (event) {
        const id = $(this).data("id");
        console.log(`editing ${id}`)
        // Send the GET request.
        $.ajax("/api/categories/" + id, {
            type: "GET"
        }).then(
            () => {
                console.log("changes to", id);
            }
        );
    });

    $(".update-form").on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        const updatedCategory = {
            name: $("#name").val().trim()
        };
        const id = $(this).data("id");
        // Send the POST request.
        $.ajax("/api/categories/" + id, {
            type: "PUT",
            data: updatedCategory
        }).then(
            () => {
                // Reload the page to get the updated list
                location.assign("/categories");
            }
        );
    });

    // DELETE Category
    $("#delete").on("click", function (event) {
        const id = $(this).data("id");
        // Send the DELETE request.
        $.ajax("/api/categories/" + id, {
            type: "DELETE"
        }).then(
            () => {
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
});
