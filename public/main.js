$(function () {
  // Initialize variables
  var $window = $(window);
  var $usernameInput = $('.usernameInput'); // Input for username
  var $messages = $('.messages'); // Messages area
  var $inputMessage = $('.inputMessage'); // Input message input box
  var $loginPage = $('.login.page'); // The login page
  var $chatPage = $('.chat.page'); // The chatroom page
  $chatPage.hide();
  var socket = io();

  var username;
  var connected = false;
  var $currentInput = $usernameInput.focus();

  // Sets the client's username
  function setUsername() {
    username = $usernameInput.val().trim();

    // If the username is valid
    if (username) {
      $loginPage.fadeOut();
      $chatPage.show();
      $loginPage.off('click');
      $currentInput = $inputMessage.focus();

      // Tell the server your username
      socket.emit('add user', username);
    }
  }

  // Sends a chat message
  function sendMessage() {
    var message = $inputMessage.val();
    // if there is a non-empty message and a socket connection
    if (message && connected) {
      // tell server to execute 'new message' and send along one parameter
      $inputMessage.val('');
      addToMessages({username: username, message: message});
      socket.emit('new message', message);
    }
  }

  //adds the user's message to the messages ul
  function addToMessages(data){
    $messages.append('<li>' + data.username + ": " + data.message)
  }
  
  // Keyboard events
  $window.keydown(function (event) {
    // When the client hits ENTER on their keyboard
    if (event.which === 13) {
      if (username) {
        sendMessage();
      } else {
        setUsername();
      }
    }
  });

  // CLICK EVENTS

  // Focus input when clicking anywhere on login page
  $loginPage.click(function () {
    $currentInput.focus();
  });

  // Focus input when clicking on the message input's border
  $inputMessage.click(function () {
    $inputMessage.focus();
  });

  // // SOCKET EVENTS

});