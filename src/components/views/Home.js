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
                description: "This is a test description."
                },
                {
                firstName: "Pete",
                lastName: "Peterson",
                picture: '',
                developerType: "UX/UI Developer",
                date: '10/31/2018',
                description: '' 
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