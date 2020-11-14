$(document).ready(() => {
    // Getting references to our form and input
    const signUpForm = $("form.signup");
    const firstNameInput = $("input#first-name-input");
    const lastNameInput = $("input#last-name-input");
    const userNameInput = $("input#username-input");
    const emailInput = $("input#signup-email-input");
    const passwordInput = $("input#signup-password-input");
    const phoneInput = $("input#phone-input");
    const addressInput = $("input#address-input");

    // When the signup button is clicked, we validate the email and password are not blank
    signUpForm.on("submit", event => {
        event.preventDefault();
        const userData = {
            firstName: firstNameInput.val().trim(),
            lastName: lastNameInput.val().trim(),
            userName: userNameInput.val().trim(),
            email: emailInput.val().trim(),
            password: passwordInput.val().trim(),
            phone: phoneInput.val().trim(),
            address: addressInput.val().trim()
        };

        if (!userData.firstName || !userData.lastName || !userData.userName
            || !userData.email || !userData.password
            || !userData.phone || !userData.address) {
            return;
        }
        // If we have an email and password, run the signUpUser function
        signUpUser(userData);
        firstNameInput.val("");
        lastNameInput.val("");
        userNameInput.val("");
        emailInput.val("");
        passwordInput.val("");
        phoneInput.val("");
        addressInput.val("");
    });

    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(userData) {
        const { firstName, lastName, userName, email, password, phone, address } = userData;
        $.post("/api/signup", {
            firstName, lastName, userName, email, password, phone, address
        })
            .then((res) => {
                window.location.replace("/index");
                // If there's an error, handle it by throwing up a bootstrap alert
            })
            .catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
});
