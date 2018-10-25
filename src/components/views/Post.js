import React from 'react';
import userImage from '../../Styles/images/profile-blue.png';
import postImage from '../../Styles/images/cool-stuff-geek-desk-gift-for-fathers-day.jpg'
import likePost from '../../Styles/images/like-blue.png'
import commentPost from '../../Styles/images/comment-blue.png'

const Post = props => {
    
        return(
            <div className="mainPost">
                <header>
                    <img src={userImage} alt="user"/>
                        <section>
                            <h1>{props.firstName} {props.lastName}</h1>
                            <h3>{props.developerType}</h3>
                            <p>{props.date}</p>
                        </section>
                </header>
                <main>
                    <h2>{props.description}</h2>
                    <img src={postImage} alt=""/>
                </main>
                <footer>
                    <img src={likePost} alt=""/>
                    <img src={commentPost} alt=""/>
                </footer>
            </div>
        )
    }

export default Post;