const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const { generateMessage } = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user');

    socket.emit('receiveChat', generateMessage('Admin', 'Welcome'));

    socket.broadcast.emit('receiveChat', generateMessage('Admin', 'New User Joined'));

    socket.on('sendChat', (chat, callback) => {
        io.emit('receiveChat', generateMessage(chat.from, chat.message));
        callback('From server');
    });

    socket.on('disconnect', () => {
        console.log('Disconnected');
    });
});
server.listen(port, () => {
    console.log('Express Running');
});