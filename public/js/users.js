// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
    // Getting references to our form and inputs
    const editBtn = $(".edit");
    const updateForm = $(".update-form");
    const deleteBtn = $(".delete");

    const firstName = $(".firstName");
    const lastName = $(".lastName");
    const userName = $(".userName");
    const email = $(".email");
    const phone = $(".phone");
    const address = $(".address");

    // EDIT Category
    editBtn.on("click", function (event) {
        const id = $(this).data("id");
        location.assign(`/api/users/${id}`);
    });

    updateForm.on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        const id = $(this).data("id");
        const updatedUser = {
            firstName: firstName.val().trim(),
            lastName: lastName.val().trim(),
            userName: userName.val().trim(),
            email: email.val().trim(),
            phone: phone.val().trim(),
            address: address.val().trim()
        };

        if (!userData.firstName || !userData.lastName || !userData.userName
            || !userData.email
            || !userData.phone || !userData.address) {
            return;
        }
        // Send the POST request.
        $.ajax(`/api/users/${id}`, {
            type: "PUT",
            data: updatedUser
        }).then(
            () => {
                // Reload the page to get the updated list
                location.assign("/api/users");
            }
        );
    });

    // DELETE Category
    deleteBtn.on("click", function (event) {
        const id = $(this).data("id");
        // Send the DELETE request.
        $.ajax(`/api/users/${id}`, {
            type: "DELETE"
        }).then(
            () => {
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
});
