/**
 * including all API function module
 */
import ajax from './ajax'

//register
export const reqRegister = (user) => ajax('/register', user, 'POST')
//login 
export const reqLogin = ({username, password}) => ajax('/login', {username,password},'POST')
//update
export const reqUpdateUser = (user) => ajax('/update', user, 'POST') 
//get userinfo
export const reqUser = () => ajax('/user')
//get user list
export const reqUserList = (type) => ajax('/userlist', {type})