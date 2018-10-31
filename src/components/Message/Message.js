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
        </div>
        <div>
          <img src={this.props.message.picture} alt="" />
        </div>
      </div>
      :
      <div className="friend_message">
        <div>
          <img src={this.props.message.picture} alt="" />
        </div>
        <div className="text_message">
          <text>{this.props.message.message}</text>
        </div>
      </div>

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