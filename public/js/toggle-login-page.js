$(document).ready(() => {
  // Getting references to our form and inputs
  const signUpForm = $('form.sign-up-form');
  const signInForm = $('form.sign-ip-form');

  const signIn = $('.sign-in');
  const signInSwitch = $('.sign-in-switch');
  const signUp = $('.sign-up');
  const signUpSwitch = $('.sign-up-switch');

  signIn.removeClass('fadeout').addClass('fadein');
  signUpSwitch.removeClass('fadeout').addClass('fadein');
  signInSwitch.removeClass('fadein').addClass('fadeout');
  signUp.removeClass('fadein').addClass('fadeout');

  signUpForm.on('submit', (event) => {
    event.preventDefault();
    signInSwitch.removeClass('fadeout').addClass('fadein');
    signUp.removeClass('fadeout').addClass('fadein');
    signIn.removeClass('fadein').addClass('fadeout');
    signUpSwitch.removeClass('fadein').addClass('fadeout');
  });

  signInForm.on('submit', (event) => {
    event.preventDefault();
    signInSwitch.removeClass('fadein').addClass('fadeout');
    signUp.removeClass('fadein').addClass('fadeout');
    signIn.removeClass('fadeout').addClass('fadein');
    signUpSwitch.removeClass('fadeout').addClass('fadein');
  });
});
