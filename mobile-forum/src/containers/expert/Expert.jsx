/**
 * expert main UI 
 */
import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/actions'

import UserList from '../../components/user-list/User-list'

class Expert extends Component {

    componentDidMount () {
        //get userList
        this.props.getUserList('boss')
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
)(Expert)