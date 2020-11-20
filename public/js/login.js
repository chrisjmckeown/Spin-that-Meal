$(document).ready(() => {
  // Getting references to our form and inputs
  const loginForm = $('form.login');
  const emailInput = $('input#login-email-input');
  const passwordInput = $('input#login-password-input');

  // When the form is submitted,
  // we validate there's an email and password entered
  loginForm.on('submit', (event) => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run
    // the loginUser function and clear the form
    if (loginUser(userData)) {
      emailInput.val('');
      passwordInput.val('');
    }
  });

  // loginUser does a post to our "api/login" route
  // and if successful, redirects us the the members page
  /**
 * loginUser does a post to our "api/login" route
 * and if successful, redirects us the the members page
 * @param {string} userData Input.
 */
  function loginUser(userData) {
    const {email, password} = userData;
    $.post('/api/login', {
      email,
      password,
    })
        .then((result) => {
          localStorage.setItem('user-details', JSON.stringify(result));
          window.location.replace('/index');
        // If there's an error, log the error
        })
        .catch((err) => {
          if (err.responseText === 'Unauthorized') {
            $('#alertlogin .msglogin').
                text('Incorrect details, please try again.');
            $('#alertlogin').fadeIn(500);
            return false;
          }
          return true;
        });
  }
});
