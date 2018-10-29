import React, { Component } from "react";

class Recent extends Component {
  render() {
    const { recent } = this.props;
    return (
      <div className="recent_contacts">
        <img src={recent.picture} alt="" />
        <p>{`${recent.firstname} ${recent.lastname[0]}`}</p>
      </div>
    );
  }
}

export default Recent;
