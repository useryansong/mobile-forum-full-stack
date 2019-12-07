import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'

import HearderSelector from '../../components/Header-selector/Header-selector'
import {updateUser} from '../../redux/actions'

class BossInfo extends Component {

    state ={
        header: '',
        post: '',
        info: '',
        company: '',
        salary: ''
    }
    setHeader = (header) => {
        this.setState({
            header
        })
    }

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    save= () => {
        this.props.updateUser(this.state)
    }
    render() {
        const {header, type} = this.props.user
        console.log(header, type)
        if(header) {
            const path = type === 'expert'?'/expert':'boss'
            return <Redirect to={path}></Redirect>
        }
        return (
            <div>
                <NavBar>Boss info complete</NavBar>
                <HearderSelector setHeader={this.setHeader}/>
                <InputItem placeholder="Please input career" onChange={val => {this.handleChange('post', val)}}>Career: </InputItem>
                <InputItem placeholder="Please input company" onChange={val => {this.handleChange('company', val)}}>Company: </InputItem>
                <InputItem placeholder="Please input salary" onChange={val => {this.handleChange('salary', val)}}>Salary: </InputItem>
                <TextareaItem 
                    title="Require:"
                    rows={3} 
                    onChange={val => {this.handleChange('info', val)}}
                    />
                <Button type='primary' onClick={this.save}>Save</Button>  
            </div>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {updateUser}
)(BossInfo)
