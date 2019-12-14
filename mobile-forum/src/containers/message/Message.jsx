/**
 * Message main UI 
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief

//group chatMsgs in chat_id
function getLastMsgs(chatMsgs, userid) {
    //find lastMsg in every chat
    const lastMsgObjs = {}
    chatMsgs.forEach(msg => {
        //acount the qty of msg
        if (msg.to===userid&& !msg.read) {
            msg.unReadCount = 1
        } else {
            msg.unReadCount = 0
        }
        const chatId = msg.chat_id
        
        //get saved lastMsg
        let lastMsg = lastMsgObjs[chatId]
        //not
        if (!lastMsg) {
            lastMsgObjs[chatId] = msg
        } else { //yes
            //save accounted unread msg
            const unReadCount = lastMsg.unReadCount + msg.unReadCount
            //if msg is laster than lastMsg, save current msg to be lastMsg
            if (msg.create_time > lastMsg.create_time) {
                lastMsgObjs[chatId] = msg
            }
            //accelate unreadCount
            lastMsgObjs[chatId].unReadCount = unReadCount
        }
        
    })
    //2.get all lastMsg array
    const lastMsgs = Object.values(lastMsgObjs)
    //3. sort lastMsg array
    lastMsgs.sort(function (m1, m2) {
        return m2.create_time - m1.create_time
    })
    return lastMsgs
}

class Message extends Component {
    render() {
        const { user } = this.props
        const { users, chatMsgs } = this.props.chat
        //group chatMsgs in chat_id
        const lastMsgs = getLastMsgs(chatMsgs, user._id)
        
        return (
            <List style={{ marginTop: 50, marginBottom: 50 }}>
                {
                    lastMsgs.map(msg => {
                        //get target user id
                        const targetUserId = msg.to===user._id ? msg.from : msg.to
                        const targetUser = users[targetUserId]
                        return (
                            <Item
                                key={msg._id}
                                extra={<Badge text={msg.unReadCount} />}
                                thumb={targetUser.header ? require(`../../assets/images/${targetUser.header}.png`) : null}
                                arrow='horizontal'
                                onClick = {() => this.props.history.push(`/chat/${targetUserId}`)}
                            >
                                {msg.content}
                                <Brief>{targetUser.username}</Brief>
                            </Item>
                        )
                    })
                }
            </List>
        )
    }
}
export default connect(
    state => ({ user: state.user, chat: state.chat }),
    {}
)(Message)