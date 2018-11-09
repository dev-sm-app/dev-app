import React, { Component } from 'react';
import axios from 'axios';
import removeFriend from './../../Styles/images/remove.png';
// import addFriend from './../../Styles/images/user.png';
import message from './../../Styles/images/speech-bubble.png';

export default class Friendroutes extends Component {
    constructor(){
        super();
        this.state = {
            users: [],
            page: 0,
            offset: 0,
            totalPages: 1,
            load: true,


        }
    }
    componentDidMount(){
        this.getFriends();
    }

    
    getFriends(){
        if(!this.state.load) return 
        if(this.state.totalPages <= this.state.page) return 
        axios.get(`/api/friends/list?offset=${this.state.offset}`).then(user => {
        this.setState({
                users: [...this.state.users, ...user.data],
                load: !(user.data.length < 10),
                offset: (this.state.offset + 10)
            });
        });
    }
    loadMore(){
        this.setState(prevState => ({
        page: prevState.page++,
        totalPages: prevState.totalPages++,
        load: false
        }), this.getFriends());
    }


  render() {
     const btnStyle = {
         bottom: '12vh',
         margin: '20%'
     }
      const friends = this.state.users.map(users => {
          return(
              <div id='search-info' key={users.id}>
                  <div>
              <img className='img'  src={users.picture} alt='' />
              <div>
                    <p>{users.firstname}{' '}{users.lastname}</p>  
              </div>
        </div>
        <div id='add-friend'> 
            <div className='add-remove'>
                  
                  <img  src={removeFriend} alt='X' onClick={this.removeFriend}/>
                  
                         
            </div>
            <div className='tomess'>
                  <img src={message} alt='' onClick={this.directMessage}/>        
            </div>
        </div>
              </div>
          )
      })

    return ( 
      
    <div id='outer-friend' style={{height: 'auto', width: '100%', backgroundColor: 'black'}}>
           {friends}
           <div className='prof-btn'>
           {this.state.load ? 
           <button style={{btnStyle}} id='button-friend' onClick={() => this.loadMore()}>Load More</button>: '' }
           </div>
           <div style={{height: '10vh', width: '100%'}}></div>
    </div>
    
    )
  }
}
