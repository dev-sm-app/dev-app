import React, { Component } from "react";
import axios from 'axios';
import {userData} from '../../ducks/reducer';
import {connect} from 'react-redux';
import Post from '../views/Post';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: [
                {
                firstName: "David",
                lastName: "Hasslehoff",
                picture: '',
                developerType: "Web Developer",
                date: '10/31/2018',
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc sed velit dignissim sodales ut eu sem. Habitant morbi tristique senectus et netus. Duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Egestas diam in arcu cursus. Sit amet nisl suscipit adipiscing bibendum. Integer quis auctor elit sed vulputate mi. Enim praesent elementum facilisis leo vel fringilla est ullamcorper eget. Urna condimentum mattis pellentesque id nibh. Risus in hendrerit gravida rutrum quisque non tellus orci. Tristique senectus et netus et malesuada fames ac turpis egestas. Ipsum dolor sit amet consectetur adipiscing. Magnis dis parturient montes nascetur ridiculus mus. Sit amet consectetur adipiscing elit."
                },
                {
                firstName: "Pete",
                lastName: "Peterson",
                picture: '',
                developerType: "UX/UI Developer",
                date: '10/31/2018',
                description: 'Tristique senectus et netus et malesuada fames ac turpis egestas. Leo integer malesuada nunc vel risus commodo. Nibh tortor id aliquet lectus proin nibh. Suspendisse in est ante in. Risus nec feugiat in fermentum posuere urna. ' 
                }   
            ]
        }
    }    

    componentDidMount(){
        axios.get('/api/auth/setUser').then(res => {
            this.props.userData(res.data);
            console.log(this.props.userData)
        })
    }
    render() {

        let displayAllPosts = this.state.posts.map((post) => {
            return (
                <Post 
                    firstName={post.firstName}
                    lastName={post.lastName}
                    picture={post.picture}
                    developerType={post.developerType}
                    date={post.date}
                    description={post.description}
                />
            )
        })

        return (
            <div className="mainHome">
                <input type="text" placeholder=">_"/>
                {displayAllPosts}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {userData})(Home);