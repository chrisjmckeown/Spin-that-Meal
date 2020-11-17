$(document).ready(() => {
    // Getting references to our form and inputs
    const signUpForm = $("form.sign-up-form");
    const signIpForm = $("form.sign-ip-form");

    const signIn = $(".sign-in");
    const signInSwitch = $(".sign-in-switch");
    const signUp = $(".sign-up");
    const signUpSwitch = $(".sign-up-switch");

    signInSwitch.hide();
    signUp.hide();

    signUpForm.on("submit", event => {
        event.preventDefault();
        signIn.hide();
        signUpSwitch.hide();
        signInSwitch.show();
        signUp.show();
    });

    signIpForm.on("submit", event => {
        event.preventDefault();
        signIn.show();
        signUpSwitch.show();
        signInSwitch.hide();
        signUp.hide();
    });
});