// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  // Getting references to our form and inputs
  const editBtn = $('.edit');
  const deleteBtn = $('.delete');
  const updateUserForm = $('.update-member-form');

  const firstName = $('.update-first-name');
  const lastName = $('.update-last-name');
  const userName = $('.update-user-name');
  const email = $('.update-email');
  const phone = $('.update-phone');
  const address = $('.update-address');
  const password = $('.update-password');
  const userChangePassword = $('#user-change-password');
  const userUpdateAdmin = $('#user-update-admin');

  // EDIT Category
  editBtn.on('click', function(event) {
    const id = $(this).data('id');
    location.assign(`/api/users/${id}`);
  });

  // DELETE Category
  deleteBtn.on('click', function(event) {
    const id = $(this).data('id');
    // Send the DELETE request.
    $.ajax(`/api/users/${id}`, {
      type: 'DELETE',
    }).then(
        () => {
          // Reload the page to get the updated list
          location.reload();
        },
    );
  });

  password.addClass('uk-disabled');
  userChangePassword.on('change', function() {
    if ($(this).is(':checked')) {
      password.removeClass('uk-disabled');
    } else {
      password.addClass('uk-disabled');
    }
  });

  updateUserForm.on('submit', function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    $('#alert .msg').text('');
    $('#alert').fadeOut(0);

    const id = $(this).data('id');

    const updatedItem = {
      id,
      firstName: firstName.val().trim(),
      lastName: lastName.val().trim(),
      userName: userName.val().trim(),
      email: email.val().trim(),
      password: password.val().trim(),
      phone: phone.val().trim(),
      address: address.val().trim(),
      admin: userUpdateAdmin.is(':checked'),
      changepassword: userChangePassword.is(':checked'),
    };

    if (userChangePassword.is(':checked')) {
      if (! checkPassword(updatedItem.password)) {
        return;
      }
    }
    if (!firstName || !lastName || !userName ||
        !email ||
        !phone || !address) {
      $('#alert .msg').text('Please ensure all details are correctly entered.');
      $('#alert').fadeIn(500);
      return;
    }

    // Send the POST request.
    $.ajax(`/api/users`, {
      type: 'PUT',
      data: updatedItem,
    }).then(
        () => {
          // Reload the page to get the updated list
          if (!userUpdateAdmin.is(':checked')) {
            location.assign('/index');
          } else {
            location.reload();
            password.val('');
          }
        },
    );
  });

  /**
* Checks the pasword passes the criteria.
* @param {string} password Input.
* @return {boolean} Returns true if conditions are meet.
*/
  function checkPassword(password) {
    if (password.length < 8) {
      $('#alert .msg').text('Password must be greater than 8 characters');
      $('#alert').fadeIn(500);
      return false;
    }

    if (!checkSpecialChar(password) ) {
      $('#alert .msg').text('Password must contain 1 special character');
      $('#alert').fadeIn(500);
      return false;
    }
    if (!checkNumber(password)) {
      $('#alert .msg').text('Password must contain 1 number');
      $('#alert').fadeIn(500);
      return false;
    }
    return true;
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
