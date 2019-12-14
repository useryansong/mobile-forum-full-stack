//register action
import io from 'socket.io-client'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG,
    MSG_READ
} from './action-type'
import {
    reqRegister,
    reqLogin,
    reqUpdateUser,
    reqUser,
    reqUserList,
    reqChatMsgList,
    reqReadMsg
} from '../api'

/**
 * one object
 * 1. beforing create object: if object is created, if not, create object
 * 2. after creating object: save object
 */

 //auth success action
const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user })
//error message action
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg })
//receive user
const receiveUser = (user) => ({ type: RECEIVE_USER, data: user })
//initial user
export const resetUser = (msg) => ({ type: RESET_USER, data: msg })
//receive userlist
export const receiveUserList = (userList) => ({ type: RECEIVE_USER_LIST, data: userList })
//get user chat info
export const receiveMsgList = ({users, chatMsgs, userid}) => ({type:RECEIVE_MSG_LIST,data:{users, chatMsgs, userid}})
//receive one msg
const receiveMsg = (chatMsg, userid) => ({type:RECEIVE_MSG, data:{chatMsg, userid}})
//has read msg
const msgRead = ({count, from, to}) => ({type: MSG_READ, data: {count, from, to}})


function initIO(dispatch, userid) {
    if (!io.socket) {
        //connect server, get the socket object
        io.socket = io('ws://localhost:4000')
        // receice the msg from server
        io.socket.on('receiveMsg', function (chatMsg) {
            if (userid === chatMsg.from || userid === chatMsg.to) {
                dispatch(receiveMsg(chatMsg, userid))
            }
        })
    }
}

//get chat list 
async function getMsgList(dispatch, userid) {
    initIO(dispatch, userid)
    const response = await reqChatMsgList()
    const result = response.data
    if(result.code === 0) {
        const {users, chatMsgs} = result.data
        dispatch(receiveMsgList({users, chatMsgs, userid}))
    }
}

//send msg
export const sendMsg = ({ from, to, content }) => {
    return dispatch => {
        // console.log('send msg', {from, to , content})
        
        //send msg
        io.socket.emit('sendMsg', {from, to , content})
    }
}

//READ MSG
export const readMsg = (from, to) => {
    return async dispatch => {
      const response = await reqReadMsg(from)
      const result = response.data
      if(result.code===0) {
        const count = result.data
        dispatch(msgRead({count, from, to}))
      }
    }
  }
  


export const register = (user) => {
    const { username, password, password2, type } = user
    //form check
    if (!username) {
        return errorMsg('Please input username')
    } else if (password !== password2) {
        return errorMsg('password mismatch')
    }

    return async dispatch => {

        //send register ajax request
        const response = await reqRegister({ username, password, type })

        const result = response.data
        if (result.code === 0) {
            getMsgList(dispatch, result.data._id)
            //successfully
            dispatch(authSuccess(result.data))
        } else {
            //failed
            dispatch(errorMsg(result.msg))
        }
    }
}

export const login = (user) => {

    const { username, password } = user
    if (!username) {
        return errorMsg('Please input username')
    } else if (!password) {
        return errorMsg('Please input password')
    }
    return async dispatch => {
        //send register ajax request
        const response = await reqLogin(user)
        const result = response.data
        if (result.code === 0) {
            //successfully
            getMsgList(dispatch, result.data._id)
            dispatch(authSuccess(result.data))
        } else {
            //failed
            dispatch(errorMsg(result.msg))
        }
    }
}

//update userinfo action
export const updateUser = (user) => {
    return async dispatch => {
        const response = await reqUpdateUser(user)
        const result = response.data
        if (result.code === 0) {//update successfully:data
            dispatch(receiveUser(result.data))
        } else {//failed
            dispatch(resetUser(result.msg))
        }
    }
}

//get user
export const getUser = () => {
    return async dispatch => {
        const response = await reqUser()
        const result = response.data
        if (result.code === 0) {
            getMsgList(dispatch,result.data._id)
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}

//get userlist
export const getUserList = (type) => {
    return async dispatch => {
        const response = await reqUserList(type)
        const result = response.data
        if (result.code === 0) {
            dispatch(receiveUserList(result.data))
        }
    }
}
