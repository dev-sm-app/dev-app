import React from 'react';
import likePost from '../../Styles/images/like-blue.png'
import commentPost from '../../Styles/images/comment-blue.png'
import { connect } from "react-redux"
import { Controlled as CodeMirror } from "react-codemirror2"

import "codemirror/lib/codemirror.css"
import "codemirror/theme/seti.css"

const Post = props => {
    const options = {
        mode: props.post.mode,
        theme: "seti",
        lineNumbers: true,
        lineWrapping: true
      }
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
    return (
        <div className="mainPost">
            <header>
                <div>
                    <img src={props.post.authorpicture} alt="user" />
                    <section>
                        <h1>{props.post.firstname} {props.post.lastname}</h1>
                        <h3>{props.post.developertype}</h3>
                        <p>{date}</p>
                    </section>
                </div>
            </header>
            <main>
                <p>{props.post.description}</p>
                {
                    props.post.picture
                    ?
                    <div className="message_picture_container">
                        <img id="message_picture" src={props.post.picture} alt="" />
                    </div>
                    :
                        null
                }
                {
                    props.post.code
                    ?
                        <div className="post_code_container">
                            <p id="code_mode">{props.post.mode}</p>
                            <div className="code_container">
                            <CodeMirror 
                            options={options}
                            value={props.post.code}
                            />
                            </div>
                        </div>
                    :
                        null
                }
            </main>
            <footer>
                <img src={likePost} alt="" />
                <img src={commentPost} alt="" />
            </footer>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Post);