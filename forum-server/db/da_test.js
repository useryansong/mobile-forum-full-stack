const md5 = require('blueimp-md5')
//connect with Mongoose
const mongoose = require('mongoose')

//connect with database
mongoose.connect('mongodb://localhost:27017/forum_test')

const conn = mongoose.connection

conn.on('connected', function () {// connect successfully
    console.log('database connect successfully!')
})

const userSchema = mongoose.Schema({
    username: { type: String, required: true }, // username
    password: { type: String, required: true }, // password
    type: { type: String, required: true }, // user type: expert/boss
    header: {type:String}
})

//define Model
const UserModel = mongoose.model('user', userSchema)

//create data
function testSave () {
    // create UserModel example
    const userModel = new UserModel({username:'Tom', password: md5('123'), type:'expert'})
    //user save() function
    userModel.save(function (error, user) {
        console.log('save()', error, user)
    })
}
testSave()

//find()/findOne()
function testFind() {
    UserModel.find(function (error, users) {
        console.log('find()', error, users)
    })

    UserModel.findOne({_id:'5de5ae2361111443b07a0723'}, function(error, user) {
        console.log('findOne()', error, user)
    })
}
//testFind()

//update
function testUpdate() {
    UserModel.findByIdAndUpdate({_id:'5de5ae2361111443b07a0723'},
    {username:'Jack'},function (error, doc) {
        console.log('findUp', error, doc)
    })
}

//delete
function testDelete () {
    UserModel.remove({_id:'5de5ae2361111443b07a0723'}, function(error, doc) {
        console.log('remove',error, doc)
    })
}