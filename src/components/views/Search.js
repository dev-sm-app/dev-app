import React, { Component } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';

class Search extends Component {
    constructor(){
        super();
        this.state = {
            input: '',
            select: '',
            items: 10,
            error: false,
            hasMore: true,
            isLoading: false,
            users: []
        }
}
    componentDidMount(){
        this.loadUsers();
       
    }

    
    handleChange(prop, val){
        this.setState({[prop]: val})   
    }
    Search(){
       axios.get(`/api/search?select=${this.state.select}&input=${this.state.input}`).then(res => {
           let users = res.data.user.map(user => {
               let friends = res.data.result.filter(friend => user.id === friend.friendid)
               if(friends.length){
                   user.friend = true
               } else {
                   user.friend = false
               }
               return user;
           })
           this.setState({users: users})
       }) 
    }
    loadUsers = () => {
        axios.get('/api/friend/list').then(friendList => {
            axios.get(`/api/scroll?items=${this.state.items}`).then(userList => {
                let nextUsers = userList.data.map(user => {
                    console.log(nextUsers, 'users');
                    let friends = friendList.data.filter(friend => user.id === friend.friendid)
                      if(friends.length){
                        user.friend = true
                    } else {
                        user.friend = false
                    }
                      return user;
                })
                setTimeout(() => {
                    this.setState({
                        users: [...this.state.users, ...nextUsers],
                        items: (this.state.items += 10)
                    })
                }, 1000)
            });
        })  
    }

 
    render() {
        const search = this.state.users.map(user => {
             return(                   
                                <div id='search-info' key={user.id}>
                                    <div>
                                        <img style={{width: '50px', height: '50px'}} src={user.picture} alt='' />
                                        <p>{user.firstname}{' '}{user.lastname}{' '}|{' '}{user.developertype}</p>
                                    </div>
                                    <div>
                                    {user.friend ?
                                        <button>A</button>:
                                        <button>M</button>}
                                    </div>
                                </div>
        )})
        return (
            <div className='bg-search'>
                <div id='input-edits'>
                    <div id='div'>
                        <input onChange={(e) => this.handleChange('input', e.target.value)} placeholder='Search...' />  
                    </div>
                    <div id='div2' className='column-6 form-select'>
                        <select defaultValue='All' onChange={(e) => this.handleChange('select', e.target.value)}>
                            <option disabled="disabled" >Filter by...</option>
                            <option value='All'>All</option>
                            <option value='Web Development'>Web</option>
                            <option value='IOS Development'>IOS</option>
                            <option value='Salesforce Development'>Salesforce</option>
                            <option value='UI/UX Design'>QA</option>
                            <option value='QA Engineer'>UX/UI</option>
                        </select>
                    </div>
                </div>
                <div id="scrollableDiv" >
          <InfiniteScroll
            dataLength={this.state.users.length}
            next={this.loadMore}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv"
          >
          <div id='search'>
            {this.state.users.length > 0 ? search: null}
              
          </div>
          </InfiniteScroll>
        </div>
            </div>
        )
    }
}

export default Search