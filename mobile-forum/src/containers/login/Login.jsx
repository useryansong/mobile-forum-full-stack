import React, { Component } from 'react'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Button
} from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { login } from '../../redux/actions'

import Logo from '../../components/logo/Logo'


const ListItem = List.Item

class Login extends Component {
    state = {
        username: '',
        password: '',

    }

    login = () => {
        this.props.login(this.state)
    }
    //change of input: update state
    handleChange = (name,val) => {
        //update state
        this.setState({
            [name]: val
        })
    }
    toRegister = () => {
        this.props.history.replace('./register')
    }

    render() {
        const { msg, redirectTo } = this.props.user
        if (redirectTo) {
            return <Redirect to={redirectTo}></Redirect>
        }
        const {type} =this.state
        return (
            <div>
                {msg ? <div className='error-msg'>{msg}</div> : null}
                <NavBar>
                    Coding&nbsp;Forum
                </NavBar>
                <Logo />
                <WingBlank>
                    <List>
                        <WhiteSpace />
                        <InputItem
                            placeholder="Please input username"
                            onChange={val => {this.handleChange('username',val)}}
                        >Username:</InputItem>
                        <WhiteSpace />
                        <InputItem 
                            type="password"
                            placeholder="Please input password"
                            onChange={val => {this.handleChange('password',val)}}
                            >Password:</InputItem>
                        <WhiteSpace />
                        <Button type='primary' onClick={this.login}>Sign in</Button>
                        <WhiteSpace />
                        <Button onClick={this.toRegister}>Sign up</Button>
                    </List>
                </WingBlank>

            </div>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {login}
)(Login)