$(document).ready(() => {
  const userDetails = JSON.parse(localStorage.getItem('user-details'));
  const yourProfile = $('#your-profile');
  yourProfile.html(
      '<div class="user-icon"><i class="fa fa-user-circle"></i></div> ' +
  userDetails.userName);
});
