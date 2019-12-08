import React, { Component } from 'react'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

const Item = TabBar.Item
//user api of route component in non route component using withRoute
class NavFooter extends Component {

    render() {
        let {navList}=this.props
        navList = navList.filter(nav => !nav.hide)
        const path =this.props.location.pathname
        return (
            <TabBar>
                {
                    navList.map((nav) => (
                        <Item key={nav.icon}
                            title={nav.text}
                            icon={{uri:require(`./images/${nav.icon}.png`)}}
                            selectedIcon={{uri:require(`./images/${nav.icon}-selected.png`)}}
                            selected={path===nav.path}
                            onPress={() => this.props.history.replace(nav.path)}
                        ></Item>
                    ))
                }
            </TabBar>
        )
    }
}
export default withRouter(NavFooter)