import React, { Component } from "react";
import { connect } from "react-redux";
import { formatDate } from "../../Logic/MessageLogic"
import { Controlled as CodeMirror } from "react-codemirror2"

import "codemirror/lib/codemirror.css"
import "codemirror/theme/seti.css"

class Message extends Component {
  render() {
    const options = {
      mode: this.props.message.mode,
      theme: "seti",
      lineNumbers: true,
      lineWrapping: true
    }
    const className =
      (this.props.user.id === this.props.message.userid) ||
        (this.props.user.id === this.props.message.userId)
        ? "user_message"
        : "friend_message"

    const messageAlign =
      className === "user_message"
        ?
        <div className="user_message">
          <div className="text_message">
            <text>{this.props.message.message}</text>
            {
              this.props.message.messagepicture
                ?
                <img id="message_picture" src={this.props.message.messagepicture} alt="" />
                :
                null
            }
            {
              this.props.message.code
                ?
                <div>
                  <p id="code_mode">{this.props.message.mode}</p>
                  <div className="code_container">
                    <CodeMirror
                      options={options}
                      value={this.props.message.code}
                    />
                  </div>
                </div>
                :
                null
            }
            <div className="userMessageDateStamp">{formatDate(this.props.message.messagedate)}</div>
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
            <div className="userMessageDateStamp">{formatDate(this.props.message.messagedate)}</div>
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