import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import { NavBar, InputItem, Button, TextareaItem } from 'antd-mobile'

import HearderSelector from '../../components/Header-selector/Header-selector'
import {updateUser} from '../../redux/actions'

class ExpertInfo extends Component {

    state ={
        header: '',
        post: '',
        info: '',
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
        if(header) {
            const path = type === 'boss'?'/boss':'expert'
            return <Redirect to={path}></Redirect>
        }
        return (
            <div>
                <NavBar>Expert info complete</NavBar>
                <HearderSelector setHeader={this.setHeader}/>
                <InputItem placeholder="Please input career" onChange={val => {this.handleChange('post', val)}}>Career: </InputItem>
                <TextareaItem 
                    title="Require:"
                    rows={3} 
                    onChange={val => {this.handleChange('info', val)}}
                    placeholder='Please introduce yourself'
                    />
                <Button type='primary' onClick={this.save}>Save</Button>  
            </div>
        )
    }
}
export default connect(
    state => ({user:state.user}),
    {updateUser}
)(ExpertInfo)
