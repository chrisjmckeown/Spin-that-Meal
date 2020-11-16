// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
    // Getting references to our form and inputs
    const createForm = $("#create-form");
    const typeName = $(".type-name");
    const editBtn = $(".edit");
    const updateForm = $(".update-form");
    const deleteBtn = $(".delete");

    // ADD new category  
    createForm.on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        const newType = {
            name: typeName.val().trim()
        };
        // Send the POST request.
        $.ajax("/api/types", {
            type: "POST",
            data: newType
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
        location.assign(`/api/types/${id}`);
    });

    updateForm.on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        const id = $(this).data("id");
        const updatedtypes = {
            id: id,
            name: typeName.val().trim()
        };
        // Send the POST request.
        $.ajax(`/api/types`, {
            type: "PUT",
            data: updatedtypes
        }).then(
            () => {
                // Reload the page to get the updated list
                location.assign("/api/types");
            }
        );
    });

    // DELETE Category
    deleteBtn.on("click", function (event) {
        const id = $(this).data("id");
        // Send the DELETE request.
        $.ajax(`/api/types/${id}`, {
            type: "DELETE"
        }).then(
            () => {
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
});
