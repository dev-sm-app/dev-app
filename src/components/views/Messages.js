import React, { Component } from "react";
import axios from "axios";
import io from "socket.io-client";
import Recent from "../../components/Recent/Recent";
import Message from "../../components/Message/Message";
import userImage from "../../Styles/images/profile-blue.png";
import sendImage from "../../Styles/images/send.png";

import { createRoom, sendMessage } from "../../Logic/MessageLogic"

import { connect } from "react-redux"
import { updateFriendName, userData } from "../../ducks/reducer"

class Messages extends Component {
  constructor() {
    super();

    this.state = {
      messages: [
        {
          id: 1,
          userid: 5,
          friendid: 6,
          message:
            "Hello this is a random message from your friend. What will happen if I add more text like this?",
          picture: userImage
        },
        {
          id: 2,
          userid: 6,
          friendid: 5,
          message:
            "And another message back to you. And another one so you see how it looks on more than one line.",
          picture: userImage
        }
      ],
      recents: [
        {
          id: 5,
          firstname: "Sam",
          lastname: "Jones",
          picture: userImage
        },
        {
          id: 9,
          firstname: "Tim",
          lastname: "White",
          picture: userImage
        }
      ],
      room: '',
      userinput: ''
    };

    this.socket = io.connect("http://localhost:3030");
    this.joinRoom = this.joinRoom.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.updateMessages = this.updateMessages.bind(this);
  }

  async componentDidMount() {
    let userRes = await axios.get("/api/auth/setUser")
    this.props.userData(userRes.data)
    let recents = await axios.get(`/api/recents?userId=${this.props.user.id}`)
    this.setState({
        recents: recents.data
    })
    this.socket.on('message sent', this.updateMessages)
}

async componentDidUpdate(prevProps) {
  if(prevProps.currentlyMessaging.id !== this.props.currentlyMessaging.id){
    let messages = await axios.get(`/api/messages?userId=${this.props.user.id}&friendId=${this.props.currentlyMessaging.id}`)
    this.setState({
      messages: messages.data
    })
  }
}

updateMessages (message) {
  const room = this.createRoom(message.friendid, message.userid)
  if(message.roomid === room){
    this.setState({
      messages: [...this.state.messages, message]
    })
  }
}

async sendMessage (message) {
  const date = this.createDate(new Date());
  // this.socket.emit('send message', {
  //   date, 
  //   message, 
  //   roomid:this.state.room, 
  //   authorid:this.props.user.id, 
  //   receiverid:this.props.currentlyMessaging.id, 
  //   authorimage:this.props.user.picture
  // })
  let messageRes = await axios.post('/api/sendmessage', {
    userId:this.props.user.id, 
    friendId:this.props.currentlyMessaging.id, 
    authorPicture:this.props.user.picture, message, 
    date,
    type:'normal message'
  })
  this.socket.emit('send message', {
    messageRes, 
    roomid:this.state.room
  }) 
}

createDate (date) {
  // if(date.getHours() >= 10 && date.getMinutes() >= 10){
  //   return `${date.getHours()}:${date.getMinutes}`
  // }
  // if(date.getHours() >= 10 && date.getMinutes < 10){
  //   return `${date.getHours()}:0${date.getMinutes()}`
  // }
  // if(date.getHours() < 10 && date.getMinutes >= 10){
  //   return `0${date.getHours()}:${date.getMinutes()}`
  // }
  return `${date.getHours()}:${date.getMinutes()}`
}

joinRoom(id, name) {
    const room = createRoom(id, this.props.user.id)
    this.socket.emit('join room', { room })
    this.props.updateFriendName(name)
    this.setState({
      room
    })
}

handleInput (e) {
  this.setState({
    userinput: e.target.value
  })
}

  render() {
    if (this.state.recents.length) {
      var recents = this.state.recents.map(recent => {
        return <Recent 
            key={recent.id} 
            recent={recent}
            joinRoom={this.joinRoom} />;
      });
    }
    if (this.state.messages.length) {
      var messages = this.state.messages.map(message => {
        return <Message 
            key={message.id} 
            message={message} />;
      });
    }
    console.log(this.state.userinput)
    return (
      <div className="mainMessages">
        <div className="contact_container">{recents}</div>
        <div className="messages_container">
          <div className="friend_name">
        
          </div>
          <div className="conversation_container">
            {messages}
            <div className="type_send">
              <button className="dots">...</button>
              <input 
              type="text" 
              placeholder="Type Your Message..." 
              onChange={this.handleInput} 
              value={this.state.userinput}
              />
              <img src={sendImage} alt="" onClick={() => this.sendMessage(this.state.userinput)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        currentlyMessaging: state.currentlyMessaging
    }
}

export default connect(mapStateToProps, { updateFriendName, userData })(Messages);
