$(document).ready(() => {
    // Getting references to our form and inputs
    const signUpForm = $("form.sign-up-form");
    const signInForm = $("form.sign-ip-form");

    const signIn = $(".sign-in");
    const signInSwitch = $(".sign-in-switch");
    const signUp = $(".sign-up");
    const signUpSwitch = $(".sign-up-switch");
    const moveme = $(".moveme");

    signInSwitch.hide();
    signUp.hide();

    signUpForm.on("submit", event => {
        event.preventDefault();
        signInSwitch.show();
        signUp.show();
        // if (signUpSwitch.hasClass("fadeout"))
        //     signUpSwitch.removeClass("fadeout").addClass("fadein");
        // else
        //     signUpSwitch.removeClass("fadein").addClass("fadeout");
        // if (signIn.hasClass("fadeout"))
        //     signIn.removeClass("fadeout").addClass("fadein");
        // else
        //     signIn.removeClass("fadein").addClass("fadeout");
        signIn.hide();
        signUpSwitch.hide();
    });

    signInForm.on("submit", event => {
        event.preventDefault();
        signInSwitch.hide();
        signUp.hide();
        // if (signUpSwitch.hasClass("fadeout"))
        //     signUpSwitch.removeClass("fadeout").addClass("fadein");
        // else
        //     signUpSwitch.removeClass("fadein").addClass("fadeout");
        // if (signIn.hasClass("fadeout"))
        //     signIn.removeClass("fadeout").addClass("fadein");
        // else
        //     signIn.removeClass("fadein").addClass("fadeout");
        signIn.show();
        signUpSwitch.show();
    });
});