import React, { Component } from 'react'
import axios from "axios"
import {userData} from '../../ducks/reducer';
import {connect} from 'react-redux';

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

const mapStateToProps = (state) => {
  return {
      user: state.user
  }
}

export default connect (mapStateToProps, {userData})(Profile);