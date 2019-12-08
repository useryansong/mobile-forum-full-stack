/**
 * Boss main UI 
 */
import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/actions'

import UserList from '../../components/user-list/User-list'

class Boss extends Component {

    componentDidMount () {
        //get userList
        this.props.getUserList('expert')
    }

    render() {
        return (
            <UserList userList={this.props.userList}/>
        )
    }
}
export default connect(
    state => ({userList: state.userList}),
    {getUserList}
)(Boss)