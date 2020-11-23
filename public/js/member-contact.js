$(function() {
  // buttons and inputs
  const nameInput = $('.message-name');
  const emailInput = $('.message-email');
  const messageInput = $('.message-message');
  const sendMessageBtn = $('.btn-message-message');
  const contactClick = $('.contact');

  contactClick.click(function() {
    location.assign('/api/contact');
  });

  getLoggedInUserDetails();

  /**
  * Checks if the logged in user is admin.
  */
  function getLoggedInUserDetails() {
    $.get('/api/member', {
    }).then(
        (result) => {
          const {firstName, lastName, email} = result;
          nameInput.val(firstName + ' ' + lastName);
          emailInput.val(email);
        },
    );
  }

  sendMessageBtn.on('click', function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    const message = {
      name: nameInput.val().trim(),
      email: emailInput.val().trim(),
      message: messageInput.val().trim(),
    };

    $.post(`/api/contact/sendmessage`, {
      data: message,
    }).then(
        (result) => {
          window.location.href = result.emailUrl;
        },
    );
  });
});
