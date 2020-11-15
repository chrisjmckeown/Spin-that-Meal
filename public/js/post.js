$(function () {
    //make connection
    const PORT = 8080; //process.env.PORT || 
    const socket = io.connect(`http://localhost:${PORT}`)
    const { id, userName } = JSON.parse(localStorage.getItem("user-details"));

    //buttons and inputs 
    const message_input = $("#message")
    const send_message = $("#send_message")
    const send_username = $("#send_username")
    const chatroom = $("#chatroom")
    const feedback = $("#feedback")
    load();
    function load() {
        // Send the POST request.
        $.ajax("/api/posts", {
            type: "GET"
        }).then(
            (result) => {
                result.forEach((item) => {
                    chatroom.append(
                        '<div class="card bg-primary rounded z-depth-0 mb-1 message-text">' +
                        '<div class="card-header p-2">' +
                        '<p class="card-text black-text">' + item.User.userName + '</p>' +
                        '</div>' +
                        '<div class="card-body p-2">' +
                        '<p class="card-text black-text">' + item.message + '</p>' +
                        '</div>' +
                        '</div>')
                });
                chatroom.scrollTop(chatroom[0].scrollHeight);
            }
        );
    }

    function sendMessage() {
        const message = message_input.val().trim();
        socket.emit('new_message', { message })
        message_input.val("")
        chatroom.scrollTop(chatroom[0].scrollHeight);

        const newPost = {
            message,
            UserId: id
        };
        // Send the POST request.
        $.ajax("/api/posts", {
            type: "POST",
            data: newPost
        });
    }

    //Emit message
    send_message.click(function () {
        sendMessage();
    })

    //Listen on new_message
    socket.on("new_message", (data) => {
        chatroom.append(
            '<div class="card bg-primary rounded z-depth-0 mb-1 message-text">' +
            '<div class="card-header p-2">' +
            '<p class="card-text black-text">' + data.username + '</p>' +
            '</div>' +
            '<div class="card-body p-2">' +
            '<p class="card-text black-text">' + data.message + '</p>' +
            '</div>' +
            '</div>')
        chatroom.scrollTop(chatroom[0].scrollHeight);
    })

    //Emit typing
    message_input.bind("keypress", (event) => {
        if (event.keyCode === 13) {
            sendMessage();
        }
        else {
            socket.emit('typing')
        }
    })

    //Listen on typing
    socket.on('typing', (data) => {
        feedback.html("<p><i>" + data.username + " is typing a message... " + "</i></p>")
        setTimeout(function () { feedback.html("") }, 1000);
    })

    //Emit a username
    send_username.click(function () {
        socket.emit('change_username', { username: userName })
    })

    setUserName();
    //Emit a username
    function setUserName() {
        socket.emit('change_username', { username: userName })
    }
})