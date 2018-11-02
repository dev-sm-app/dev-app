import React, { Component } from "react";
import axios from "axios";
import io from "socket.io-client";
import Recent from "../../components/Recent/Recent";
import Message from "../../components/Message/Message";
import sendImage from "../../Styles/images/send.png";
import { Link, withRouter } from "react-router-dom";
import message from "../../Styles/images/message-blue.png";
import home from "../../Styles/images/home-blue.png";
import search from "../../Styles/images/search-blue.png";

import { createRoom, sendMessage } from "../../Logic/MessageLogic";

import { connect } from "react-redux";
import { updateFriendName, userData } from "../../ducks/reducer";

class Messages extends Component {
  constructor() {
    super();

    this.state = {
      messages: [],
      recents: [],
      room: "",
      userinput: ""
    };

    this.joinRoom = this.joinRoom.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.updateMessages = this.updateMessages.bind(this);
  }

  async componentDidMount() {
    let userRes = await axios.get("/api/auth/setUser");
    this.props.userData(userRes.data);
    let recents = await axios.get(`/api/recents?userId=${this.props.user.id}`);
    this.setState({
      recents: recents.data
    });
    this.socket = io("http://localhost:3030");
    this.socket.on("message sent", this.updateMessages);
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.currentlyMessaging.id !== this.props.currentlyMessaging.id) {
      let messages = await axios.get(
        `/api/messages?userId=${this.props.user.id}&friendId=${
          this.props.currentlyMessaging.id
        }`
      );
      this.setState({
        messages: messages.data
      });
    }
  }

  updateMessages(message) {
    if (
      this.state.room === message.roomid &&
      this.props.user.id !== message.actualMessage.userid
    ) {
      this.setState({
        messages: [...this.state.messages, message.actualMessage]
      });
    }
  }

  async sendMessage(message) {
    if (this.state.userinput.length > 0 && this.state.userinput.length <= 500) {
      const date = this.createDate(new Date());

      let messageRes = await axios.post("/api/sendmessage", {
        userId: this.props.user.id,
        friendId: this.props.currentlyMessaging.id,
        authorPicture: this.props.user.picture,
        message,
        date,
        type: "normal message"
      });
      let actualMessage = messageRes.data;
      this.setState({
        messages: [...this.state.messages, actualMessage]
      });
      this.socket.emit("send message", {
        actualMessage,
        roomid: this.state.room
      });
      this.setState({
        userinput: ""
      });
    } else if (
      this.state.room &&
      (this.state.userinput.length === 0 || this.state.userinput.length > 500)
    ) {
      alert("Your message must be betweeen 0 - 500 characters");
    }
  }

  createDate(date) {
    if(date.getHours() >= 10 && date.getMinutes() >= 10){
      return `${date.getHours()}:${date.getMinutes}`
    }
    if(date.getHours() >= 10 && date.getMinutes < 10){
      return `${date.getHours()}:0${date.getMinutes()}`
    }
    if(date.getHours() < 10 && date.getMinutes >= 10){
      return `0${date.getHours()}:${date.getMinutes()}`
    }
    // return `${date.getHours()}:${date.getMinutes()}`;
  }

  joinRoom(id, name) {
    const room = createRoom(id, this.props.user.id);
    this.socket.emit("join room", { room });
    this.props.updateFriendName(name);
    this.setState({
      room
    });
  }

  handleInput(e) {
    this.setState({
      userinput: e.target.value
    });
  }

  render() {
    if (this.state.recents.length) {
      var recents = this.state.recents.map(recent => {
        return (
          <Recent key={recent.id} recent={recent} joinRoom={this.joinRoom} />
        );
      });
    }
    if (this.state.messages.length) {
      var messages = this.state.messages.map(message => {
        return <Message key={message.id} message={message} />;
      });
    }
    console.log(this.state.room);
    return (
      <div className="mainMessages">
        <div className="contact_container">{recents}</div>
        <div className="messages_container">
          {/* <div className="friend_name">
        
          </div> */}
          <div className="conversation_container">
            <div className="actual_messages">{messages}</div>
            <div className="type_send">
              <button className="dots">...</button>
              <input
                type="text"
                disabled={!this.state.room}
                placeholder="Type Your Message..."
                onChange={this.handleInput}
                value={this.state.userinput}
              />
              <img
                src={sendImage}
                alt=""
                onClick={() => this.sendMessage(this.state.userinput)}
              />
            </div>
            {/* <div className="altNavBarContainer">
            <div className="altNavBar">
              <div className="message_divider">
                {this.props.location.pathname === "/messages" ? (
                  <div className="inner_message_box">
                    <Link to="/messages">
                      <img src={message} alt="message" className="message" />
                    </Link>
                  </div>
                ) : (
                  <div className="inner_message_box_no_orange">
                    <Link to="/messages">
                      <img src={message} alt="message" className="message" />
                    </Link>
                  </div>
                )}
              </div>

              <div className="home_divider">
                {this.props.location.pathname === "/home" ? (
                  <div className="inner_message_box">
                    <Link to="/home">
                      <img src={home} alt="home" className="home" />
                    </Link>
                  </div>
                ) : (
                  <div className="inner_message_box_no_orange">
                    <Link to="/home">
                      <img src={home} alt="home" className="home" />
                    </Link>
                  </div>
                )}
              </div>

              <div className="search_divider">
                {this.props.location.pathname === "/search" ? (
                  <div className="inner_message_box">
                    <Link to="/search">
                      <img src={search} alt="search" className="search" />
                    </Link>
                  </div>
                ) : (
                  <div className="inner_message_box_no_orange">
                    <Link to="/search">
                      <img src={search} alt="search" className="search" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div> */}
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
  };
}

const MessagesWithRouter = withRouter(Messages)

export default connect(
  mapStateToProps,
  { updateFriendName, userData }
)(MessagesWithRouter);
