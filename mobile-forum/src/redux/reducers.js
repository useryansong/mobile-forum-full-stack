import { combineReducers } from 'redux'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG
} from './action-type'

import { getRedirectTo } from '../utils'

const initUser = {
    username: '',//null username
    type: '', //user type
    msg: '',//error 
    redirectTo: '',
}
function user(state = initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            const { type, header } = action.data
            return { ...action.data, redirectTo: getRedirectTo(type, header) }
        case ERROR_MSG:
            return { ...state, msg: action.data }
        case RECEIVE_USER:
            return action.data
        case RESET_USER: {
            return { ...initUser }
        }
        default: return state
    }
}

const initUserList = []
//create userlist's reducer
function userList(state = initUserList, action) {
    switch (action.type) {
        case RECEIVE_USER_LIST:
            return action.data
        default: return state
    }
        
}

const initChat = {
    users:{},//user info
    chatMsgs:[],//msg array
    unReadCount:0 //unread msg 
}
//chat state reducer
function chat(state=initChat, action) {
    switch (action.type) {
        case RECEIVE_MSG_LIST: //data:{suers, chatMsgs}
        const {users,chatMsgs} = action.data
            return {
                users,
                chatMsgs,
                unReadCount:0
            }
        case RECEIVE_MSG://data:chatMsg
        const chatMsg = action.data
            return {
                users: state.users,
                chatMsgs: [...state.chatMsgs, chatMsg],
                unReadCount:0
            }
        default:
            return state
    }
}

export default combineReducers({
    user,
    userList,
    chat
})

