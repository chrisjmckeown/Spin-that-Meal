// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {

    // ADD new category  
    $("#create-form").on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var newCategory = {
            name: $("#categoryName").val().trim(),
        };

        // Send the POST request.
        $.ajax("/api/categories", {
            type: "POST",
            data: newCategory
        }).then(function () {
            console.log("created new category");
            // Reload the page to get the updated list
            location.reload();
        }
        );
    });

    // EDIT Category
    $("#edit").on("click", function (event) {
        console.log("editing");
        const id = $(this).data("id");

        // Send the GET request.
        $.ajax("/api/categories/" + id, {
            type: "GET"
        }).then(
            function () {
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

        var id = $(this).data("id");

        // Send the POST request.
        $.ajax("/api/categories/" + id, {
            type: "PUT",
            data: updatedCategory
        }).then(
            function () {
                console.log("updated category");
                // Reload the page to get the updated list
                location.assign("/categories");
            }
        );
    });

    // DELETE Category
    $("#delete").on("click", function (event) {
        var id = $(this).data("id");
        // Send the DELETE request.
        $.ajax("/api/categories/" + id, {
            type: "DELETE"
        }).then(
            function () {
                console.log("deleted category", id);
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
});
