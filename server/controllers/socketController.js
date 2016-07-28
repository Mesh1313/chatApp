var User = require('../models/User.js');

module.exports = function(http) {
    var io = require('socket.io')(http);

    io.on('connection', function(socket) {
        global.users[socket.conn.id] = new User(socket.conn.id);

        socket.on('disconnect', function() {
            delete global.users[socket.conn.id];
        });
        socket.on('chatMessage', function(msg){
            io.emit('chatMessage', {
                sender: global.users[socket.conn.id],
                message: msg
            });
        });
    });
};