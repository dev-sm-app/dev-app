import React, { Component } from "react";
import { connect } from "react-redux";

class Message extends Component {
  render() {
    const className =
      this.props.user.id === this.props.userid
        ? "user_message"
        : "friend_message";
    return (
      <div className={className}>
        <div>
          <p />
        </div>
        <img src="" alt="" />
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
