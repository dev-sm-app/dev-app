import React, {Component} from 'react';
import userImage from '../../Styles/images/user.png';
import postImage from '../../Styles/images/cool-stuff-geek-desk-gift-for-fathers-day.jpg'
import likePost from '../../Styles/images/like.png'

class Post extends Component {
    
    render() {
        return(
            <div className="mainPost">
                <header>
                    <img src={userImage} alt="user"/>
                    <h1>Joe Hasslehoff</h1>
                </header>
                <main>
                    <h2>Check these out...</h2>
                    <img src={postImage} alt=""/>
                </main>
                <footer>
                    <img src={likePost} alt=""/>
                    <img src="" alt=""/>
                </footer>
            </div>
        )
    }
}
export default Post;