import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar, List, InputItem, Grid, Icon } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'

import { sendMsg, readMsg } from '../../redux/actions'

const Item = List.Item
class Chat extends Component {
    state = {
        content: '',
        isShow: false//if show emoji
    }

    componentWillMount() {
        const emojis = ['😀', '😁', '😂', '🤣', '😀', '😁', '😂', '🤣', '😀', '😁', '😂', '🤣', '😀', '😁', '😂', '🤣']
        this.emojis = emojis.map(emoji => ({ text: emoji }))
    }

    componentDidMount() {
        // init msg list
        window.scrollTo(0, document.body.scrollHeight)
    }

    componentDidUpdate() {
        // update msg list
        window.scrollTo(0, document.body.scrollHeight)
    }

    componentWillUnmount() { // before logout
        //request update unread msg
        const from = this.props.match.params.userid
        const to = this.props.user._id
        this.props.readMsg(from, to)
    }

    toggleShow = () => {
        const isShow = !this.state.isShow
        this.setState({
            isShow
        })
        if (isShow) {
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'))
            }, 0)
        }
    }
    handleSend = () => {
        const from = this.props.user._id
        const to = this.props.match.params.userid
        const content = this.state.content.trim()
        //send msg
        if (content) {
            this.props.sendMsg({ from, to, content })
        }
        //clear input
        this.setState({
            content: '',
            isShow: false
        })
    }
    render() {
        const { user } = this.props
        const { users, chatMsgs } = this.props.chat
        const targetId = this.props.match.params.userid
        //calculate current chatId
        const meId = user._id
        if (!users[meId]) {
            return null
        }

        const chatId = [meId, targetId].sort().join('_')

        //filter chatMsgs
        const msgs = chatMsgs.filter(msg => msg.chat_id === chatId)
        //get targetI's header icon
        const targetHeader = users[targetId].header
        const targetIcon = targetHeader ? require(`../../assets/images/${targetHeader}.png`) : null

        return (
            <div id='chat-page'>
                <NavBar
                    icon={<Icon type='left' />}
                    className='sticky-header'
                    onLeftClick={() => this.props.history.goBack()}
                >
                    {users[targetId].username}
                </NavBar>
                <List style={{ marginTop: 50, marginBottom: 50 }}>
                {
                            msgs.map(msg => {
                                if (meId === msg.to) {//send to me
                                    return (
                                        <Item
                                            key={msg._id}
                                            thumb={targetIcon}
                                        >
                                            {msg.content}
                                        </Item>)
                                } else { // I send to
                                    return (
                                        <Item
                                            key={msg._id}
                                            className='chat-me'
                                            extra='me'
                                        >
                                            {msg.content}
                                        </Item>
                                    )
                                }
                            })
                        }
                </List>
                <div className='am-tab-bar'>
                    <InputItem
                        placeholder="Please type in"
                        value={this.state.content}
                        onChange={val => this.setState({ content: val })}
                        onFocus={() => this.setState({ isShow: false })}
                        extra={
                            <span>
                                <span onClick={this.toggleShow} style={{ marginRight: 5 }}>😃</span>
                                <span onClick={this.handleSend}>Send</span>
                            </span>
                        }
                    />
                    {this.state.isShow ? (
                        <Grid
                            data={this.emojis}
                            columnNum={8}
                            carouselMaxRow={4}
                            isCarousel={true}
                            onClick={(item) => {
                                this.setState({ content: this.state.content + item.text })
                            }}
                        />
                    ) : null}
                </div>
            </div>
        )
    }
}
export default connect(
    state => ({ user: state.user, chat: state.chat }),
    { sendMsg, readMsg }
)(Chat)