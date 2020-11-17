$(document).ready(() => {
    const userDetails = JSON.parse(localStorage.getItem("user-details"));

    const yourProfile = $('#your-profile');
    const myAccount = $('.my-account');

    yourProfile.html('<div class="user-icon"><i class="fa fa-user-circle"></i></div>' + userDetails.userName);

    const username = $("#username")
    username.text(userDetails.userName);

    // EDIT Category
    username.on("click", function (event) {
        const id = $(this).data("id");
        location.assign(`/api/member/${userDetails.id}`);
    });

    // My account
    myAccount.on("click", function (event) {
        location.assign("/myacc");
    });
});