import React, { Component } from 'react'
import axios from "axios"

class Profile extends Component {
  componentDidMount(){
    axios.get('/api/auth/setUser').then(res => {
        this.props.userData(res.data);
        console.log(this.props.userData)
    })
}

  render() {
    return (
      <div>
        <h1>Profile</h1>
      </div>
    )
  }
}

export default Profile