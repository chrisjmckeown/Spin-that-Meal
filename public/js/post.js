$(function() {
  // make connection
  const PORT = 8080; // process.env.PORT ||
  const socket = io.connect(`http://localhost:${PORT}`);
  const {id, userName} = JSON.parse(localStorage.getItem('user-details'));

  // buttons and inputs
  const messageInput = $('#message');
  const sendMessageClick = $('#send_message');
  const sendUsername = $('#send_username');
  const chatroom = $('#chatroom');
  const feedback = $('#feedback');

  load();
  function load() {
    // Send the POST request.
    $.ajax('/api/posts', {
      type: 'GET',
    }).then(
        (result) => {
          result.forEach((item) => {
            const date = moment(item.createdAt).format('DD/MM/YYYY hh:mm:ss');
            chatroom.append(
                '<div class="card bg-primary rounded z-depth-0 mb-1 message-text">' +
                        '<div class="card-header p-2">' +
                        '<p class="card-text black-text">' + item.User.userName + '</p>' +
                        '<p class="card-text black-text">' + date + '</p>' +
                        '</div>' +
                        '<div class="card-body p-2">' +
                        '<p class="card-text black-text">' + item.message + '</p>' +
                        '</div>' +
                        '</div>');
          });
          chatroom.scrollTop(chatroom[0].scrollHeight);
        },
    );
  }

  function sendMessage() {
    const message = messageInput.val().trim();
    socket.emit('new_message', {message});
    messageInput.val('');
    chatroom.scrollTop(chatroom[0].scrollHeight);

    const newPost = {
      message,
      UserId: id,
    };
    // Send the POST request.
    $.ajax('/api/posts', {
      type: 'POST',
      data: newPost,
    });
  }

  // Emit message
  sendMessageClick.click(function() {
    sendMessage();
  });

  // Listen on new_message
  socket.on('new_message', (data) => {
    chatroom.append(
        '<div class="card bg-primary rounded z-depth-0 mb-1 message-text">' +
            '<div class="card-header p-2">' +
            '<p class="card-text black-text">' + data.username + '</p>' +
            '</div>' +
            '<div class="card-body p-2">' +
            '<p class="card-text black-text">' + data.message + '</p>' +
            '</div>' +
            '</div>');
    chatroom.scrollTop(chatroom[0].scrollHeight);
  });

  // Emit typing
  messageInput.bind('keypress', (event) => {
    if (event.keyCode === 13) {
      sendMessage();
    } else {
      socket.emit('typing');
    }
  });

  // Listen on typing
  socket.on('typing', (data) => {
    feedback.html('<p><i>' + data.username +
    ' is typing a message... ' + '</i></p>');
    setTimeout(function() {
      feedback.html('');
    }, 1000);
  });

  // Emit a username
  sendUsername.click(function() {
    socket.emit('change_username', {username: userName});
  });

  setUserName();
  // Emit a username
  function setUserName() {
    socket.emit('change_username', {username: userName});
  }
});
