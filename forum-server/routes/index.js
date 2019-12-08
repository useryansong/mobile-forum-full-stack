var express = require('express');
var router = express.Router();

const md5 = require('blueimp-md5')
const { UserModel } = require('../db/models')
const filter={password:0}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//register router
router.post('/register', function (req, res) {
  //read request data
  const { username, password, type } = req.body
  //deal with
  //if user has already exist
  UserModel.findOne({ username }, function (err, user) {
    //if user exist
    if (user) {
      res.send({ code: 1, msg: 'User has already exist' })
    } else {
      //not exist and save
      new UserModel({ username, password: md5(password), type }).save(function (error, user) {
        //create cookie
        res.cookie('userid', user._id, { maxAge: 1000 * 60 * 60 * 24 })
        //return json data
        const data = { username, type, _id: user._id }// not including password
        res.send({ code: 0, data })
      })
    }
  })
})
//login router
router.post('/login', function (req, res) {
  const { username, password } = req.body
  //according to username and password query database, if not, return error mes
  //if yes, return login successfully
  UserModel.findOne({ username, password: md5(password)},filter, function (err, user) {
    if (user) {
      //successfully
      //create cookie
      res.cookie('userid', user._id, { maxAge: 1000 * 60 * 60 * 24 })
      res.send({code:0, data: user})
    } else {
      res.send({code:1, msg:'username or password wrong'})
    }
  })
})
//update user info
router.post('/update', function (req, res) {
  //get userid from cookie
  const userid = req.cookies.userid
  //if no userid, return message
  if(!userid) {
    return res.send({code:1, msg:'Please sign in'})
  }
  //if yes, update userinfo accoring to userid
  //receive data from user
  const user = req.body // no __id
  UserModel.findByIdAndUpdate({_id: userid}, user, function (error, oldUser) {

    if(!oldUser) {
      //let broswer know delete cookie
      res.clearCookie('userid')
      res.send({code:1, msg:'Please sign in'})
    } else {
      //prepare return user object
      const {_id, username, type} = oldUser
      const data = Object.assign({_id, username, type},user )
      res.send({code:0, data })
    }
  })
})
//get user info(according the userid of cookie)
router.get('/user', function (req, res) {
    //get userid from cookie
    const userid = req.cookies.userid
      //if no userid, return message
  if(!userid) {
    return res.send({code:1, msg:'Please sign in'})
  }
  UserModel.findOne({_id:userid}, filter, function (error, user) {
    res.send({code:0, data:user})
  })
})
//get user list(according type)
router.get('/userlist', function (req,res){
  const {type} = req.query
  UserModel.find({type}, filter, function (err,users) {
    res.send({code:0, data:users})
  })
})

module.exports = router;
