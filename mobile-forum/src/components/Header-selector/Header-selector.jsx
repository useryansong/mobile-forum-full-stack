import React, { Component } from 'react'
import { Grid, List } from 'antd-mobile'

export default class HeaderSelector extends Component {

    state = {
        icon: null// image object
    }
    constructor(props) {
        super(props)
        this.headerList = []
        for (let i = 0; i < 20; i++) {
            this.headerList.push({
                text: 'image' + (i + 1),
                icon: require(`./images/header${i + 1}.png`)
            })
        }
    }

    handleClick = ({text, icon}) => {
        //update current component state
        this.setState({icon})
        this.props.setHeader(text)
    }

    render() {
        //header
        const listHeader = !this.state.icon?'Please select image':(
            <div>
                Selected image:<img src={this.state.icon}/>
            </div>
        )


        return (
            <List renderHeader={() => listHeader}>
                <Grid
                    data={this.headerList}
                    columnNum={5}
                    onClick={this.handleClick}
                >

                </Grid>
            </List>
        )
    }
}
