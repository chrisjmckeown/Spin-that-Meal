// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
    // Getting references to our form and inputs
    const updateMemberForm = $(".update-member-form");

    const firstName = $(".update-first-name");
    const lastName = $(".update-last-name");
    const userName = $(".update-user-name");
    const email = $(".update-email");
    const phone = $(".update-phone");
    const address = $(".update-address");
    const password = $(".update-password");
    const changePassword = $(".change-password");

    onload();
    function onload() {
        console.log("llo")
    }

    updateMemberForm.on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        const id = $(this).data("id");
        let newPassword = "";
        if (changePassword.length === 0) {
            newPassword = password.val().trim();
        }
        const updatedUser = {
            id,
            firstName: firstName.val().trim(),
            lastName: lastName.val().trim(),
            userName: userName.val().trim(),
            email: email.val().trim(),
            password: newPassword,
            phone: phone.val().trim(),
            address: address.val().trim()
        };

        // if (!updatedUser.firstName || !updatedUser.lastName || !updatedUser.userName
        //     || !updatedUser.email || (!updatedUser.password && changePassword.length === 0)
        //     || !updatedUser.phone || !updatedUser.address) {
        //     return;
        // }
        // Send the POST request.
        $.ajax(`/api/member`, {
            type: "PUT",
            data: updatedUser
        }).then(
            () => {
                // Reload the page to get the updated list
                if (changePassword.length === 0) {
                    location.reload();
                } else {
                    location.reload();
                }
            }
        );
    });
});
