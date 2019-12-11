const {ChatModel} = require('../db/models')

module.exports = function (server) {
    // get IO object
    const io = require('socket.io')(server)
    // subscribe connection
    io.on('connection', function (socket) {
        console.log('soketio connected')
        // receive the meg from client
        socket.on('sendMsg', function ({from, to , content}) {
            console.log('server receive the msg from broswer', {from, to , content})
            //deal with data(save msg)
            const chat_id =[from, to].sort().join('_')  //from_to|| to_from
            const create_time = Date.now()
            new ChatModel({from, to , content,chat_id,create_time}).save(function (error, chartMsg) {
                //send msg to client
                io.emit('receiveMsg', chartMsg)
            })
        })
    })
}