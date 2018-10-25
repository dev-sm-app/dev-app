import React, { Component } from 'react'
import axios from "axios"
import {userData} from '../../ducks/reducer';
import {connect} from 'react-redux';
import PR from './../profileroutes/ProfileRoutes';

class Profile extends Component {
  constructor(){
    super();
    this.state= {
      
    }
  }
  componentDidMount(){
    axios.get('/api/auth/setUser').then(res => {
        this.props.userData(res.data);
    })
}


  render() {

    return (
    <div className='bg-profile'>
      <div className="img-layer">
        <div>
              <img src={this.props.user.picture} alt='' />   
        </div>
        <div>
              <h5>Posts</h5>
        </div>
        <div>
              <h5>Followers</h5>
        </div>
        <div>
              <h5>Following</h5> 
        </div>
      </div> 
      <div className='pers-info'>
          <div>
              <h7>{this.props.user.firstname}{` `}{this.props.user.lastname}</h7>|<p>{this.props.user.developertype}</p>
          </div>
              <p>{'   -'}{this.props.user.bio}</p>
      </div>
        <div>
          <PR />
        </div>
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