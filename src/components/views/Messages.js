import React, { Component } from "react";
import axios from "axios";
import io from "socket.io-client";
import Recent from "../../components/Recent/Recent";
import Message from "../../components/Message/Message";
import sendImage from "../../Styles/images/send.png";
import PullUpMenu from "../PullUpMenu/PullUpMenu"

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
      userinput: "",
      messagepicture: "",
      code: "",
      mode: "javascript"
    };

    this.joinRoom = this.joinRoom.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.updateMessages = this.updateMessages.bind(this);
  }

  async componentDidMount() {
    try {
      let userRes = await axios.get("/api/auth/setUser")
        this.props.userData(userRes.data);
    }
    catch(err) {
      if(err.response.status === 401) {
        alert("You need to login")
        this.props.history.push("/")
      }
    }
    let recents = await axios.get("/api/recents");
    this.setState({
      recents: recents.data
    });
    this.socket = io("http://localhost:3030");
    this.socket.on("message sent", this.updateMessages);
    if(this.props.currentlyMessaging.id) {
      this.joinRoom(this.props.currentlyMessaging.id, `${this.props.currentlyMessaging.firstname} ${this.props.currentlyMessaging.lastname[0]}`)
      let messages = await axios.get(`/api/messages?userId=${this.props.user.id}&friendId=${this.props.currentlyMessaging.id}`)
      this.setState({
        messages: messages.data
      })
    }
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

  createMessage(message) {
    if ((this.state.userinput.length > 0 && this.state.userinput.length <= 500 && this.state.room)
    || (this.state.messagepicture.length > 0 && this.state.room)
    || (this.state.code.length > 0 && this.state.code.length < 500 && this.state.room)) {
      const date = this.createDate(new Date());

      let actualMessage = {
        userid: this.props.user.id,
        friendid: this.props.currentlyMessaging.id,
        authorpicture: this.props.user.picture,
        message,
        messagepicture: this.state.messagepicture,
        messagedate: date,
        code: this.state.code,
        mode: this.state.mode
      }
      let newMessageArr = sendMessage(this.state.messages, actualMessage)
      this.setState({
        messages: newMessageArr
      });
      this.socket.emit("send message", {
        actualMessage,
        roomid: this.state.room
      });
      this.setState({
        userinput: "",
        code: "",
        mode: ""
      });
      axios.post("/api/sendmessage", actualMessage)
    } else {
      alert("You must be in a chat room and You must send a message, picture, or code snippet (messages and code snippets have a 500 character limit)");
    }
  }

  createDate(date) {
    if(date.getMinutes() < 10) {
      return `${date.getHours()}:0${date.getMinutes()}`
    }
    return `${date.getHours()}:${date.getMinutes()}`
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

  updateCode = (code) => {
    this.setState({code})
  }

  updateMode = (e) => {
    this.setState({
      mode: e.target.value
    })
  }

  handleDrop = (files) => {
    const {
      REACT_APP_CLOUDINARY_URL,
      REACT_APP_CLOUDINARY_API,
      REACT_APP_CLOUDINARY_PRESET
    } = process.env

    const formData = new FormData()
    formData.append("file", files[0])
    formData.append("tags", "DevApp, medium, gist")
    formData.append("upload_preset", `${REACT_APP_CLOUDINARY_PRESET}`)
    formData.append("api_key", `${REACT_APP_CLOUDINARY_API}`)
    formData.append("timestamp", (Date.now() / 1000 | 0))

    axios.post(`${REACT_APP_CLOUDINARY_URL}`, formData)
    .then(res => {
      console.log(res.data)
      this.setState({
        messagepicture: res.data.secure_url
      })
    })
  }

  render() {
    console.log(this.state.recents)
    if (this.state.recents.length) {
      var recents = this.state.recents.map(recent => {
        return (
          <Recent key={recent.id} recent={recent} joinRoom={this.joinRoom} />
        );
      });
    }
    if (this.state.messages.length) {
      var messages = this.state.messages.map((message, i) => {
        return <Message key={i} message={message} />;
      });
    }
    return (
      <div className="mainMessages">
        <div className="contact_container">{recents}</div>
        <div className="messages_container">
          <div className="conversation_container">
            <div className="actual_messages">{messages}</div>
            <div className="type_send">
            <PullUpMenu 
            code={this.state.code}
            mode={this.state.mode}
            updateCode={this.updateCode}
            updateMode={this.updateMode}
            handleDrop={this.handleDrop}
            roomCheck={this.state.room}
            />
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
                onClick={() => this.createMessage(this.state.userinput)}
              />
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
  };
}

export default connect(mapStateToProps, {updateFriendName, userData})(Messages)