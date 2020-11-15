$(document).ready(() => {
    const userDetails = JSON.parse(localStorage.getItem("user-details"));

    const username = $("#username")
    username.text(userDetails.userName);

    // EDIT Category
    username.on("click", function (event) {
        const id = $(this).data("id");
        location.assign(`/api/member/${userDetails.id}`);
    });
});