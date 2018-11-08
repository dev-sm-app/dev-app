import React, { Component } from "react";
import { connect } from "react-redux";

class Message extends Component {
  render() {
    const className =
      this.props.user.id === this.props.message.userid
        ? "user_message"
        : "friend_message";
    
    const messageAlign = 
      className === "user_message"
      ?
      <div className="user_message">
          <div className="text_message">
            <text>{this.props.message.message}</text>
            <div className="userMessageDateStamp">{this.props.message.messagedate}</div>
          </div>
        <div>
          <img src={this.props.message.authorpicture} alt="" />
        </div>
      </div>
      :
      <div className="friend_message">
        <div>
          <img src={this.props.message.authorpicture} alt="" />
        </div>
        <div className="text_message">
          <text>{this.props.message.message}</text>
          <div className="userMessageDateStamp">{this.props.message.messagedate}</div>
        </div>
      </div>
console.log(this.props.message)
    return (
      <div className={className}>
        {messageAlign}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Message);