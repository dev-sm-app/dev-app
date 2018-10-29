import React, { Component } from "react";

import { connect } from  "react-redux"
import { updateCurrentlyMessaging } from "../../ducks/reducer"

class Recent extends Component {
  render() {
    const { recent } = this.props
    return (
      <div onClick={this.props.updateCurrentlyMessaging(recent)} className="recent_contacts">
        <img src={recent.picture} alt="" />
        <p>{`${recent.firstname} ${recent.lastname[0]}`}</p>
      </div>
    );
  }
}

export default connect(null, {updateCurrentlyMessaging})(Recent);