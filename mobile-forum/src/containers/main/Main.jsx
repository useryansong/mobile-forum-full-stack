import React, {Component} from 'react'
import  {Route, Switch, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'

import BossInfo from '../boss-info/Boss-info'
import ExpertInfo from '../Expert-info/Expert-info'

import {getRedirectTo} from '../../utils'

class Main extends Component {

    componentDidMount () {
        //already login(cookie has userid),but not login right now(redux doesn't have _id), send request to get user
        const userid = Cookies.get('userid')
        const {_id} = this.props.user
        if(userid && !_id) {
            //send request, get info of user
            console.log('send reqeust, receive user')
        }
    }

    render () {
        //read userid in cookie
        const userid = Cookies.get('userid')
        //if not, redirect to login
        if (!userid) {
            return <Redirect to='/login'></Redirect>
        }
        //if yes, read state of user in redux
        const {user} = this.props
        //if user doesn't have _id, return null
        if (!user._id) {
            return null
        } else {
            //if has _id, render the UI
            //if request root route, according to the type an header of user to calculate route
            let path = this.props.location.pathname
            if( path ==='/') {
              path = getRedirectTo(user.type, user.header)
                return <Redirect to={path}/>
            }
        }
        
        return (
            <div>
                <Switch>
                    <Route path='/bossinfo' component={BossInfo}></Route>
                    <Route path='/expertinfo' component={ExpertInfo}></Route>
                </Switch>
            </div>
        )
    }
}

export default connect(
    state =>({user:state.user})
)(Main)
/**
 * 1. logIn automatically
 *  1). already login(cookie has userid),but not login right now(redux doesn't have _id), send request to get user
 *  2). cooie doesn't have userid, go to login UI automatically
 * 2. if already login, if request root route
 *  according to the type and header of usre to calculate route, and redirector
 */