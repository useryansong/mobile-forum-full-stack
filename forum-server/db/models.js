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