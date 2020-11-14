$(document).ready(() => {
    const userDetails = JSON.parse(localStorage.getItem("user-details"));

    const username = $("#username")
    username.text(userDetails.userName);
});