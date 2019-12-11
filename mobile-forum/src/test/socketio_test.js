// import client server io
import io from 'socket.io-client'
//connect server, get the socket object
const socket = io('ws://localhost:4000')
// receice the msg from server
socket.on('receiveMsg', function (data) {
console.log('browser receive msg:', data)
})
//send msg to server
socket.emit('sendMsg', {name: 'Tom', date: Date.now()})
console.log('browser send msg to server', {name: 'Tom', date: Date.now()})