import React, { Component } from 'react'
import axios from "axios"
import {userData} from '../../ducks/reducer';
import {connect} from 'react-redux';

class Profile extends Component {
  constructor(){
    super();
    this.state= {
      info: true,
      posts: false,
      friends: false,
      first: '',
      last: '',
      dev: '',
      company: ''
    }
  }
  async componentDidMount(){
    try {
      let userRes = await axios.get("/api/auth/setUser")
        this.props.userData(userRes.data);
    }
    catch(err) {
      if(err.response.status === 401) {
        alert("You need to login")
        this.props.history.push("/")
      }
    }
}

  handleChange(prop, val){
    this.setState({[prop]: val})
  }

  infoButton(){
    this.setState({info: true, posts: false, friends: false})
  }
  postButton(){
    this.setState({info: false, posts: true, friends: false})
  }
  friendButton(){
    this.setState({info: false, posts: false, friends: true})
  }
  Save(){
    axios.put('/api/update', {first: this.state.first, last: this.state.last,
    dev: this.state.dev, company: this.state.company}).then(res => {})
  }

  render() {
const info = (this.state.info ? 
    <div className='info-boxes'>
      <div className='names'>
        <div>
          <p>First Name</p>
          <input value={this.state.first} onChange={(e) => this.handleChange('first', e.target.value)} />
        </div>
        <div>
          <p>Last Name</p>
          <input value={this.state.last} onChange={(e) => this.handleChange('last', e.target.value)} />
        </div>
      </div>
      <div className='types'>
        <div>
          <div>
            <div>
              <p>Developer Type</p>
            </div>
            <div>
              <select value={this.state.dev} onChange={(e) => this.handleChange('dev', e.target.value)}>
                <option value='Web Development'>Web</option>
                <option value='IOS Development'>IOS</option>
                <option value='Salesforce Development'>salesforce</option>
                <option value='UI/UX Design'>UI/UX</option>
                <option value='QA Engineer'>QA Engineer</option>
              </select>
                
            </div>
          </div>
        <div>
          <div>
            <p>Current Employer</p>
          </div>
          <div>
            <input value={this.state.company} onChange={(e) => this.handleChange('company', e.target.value)} />
          </div>
         <div>
          <button onClick={() => this.Save()}>Save</button>
         </div>
        </div> 
      </div>
    </div>
  </div>
        : null);


const post = (this.state.posts ? 
    <div><h1>post</h1></div>
    : null);
const friend = (this.state.friends ? 
    <div><h1>friend</h1></div>
    : null);




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
          <p>this is my bio that could take up alot of charactors so all the people can see it in the screen</p>
      </div>
      <div className='toggle-bar'>
      <div>
        <button onClick={() => this.infoButton()}>info</button>
      </div>
      <div>
        <button onClick={() => this.postButton()}>posts</button>
      </div>
      <div>
        <button onClick={() => this.friendButton()}>friends</button>
      </div>
      </div>
      {info}
      {post}
      {friend}
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