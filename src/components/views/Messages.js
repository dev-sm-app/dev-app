import React, { Component } from "react";
import axios from 'axios';
import io from 'socket.io-client';
import Recent from '../../components/Recent/Recent';
import Message from "../../components/Message/Message"
import sendImage from '../../Styles/images/send.png';

import { createRoom, sendMessage } from "../../Logic/MessageLogic"

import { connect } from "react-redux"
import { updateFriendName, userData } from "../../ducks/reducer"

class Messages extends Component {
    constructor() {
        super()

        this.state = {
            messages: [],
            recents: []
        }

        this.socket = io.connect('http://localhost:3030')
    }

    async componentDidMount() {
        let userRes = await axios.get("/api/auth/setUser")
        this.props.userData(userRes.data)
        let recents = await axios.get(`/api/recents?userId=${this.props.user.id}`)
        this.setState({
            recents: recents.data
        })
    }

    async componentDidUpdate(prevProps) {

    }

    joinRoom(id, name, picture) {
        const room = createRoom(id, this.props.user.id)
        this.socket.emit('join room', { room })
        this.props.updateFriendName(name)
    }

    render() {
        if (this.state.recents.length) {
            var recents = this.state.recents.map(recent => {
                return (
                    <Recent
                        key={recent.id}
                        recent={recent}
                    />
                )
            })
        }
        if (this.state.messages.length) {
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
                    </div>
                    <div className="conversation_container">
                        {
                            this.state.messages.length
                                ?
                                messages
                                :
                                <p>Click on a recent person to continue messaging or go to your profile page or search page to choose someone to message</p>
                        }
                        <div className="type_send">
                            <button className="dots">...</button>
                            <input type="text" placeholder="Type Your Message..." />
                            <img src={sendImage} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        currentlyMessaging: state.currentlyMessaging
    }
}

export default connect(mapStateToProps, { updateFriendName, userData })(Messages);
