$(function () {
    //make connection
    const PORT = 8080; //process.env.PORT || 
    const socket = io.connect(`http://localhost:${PORT}`)
    const {userName} = JSON.parse(localStorage.getItem("user-details"));

    //buttons and inputs 
    const message = $("#message")
    const username = $("#username")
    const send_message = $("#send_message")
    const send_username = $("#send_username")
    const chatroom = $("#chatroom")
    const feedback = $("#feedback")

    //Emit message
    send_message.click(function () {
        socket.emit('new_message', { message: message.val().trim() })
    })

    //Listen on new_message
    socket.on("new_message", (data) => {
        if (userName == data.username) {
            chatroom.append('       <div class="card bg-primary rounded w-75 z-depth-0 float-right  mb-1 message-text"><div class="card-body p-2"><p class="card-text black-text">' + data.message + '</p></div></div>')
        } else {
            chatroom.append('       <div class="card bg-light rounded w-75 z-depth-0 mb-1 message-text"><div class="card-body p-2"><p class="card-text black-text">' + data.message + '</p></div></div>')
        }
    })

    //Emit typing
    message.bind("keypress", () => {
        socket.emit('typing')
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