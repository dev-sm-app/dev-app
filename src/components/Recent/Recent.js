import React, { Component } from "react";
import { connect } from  "react-redux"
import { updateCurrentlyMessaging } from "../../ducks/reducer"

class Recent extends Component {

  handleJoin(friendID, userID, friendObj) {
    this.props.updateCurrentlyMessaging(friendObj)
    this.props.joinRoom(friendID, `${friendObj.firstname} ${friendObj.lastname[0]}`)
  }

  render() {
    const { recent } = this.props
    return (
      <div onClick={() => this.handleJoin(recent.id, this.props.user.id, recent)} className="recent_contacts">
        <img src={recent.picture} alt="" />
        <p>{`${recent.firstname} ${recent.lastname[0]}`}</p>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, {updateCurrentlyMessaging})(Recent);