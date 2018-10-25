import React, {Component} from 'react';

class Message extends Component {
    render() {
        const className = this.props.user.id === this.props.userid ? 
        'user_message' : 'friend_message'
        return(
            <div className={className}>
                <div>
                    <p></p>
                </div>
                <img src="" alt=""/>
            </div>
        )
    }
}

export default Message;