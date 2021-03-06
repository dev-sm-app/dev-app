import React, { Component } from 'react'
import axios from "axios"
import {userData} from '../../ducks/reducer';
import {connect} from 'react-redux';
import PR from './../profileroutes/ProfileRoutes';


class Profile extends Component {
  constructor(){
    super();
    this.state= {
        followers: [0],
        following: [0],
        post: 0,
        posts: []
    }
  }
  async componentDidMount(){
    try {
      this.Counts();
      let userRes = await axios.get("/api/auth/setUser")
      if (userRes.data.developertype === "Web Development") {
        return (document.getElementById("myH1").style.color = '#00A4F3')
      } else if (userRes.data.developertype === "IOS Development") {
          return (document.getElementById("myH1").style.color = '#F3002B')
      } else if (userRes.data.developertype === "Salesforce Development") {
        return (document.getElementById("myH1").style.color = '#F3C900')
      } else if (userRes.data.developertype === "QA Engineer") {
        return(document.getElementById("myH1").style.color = '#FF41C1')
      } else if (userRes.data.developertype === "UX/UI Design") {
         return (document.getElementById("myH1").style.color = '#00F3C9')
      }
      this.props.userData(userRes.data);
      this.Counts();
    }
    catch(err) {
      if(err.response.status === 401) {
        alert("You need to login")
        this.props.history.push("/")
      }
    }
  }
    Counts() {
      axios.get('/api/followers/count').then(wers => {
        axios.get('/api/following/count').then(wing => {
          axios.get('/api/post/count').then(post => {
            console.log('wers', wers.data, 'wing', wing.data);
            this.setState({
              followers: wers.data[0].count,
              following: wing.data[0].count,
              post: post.data.length,
              
            });
          })
        });
      });
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
              <p>{this.state.post}</p>
        </div>
        <div>
              <h5>Followers</h5>
              <p>{this.state.followers}</p>
        </div>
        <div>
              <h5>Following</h5> 
              <p>{this.state.following}</p>
        </div>
      </div> 
      <div className='pers-info'>
          <div>
              <p>{this.props.user.firstname}{` `}{this.props.user.lastname}</p>
              <p id='myH1' >{' - '}{this.props.user.developertype}</p>
              <p>{' - '}{this.props.user.company}</p>
              <br />
          </div>
              <p>{' - '}{this.props.user.bio}</p>
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