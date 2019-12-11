module.exports = function (server) {
    // get IO object
    const io = require('socket.io')(server)
    // subscribe connection
    io.on('connection', function (socket) {
        console.log('soketio connected')
        // receive the meg from client
        socket.on('sendMsg', function (data) {
            // console.log('server receive the msg from broswer', data)
            //  send msg to client server
            io.emit('receiveMsg', data.name + '_' + data.date)
            // console.log('server send msg to broswer', data)
        })
    })
}