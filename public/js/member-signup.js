$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $('form.signup');
  const firstNameInput = $('input#first-name-input');
  const lastNameInput = $('input#last-name-input');
  const userNameInput = $('input#username-input');
  const emailInput = $('input#signup-email-input');
  const passwordInput = $('input#signup-password-input');
  const phoneInput = $('input#phone-input');
  const addressInput = $('input#address-input');

  // When the signup button is clicked,
  // we validate the email and password are not blank
  signUpForm.on('submit', (event) => {
    event.preventDefault();
    $('#alert .msg').text('');
    $('#alert').fadeOut(0);
    const userData = {
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
      userName: userNameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      phone: phoneInput.val().trim(),
      address: addressInput.val().trim(),
    };
    if (userData.password.length < 8) {
      $('#alert .msg').text('Password must be greater than 8 characters');
      $('#alert').fadeIn(500);
      return;
    }

    if (!checkSpecialChar(userData.password) ) {
      $('#alert .msg').text('Password must contain 1 special character');
      $('#alert').fadeIn(500);
      return;
    }
    if (!checkNumber(userData.password)) {
      $('#alert .msg').text('Password must contain 1 number');
      $('#alert').fadeIn(500);
      return;
    }
    if (!userData.firstName || !userData.lastName || !userData.userName ||
            !userData.email || !userData.password ||
            !userData.phone || !userData.address) {
      $('#alert .msg').text('Please ensure all details are correctly entered.');
      $('#alert').fadeIn(500);
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData);
    firstNameInput.val('');
    lastNameInput.val('');
    userNameInput.val('');
    emailInput.val('');
    passwordInput.val('');
    phoneInput.val('');
    addressInput.val('');
  });

  // Does a post to the signup route.
  // If successful, we are redirected to the members page
  // Otherwise we log any errors

  /**
 * Handles the sign up process.
 * @param {string} userData Input.
 */
  function signUpUser(userData) {
    const {
      firstName, lastName, userName, email, password, phone, address
    } = userData;
    $.post('/api/signup', {
      firstName, lastName, userName, email, password, phone, address,
    })
        .then(() => {
          window.location.replace('/index');
          // If there's an error, handle it by throwing up a bootstrap alert
        })
        .catch(handleLoginErr);
  }

  /**
 * Handles error messages during registration.
 * @param {string} err Input.
 */
  function handleLoginErr(err) {
    $('#alert .msg').text('Already signed up? Try sign in!');
    $('#alert').fadeIn(500);
  }

  /**
 * Checks the pasword contains a special character.
 * @param {string} password Input.
 * @return {boolean} Returns true if a special character is present.
 */
  function checkSpecialChar(password) {
    // // list for special characters !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~
    const specialCharactersCaseList = 
    '\u0020!\u0022#$%&\'()*+,-./:;<=>?@[\u005C\u005D^_`{|}~';
    let found = false;
    [...specialCharactersCaseList].forEach((c) => {
      if (password.includes(c)) {
        found = true;
      }
    });
    return found;
  }

  /**
 * Checks the pasword contains a number.
 * @param {string} password Input.
 * @return {boolean} Returns true if a number is present.
 */
  function checkNumber(password) {
    // list of numbers characters
    const numberList = '0123456789';
    let found = false;
    [...numberList].forEach((c) => {
      if (password.includes(c)) {
        found = true;
      }
    });
    return found;
  }
});
