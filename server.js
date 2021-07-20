// server.js
const express = require('express');
const app = express();
 
const server = app.listen(8000, () =>
  console.log('The server is all fired up on port 8000')
);
 
// To initialize the socket, we need to
// invoke the socket.io library
// and pass it our Express server
const io = require('socket.io')(server, { cors: true });

io.on("connection", socket => {
    // Each client that connects gets their own socket id
    console.log("Nice to meet you. (shake hand)");
    //if this logs, new client successfully completed handshake
    socket.on("Welcome", (data) => {
        // socket.broadcast.emit("new_message_from_server", data)
    });

    socket.on("new_message_from_client", data => {
      socket.broadcast.emit("new_message_from_server", data)
    })
});