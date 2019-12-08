/**
 * Personal main UI 
 */
import React from 'react'
import { Result, List, WhiteSpace, Button,Modal } from 'antd-mobile'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {resetUser} from '../../redux/actions'

const Item = List.Item
const Brief = Item.Brief
class Personal extends React.Component {
    logout =() => {
        Modal.alert ('Log out', 'Confirm Log out', [
            {text: 'cancel'},
            {
                text:'Confirm',
                onPress: () => {
                    //remove userif from cookie
                    Cookies.remove('userid')
                    //remove user from redux
                    this.props.resetUser()
                }
            }
        ])
    }
    render() {
        const {username, info, header, company, post, salary} = this.props.user
        
        return (
            <div style={{marginBottom:50, marginTop: 45}}>
                <Result
                    img={<img src={require(`../../assets/images/${header}.png`)} style={{ width: 50 }}
                        alt="header" />}
                    title={username}
                    message={company}
                />
                <List renderHeader={() => 'Relative info'}>
                    <Item multipleLine>
                        <Brief>career: {post}</Brief>
                        <Brief>Brief: {info}</Brief>
                        {salary?<Brief>Salary: {salary}</Brief>:null}                      
                    </Item>
                </List>
                <WhiteSpace />
                <List>
                    <Button type='warning' onClick={this.logout}>Log Out</Button>
                </List>
            </div>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {resetUser}
)(Personal)