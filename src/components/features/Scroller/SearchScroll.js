import React, { Component } from 'react';
import axios from 'axios';
import removeFriend from './../../../Styles/images/remove.png';
import addFriend from './../../../Styles/images/user.png';
import message from './../../../Styles/images/speech-bubble.png';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateFriendName, updateCurrentlyMessaging} from '../../../ducks/reducer'

class SearchScroll extends Component {
      constructor(){
            super();
            this.state = {
                  friend: null
            }
      }
      componentDidMount(){
            this.setState({friend: this.props.user.friend})
      }
          addFriend = (e) => {
        axios.post('/api/addfriend', {id: e.id}).then(res => {})
            this.setState({friend: true})
    }

    removeFriend = (e) => {
        axios.delete(`/api/removefriend/${e.id}`).then(res => {})
             this.setState({friend: false})  
    }

    directMessage = async (e) => {
      console.log("before")
      await axios.post('/api/recents', {id: e.id})
      console.log("after")
      this.props.updateFriendName(`${e.firstname} ${e.lastname[0]}`);
      this.props.updateCurrentlyMessaging(e);
      this.props.history.push('/messages')
    }
     
  render() {

    return (
<div id='search-info' >
        <div>
              <img className='img'  src={this.props.user.picture} alt='' />
              <div>
                    <p>{this.props.user.firstname}{' '}{this.props.user.lastname}</p>  
              </div>
        </div>
        <div id='add-friend'> 
            <div className='add-remove'>
                  {this.state.friend ?
                  <img  src={removeFriend} alt='X' onClick={() => this.removeFriend(this.props.user)}/>
                  :
                  <img src={addFriend} alt='' onClick={() => this.addFriend(this.props.user)} />}        
            </div>
            <div className='tomess'>
                  <img src={message} alt='' onClick={() => this.directMessage(this.props.user)}/>        
            </div>
        </div>
    </div>
    )
  }
}
export default connect(null, {updateFriendName, updateCurrentlyMessaging})(withRouter(SearchScroll))




