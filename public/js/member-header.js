$(document).ready(() => {
  // const userDetails = JSON.parse(localStorage.getItem('user-details'));

  const yourProfile = $('#your-profile');

  $.get('/api/member', {
  }).then(
      (result) => {
        // Reload the page to get the updated list
        yourProfile.html(
            '<div class="user-icon"><i class="fa fa-user-circle"></i></div> ' +
          result.userName);
      });
});
