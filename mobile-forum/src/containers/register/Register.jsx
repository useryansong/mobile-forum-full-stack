import React, { Component } from 'react'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button
} from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { register } from '../../redux/actions'
import Logo from '../../components/logo/Logo'


const ListItem = List.Item

class Register extends Component {
    state = {
        username: '',
        password: '',
        password2: '',
        type: ''

    }

    register = () => {
        this.props.register(this.state)
    }
    //change of input: update state
    handleChange = (name, val) => {
        //update state
        this.setState({
            [name]: val
        })
    }
    toLogin = () => {
        this.props.history.replace('./login')
    }

    render() {
        const { type } = this.state
        const { msg, redirectTo } = this.props.user
        if (redirectTo) {
            return <Redirect to={redirectTo}></Redirect>
        }
        return (
            <div>
            <NavBar>
                Coding&nbsp;Forum
            </NavBar>
            <Logo />
            <WingBlank>
                <List>
                    {msg ? <div className='error-msg'>{msg}</div> : null}
                    <WhiteSpace />
                    <InputItem
                        placeholder="Please input username"
                        onChange={val => { this.handleChange('username', val) }}
                    >Username:</InputItem>
                    <WhiteSpace />
                    <InputItem
                        type="password"
                        placeholder="Please input password"
                        onChange={val => { this.handleChange('password', val) }}
                    >Password:</InputItem>
                    <WhiteSpace />
                    <InputItem
                        type="password"
                        placeholder="Please confirm password"
                        onChange={val => { this.handleChange('password2', val) }}
                    >Confirm:</InputItem>
                    <WhiteSpace />
                    <ListItem>
                        <span>User type</span>
                        &nbsp;&nbsp;&nbsp;
                        <Radio checked={type === 'expert'} onChange={() => this.handleChange('type', 'expert')}>Expert</Radio>
                        &nbsp;&nbsp;&nbsp;
                        <Radio checked={type === 'boss'} onChange={() => this.handleChange('type', 'boss')}>Boss</Radio>
                    </ListItem>
                    <WhiteSpace />
                    <Button type='primary' onClick={this.register}>Register</Button>
                    <WhiteSpace />
                    <Button onClick={this.toLogin}>Has Account</Button>
                </List>
            </WingBlank>

        </div>
        )
    }
}

export default connect(
    state => ({ user: state.user }),
    { register }
)(Register)