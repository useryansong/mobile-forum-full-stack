import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { NavBar } from 'antd-mobile'

import BossInfo from '../boss-info/Boss-info'
import ExpertInfo from '../Expert-info/Expert-info'
import Boss from '../boss/Boss'
import Expert from '../expert/Expert'
import Message from '../message/Message'
import Personal from '../personal/Personal'
import NotFound from '../../components/not-found/Not-fount'
import NavFooter from '../../components/nav-footer/Nav-footer'
import Chat from '../chat/Chat'

import { getRedirectTo } from '../../utils'
import { getUser } from '../../redux/actions'

class Main extends Component {

    navList = [
        {
            path: '/boss',
            component: Boss,
            title: 'ExpertList',
            icon: 'expert',
            text: 'Expert',
        },
        {
            path: '/expert',
            component: Expert,
            title: 'BossList',
            icon: 'boss',
            text: 'Boss',
        },
        {
            path: '/message',
            component: Message,
            title: 'MessageList',
            icon: 'message',
            text: 'Message',
        },
        {
            path: '/personal',
            component: Personal,
            title: 'Personal',
            icon: 'personal',
            text: 'Person',
        }
    ]

    componentDidMount() {
        //already login(cookie has userid),but not login right now(redux doesn't have _id), send request to get user
        const userid = Cookies.get('userid')
        const { _id } = this.props.user
        if (userid && !_id) {
            //send request, get info of user
            this.props.getUser()
        }
    }

    render() {
        //read userid in cookie
        const userid = Cookies.get('userid')
        //if not, redirect to login
        if (!userid) {
            return <Redirect to='/login'></Redirect>
        }
        //if yes, read state of user in redux
        const { user } = this.props
        //if user doesn't have _id, return null
        if (!user._id) {
            return null
        } else {
            //if has _id, render the UI
            //if request root route, according to the type an header of user to calculate route
            let path = this.props.location.pathname
            if (path === '/') {
                path = getRedirectTo(user.type, user.header)
                console.log(user.header)
                return <Redirect to={path} />
            }
        }
        const { navList } = this
        const path = this.props.location.pathname //request route
        const currentNav = navList.find(nav => nav.path === path)
        if (currentNav) {
            //hide route
            if(user.type === 'boss') {
                //hide the second of array
                navList[1].hide = true
            } else {
                //hide the first of array
                navList[0].hide =true
            }
        }
        return (
            <div>
                {currentNav ? <NavBar className='sticky-header'>{currentNav.title}</NavBar> : null}
                <Switch>
                    {
                        navList.map(nav => <Route path={nav.path} component={nav.component}></Route>)
                    }
                    <Route path='/bossinfo' component={BossInfo}></Route>
                    <Route path='/expertinfo' component={ExpertInfo}></Route>
                    <Route path='/chat/:userid' component={Chat}></Route>
                    <Route component={NotFound} />
                </Switch>
                {currentNav ? <NavFooter navList={navList}/> : null}
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user }),
    { getUser }
)(Main)
/**
 * 1. logIn automatically
 *  1). already login(cookie has userid),but not login right now(redux doesn't have _id), send request to get user
 *  2). cooie doesn't have userid, go to login UI automatically
 * 2. if already login, if request root route
 *  according to the type and header of usre to calculate route, and redirector
 */