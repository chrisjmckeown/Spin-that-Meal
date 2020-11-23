$(function() {
  // const moment = require('moment');
  // const io = require('io');
  // make connection
  const PORT = 8080; // process.env.PORT ||
  const socket = io.connect(`http://localhost:${PORT}`);
  // const {id, userName} = JSON.parse(localStorage.getItem('user-details'));

  // buttons and inputs
  const messageInput = $('#message');
  const sendMessageClick = $('#send_message');
  const sendUsername = $('#send_username');
  const chatroom = $('#chat-room');
  const feedback = $('#feedback');

  let userName;
  let id;
  let userColor;

  load();

  /**
* Loads existing chat messages.
*/
  function load() {
    // Send the POST request.
    $.get('/api/member', {
    }).then(
        (result) => {
          userName = result.userName;
          id = result.id;
          userColor = result.messagecolour;

          setUserName();
          // Reload the page to get the updated list
          $.ajax('/api/posts', {
            type: 'GET',
          }).then(
              (result) => {
                // const color2 = 'style="background-color: whitesmoke"';
                result.forEach((item, index ) => {
                  const date = moment(item.createdAt).
                      format('DD/MM/YYYY hh:mm:ss');
                  const color = 'style="background-color: ' +
                      `${item.User.messagecolour}"`;
                  chatroom.append(
                      '<div class="uk-card uk-card-default ' +
                      'uk-card-hover uk-card-body ' +
                      `z-depth-0 mb-1 message-text" ${color}>` +
                      '<div class="uk-card-title">' +
                      '<p class="message-user-name">' +
                      item.User.userName + '</p>' +
                      '<p class="message-date">' + date + '</p>' +
                      '</div>' +
                      '<div><p class="message-body">' +
                      item.message + '</p></div>' +
                      '</div>');
                });
                chatroom.scrollTop(chatroom[0].scrollHeight);
              },
          );
        },
    );
  }

  /**
* Sends an entered message.
*/
  function sendMessage() {
    const message = messageInput.val().trim();
    socket.emit('new_message', {message});
    messageInput.val('');
    chatroom.scrollTop(chatroom[0].scrollHeight);

    const newItem = {
      message,
      UserId: id,
    };
    // Send the POST request.
    $.ajax('/api/posts', {
      type: 'POST',
      data: newItem,
    });
  }

  // Emit message
  sendMessageClick.click(function() {
    sendMessage();
  });

  // Listen on new_message
  socket.on('new_message', (data) => {
    const color = 'style="background-color: ' +
        `${userColor}"`;
    chatroom.append(
        '<div class="uk-card uk-card-default ' +
          'uk-card-hover uk-card-body ' +
          `z-depth-0 mb-1 message-text" ${color}>` +
          '<div class="uk-card-title">' +
          '<p class="message-user-name">' +
          userName + '</p>' +
          '</div>' +
          '<div><p class="message-body">' +
          data.message + '</p></div>' +
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

  /**
* Emit a username.
*/
  function setUserName() {
    socket.emit('change_username', {username: userName});
  }
});
