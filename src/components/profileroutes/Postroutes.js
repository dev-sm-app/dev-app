import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {userData} from './../../ducks/reducer';
import {Controlled as CodeMirror} from 'react-codemirror2';
import "codemirror/lib/codemirror.css";
import "codemirror/theme/seti.css";
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
      <div id='prof-posts'>
      {!this.state.posts ? null :
        this.state.posts.map((post, i) => {
            const options = {
                mode: post.mode,
                theme: "seti",
                lineNumbers: true,
                lineWrapping: true
            }
            const difference = Date.now() - Number(post.postdate)
            const day = 86400000
            const hour = 3600000
            const minute = 60000
            const timePassed = difference >= day ?
                Math.round(difference / day) :
                difference >= hour ?
                Math.round(difference / hour) :
                Math.round(difference / minute)

            const date = difference >= day ?
                `${timePassed} days ago` :
                difference >= hour ?
                `${timePassed} hours ago` :
                difference >= minute ?
                `${timePassed} minutes ago` :
                'Just barely'
            return(
                <div id='key-box'  key={i}>
                    <header>
                            <img src={this.props.user.picture} alt='' />
                        <div>
                            <p>{this.props.user.firstname}{' '}{this.props.user.lastname}</p>
                            <p>{date}</p>
                        </div>
                    </header>
                    <section id='post-section'>
                    {post.description ? 
                        <div>
                            <p>{post.description}</p>
                        </div>: null
                                }
                    {post.code ? 
                        <div className='post_code_container'>
                        <p>{post.mode}</p>
                        {/* <div className='code_container'>
                            <CodeMirror options={options} value={post.code} />
                            
                        </div> */}
                            <p>{post.code}</p>
                        </div>: null }
                    {post.picture ?
                        <div>
                            <img src={post.picture} alt='' />
                        </div>: null}
                    </section>
                    
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