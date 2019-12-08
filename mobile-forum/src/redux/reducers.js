import {combineReducers} from 'redux'
import {AUTH_SUCCESS, ERROR_MSG,RECEIVE_USER,RESET_USER} from './action-type'

import {getRedirectTo} from '../utils'

const initUser = {
    username:'',//null username
    type: '', //user type
    msg: '',//error 
    redirectTo:'',
}
function user(state=initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            const {type, header} = action.data
            return {...action.data, redirectTo:getRedirectTo(type, header)}
        case ERROR_MSG:
            return {...state, msg:action.data}
        case RECEIVE_USER:
            return action.data
        case RESET_USER:{
            return {...initUser}
        }
        default: return state
    }
}


export default combineReducers({
    user
})

