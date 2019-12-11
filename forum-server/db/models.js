/**
 * including n models
 */

// import mongoose
const mongoose = require('mongoose')

//connect databasse
mongoose.connect('mongodb://localhost:27017/forum',{useNewUrlParser: true})

//get connection object
const conn = mongoose.connection

conn.on('connected', () => {
    console.log('db connect successfully!')
})

//define Schema
const userSchema = mongoose.Schema({
    username: { type: String, required: true },//username
    password: { type: String, required: true },//password
    type: { type: String, required: true },
    header: { type: String },
    post: { type: String },
    info: { type: String },
    company: { type: String },
    salary: { type: String }
})

//deine Model
const UserModel = mongoose.model('user', userSchema)

//export Moel
exports.UserModel = UserModel

//define Schema
const chatSchema = mongoose.Schema({
    from: {type: String, required: true}, // send id of user
    to: {type: String, required: true}, //receive userid
    chat_id: {type: String, required: true}, // string made by from and to 
    content: {type: String, required: true}, // content
    read: {type:Boolean, default: false}, // if read
    create_time: {type: Number} // create time
    })
    // define Model
const ChatModel = mongoose.model('chat', chatSchema)
    // export Model
exports.ChatModel = ChatModel