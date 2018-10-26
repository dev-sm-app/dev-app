import React, { Component } from "react";
import axios from 'axios';
import io from 'socket.io-client';
import Recent from '../../components/Recent/Recent';
import Message from "../../components/Message/Message"
import userImage from '../../Styles/images/profile-blue.png';

class Messages extends Component {
    constructor() {
        super()

        this.state = {
            messages: [{
                id: 1,
                userid: 5,
                friendid: 6,
                message: "Hello this is a random message."
            },
            {
                id: 2,
                userid: 6,
                friendid: 5,
                message: "And another message back to you."
            }],
            recents: [{
                id: 5,
                firstName: 'Sam',
                picture: ''
            }]
        }

        this.socket = io.connect('http://localhost:3030')
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
                    <div className="friend">
                        <img src={userImage} alt="user"/>
                        <h3>Name</h3>
                    </div>
                    <div className="friend">
                        <img src={userImage} alt="user"/>
                        <h3>Name</h3>
                    </div>
                    <div className="friend">
                        <img src={userImage} alt="user"/>
                        <h3>Name</h3>
                    </div>
                    {recents}
                </div>
                <div className="messages_container">
                    <div className="friend_name">
                        <h1>Chad</h1>
                    </div>
                    <div className="conversation_container">
                        {messages}
                        <div className="type_send">
                            <button className="dots">...</button>
                            <input type="text"/>
                            <button className="send">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Messages;