import React, { Component } from "react";
import axios from 'axios';
import io from 'socket.io-client';
import Recent from '../../components/Recent/Recent';
import Message from "../../components/Message/Message"
import userImage from '../../Styles/images/profile-blue.png';
import sendImage from './../../Styles/images/send.png';

import { connect } from "react-redux"
import { updateFriendName, userData } from "../../ducks/reducer"

class Messages extends Component {
    constructor() {
        super()

        this.state = {
            messages: [{
                id: 1,
                userid: 5,
                friendid: 6,
                message: "Hello this is a random message from your friend. What will happen if I add more text like this?", 
                picture: userImage
            },
            {
                id: 2,
                userid: 6,
                friendid: 5,
                message: "And another message back to you. And another one so you see how it looks on more than one line.",
                picture: userImage
            }],
            recents: [{
                id: 5,
                firstname: 'Sam',
                lastname: 'Jones',
                picture: userImage
            }, 
            {
                id: 5,
                firstname: 'Tim',
                lastname: 'White',
                picture: userImage
            }]
        }

        this.socket = io.connect('http://localhost:3030')
    }

    async componentDidMount () {
        let userRes = await axios.get("/api/auth/setUser")
        this.props.userData(userRes.data)
    }

    createRoom (friendID, userID) {
        const string = `${friendID} ${userID}`
            return string.split(' ')
            .map(ID => Number(ID))
            .sort((a, b) => a - b )
            .join('')
    }

    joinRoom (id, name, picture) {
        const room = this.createRoom(id, this.props.user.id)
        this.socket.emit('join room', {room})
        this.props.updateFriendName(name)
    }

    render() {

        if(this.state.recents.length){
            var recents = this.state.recents.map(recent => {
                return (
                    <Recent 
                        key={recent.id}
                        recent={recent}
                    />
                )
            })
        }
        if(this.state.messages.length){
            var messages = this.state.messages.map(message => {
                return (
                    <Message 
                        key={message.id}
                        message={message}
                    />
                )
            })
        }

        return (
            <div className="mainMessages">
                <div className="contact_container">
                    {recents}
                </div>
                <div className="messages_container">
                    <div className="friend_name">
                        <h1>Chad</h1>
                    </div>
                    <div className="conversation_container">
                        {messages}
                        <div className="type_send">
                            {/* <button className="dots">...</button> */}
                            <input type="text" placeholder="Type Your Message..."/>
                            <img src={sendImage} alt=""/>
                            {/* <button className="send">Send</button> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {updateFriendName, userData})(Messages);