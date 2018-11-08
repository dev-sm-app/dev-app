import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {userData} from './../../ducks/reducer';

 class Postroutes extends Component {
    constructor(){
        super();
        this.state = {
            posts: []
        }
    }
    componentDidMount(){
        axios.get('/api/post/count').then(post => {
            this.setState({posts: post.data})
        })    }
  render() {
      console.log(this.state.posts)
    return (
      <div>
        {this.state.posts.map((post, i) => {
            return(
                <div key={i}>
                    <div>
                        <img src={this.props.user.picture} alt='' />
                    </div>
                    <div>
                        <p>{this.props.user.firstname}{' '}{this.props.user.lastname}</p>
                        <p>{post.postdate}</p>
                    </div>
               {post.description ? 
                    <div>
                        <p>{post.description}</p>
                    </div>: null
                }
                   {post.code ? 
                    <div>
                        <p>{post.code}</p> 
                    </div>: null }
                    {post.picture ?
                    <div>
                        <img src={post.picture} alt='' />
                    </div>: null}
                </div>
                )
        })}
      </div>
    )
  }
}
function mapStateToProps(state){
    return{
        user: state.user
    }
}
export default connect(mapStateToProps)(Postroutes);