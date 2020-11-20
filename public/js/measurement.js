// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
    // Getting references to our form and inputs
    const createForm = $(".create");
    const measurementName = $(".measurement-name");
    const editBtn = $(".edit");
    const updateForm = $(".update-form");
    const deleteBtn = $(".delete");
    // ADD new category  
    createForm.on("click", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        const newMeasurement = {
            name: measurementName.val().trim()
        };
        console.log(newMeasurement)
        // Send the POST request.
        // $.ajax("/api/measurements", {
        //     type: "POST",
        //     data: newMeasurement
        // }).then(
        //     () => {
        //         // Reload the page to get the updated list
        //         location.reload();
        //     }
        // );
    });

    // EDIT Category
    // editBtn.on("click", function (event) {
    //     const id = $(this).data("id");
    //     location.assign(`/api/measurements/${id}`);
    // });

    editBtn.on("click", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        const id = $(this).data("id");
        const updatedMeasurements = {
            id: id,
            name: measurementName.val().trim()
        };
        console.log(updatedMeasurements, id)
        // Send the POST request.
        // $.ajax(`/api/measurements`, {
        //     type: "PUT",
        //     data: updatedMeasurements
        // }).then(
        //     () => {
        //         // Reload the page to get the updated list
        //         location.assign("/api/measurements");
        //     }
        // );
    });

    // DELETE Category
    deleteBtn.on("click", function (event) {
        const id = $(this).data("id");
        console.log("delete", id)
        // Send the DELETE request.

        // $.ajax(`/api/measurements/${id}`, {
        //     type: "DELETE"
        // }).then(
        //     () => {
        //         // Reload the page to get the updated list
        //         location.reload();
        //     }
        // );
    });
});
