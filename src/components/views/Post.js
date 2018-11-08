import React from 'react';
import likePost from '../../Styles/images/like-blue.png'
import commentPost from '../../Styles/images/comment-blue.png'

const Post = props => {
    
    const difference = Date.now() - Number(props.post.postdate)
    const day = 86400000
    const hour = 3600000
    const minute = 60000
    const timePassed = difference >= day 
    ? Math.round(difference / day)
    : difference >= hour 
    ? Math.round(difference / hour)
    : Math.round(difference / minute)

    const date = difference >= day
    ? `${timePassed} days ago`
    : difference >= hour
    ? `${timePassed} hours ago`
    : difference >= minute
    ? `${timePassed} minutes ago`
    : 'Just barely'

        return(
            <div className="mainPost">
                <header>
                    <img src={props.post.authorpicture} alt="user"/>
                        <section>
                            <h1>{props.post.firstname} {props.post.lastname}</h1>
                            <h3>{props.post.developertype}</h3>
                            <p>{date}</p>
                        </section>
                </header>
                <main>
                    <p>{props.post.description}</p>
                    <img src={props.post.picture} alt=""/>
                </main>
                <footer>
                    <img src={likePost} alt=""/>
                    <img src={commentPost} alt=""/>
                </footer>
            </div>
        )
    }

export default Post;