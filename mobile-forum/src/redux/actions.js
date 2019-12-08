//register action
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER
} from './action-type'
import {
    reqRegister,
    reqLogin,
    reqUpdateUser,
    reqUser
} from '../api'

//auth success action
const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user })
//error message action
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg })
//receive user
const receiveUser = (user) => ({type:RECEIVE_USER,data:user})
//initial user
export const resetUser = () => ({type:RESET_USER})

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
        if(result.code===0) {//update successfully:data
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
        if(result.code===0) {
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}