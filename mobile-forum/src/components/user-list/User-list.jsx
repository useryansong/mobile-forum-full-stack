import React, { Component } from 'react'
import {WhiteSpace, WingBlank, Card} from 'antd-mobile'

const Header = Card.Header
const Body = Card.Body

class UserList extends Component {

    render() {
        const {userList} = this.props
        console.log(userList)
        return (
            <WingBlank style={{marginBottom:50, marginTop: 45}}>
                {
                    userList.map(user => (
                        <div key={user._id}>
                        <WhiteSpace />
                        <Card>
                            <Header
                                thumb={require(`../../assets/images/${user.header}.png`)}
                                extra={user.username}
                            />
                            <Body>
                                <div>career:{user.post}</div>
                                {user.company ? <div>company: {user.company}</div>:null}
                                {user.salary ? <div>salary{user.salary}</div>:null}
                                <div>Info: {user.info}</div>
                            </Body>
                        </Card>
                    </div>
                    ))
                }
            </WingBlank>
        )
    }
}
export default UserList