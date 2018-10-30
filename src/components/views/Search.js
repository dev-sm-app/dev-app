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
        window.onscroll = () => {
        const {
            loadUsers,
            state: {
                error, 
                isLoading,
                hasMore,
            },
        } = this;
        if(error || isLoading || !hasMore) return;
        if(window.innerHeight + document.documentElement.scroltTop === document.documentElement.offsetHeight){
            loadUsers()
        }
    };
}
    componentWillMount(){
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
    this.setState({isLoading: true}, () => {
        axios.get('/api/friend/list').then(friendList => {
            axios.get(`/api/scroll?items=${this.state.items}`).then(userList => {
                let nextUsers = userList.data.map(user => {
                    let friends = friendList.data.filter(friend => user.id === friend.friendid)
                      if(friends.length){
                        user.friend = true
                    } else {
                        user.friend = false
                    }
                      return user;
                })
                this.setState({
                    hasMore: (this.state.users.length < 100),
                    isLoading: false,
                    users: [
                      ...this.state.users,
                      ...nextUsers,
                    ],
                    items: this.state.items += 10
                });
            });
        }).catch((err) => {
            this.setState({
            error: err.message,
            isLoading: false,
             });
          })
    });
};


    fetchMoreData = () => {
        if (this.state.users.length >= 100) {
          this.setState({ hasMore: false });
          return;
        }
    }
 
    render() {
        const search = this.state.users.map(user => (
                                
                                <div className='search-info' key={user}>
                                    <div>
                                        <img src={user.picture} alt='' />
                                        <p>{user.firstname}{' '}{user.lastname}{' '}|{' '}{user.deverlopertype}</p>
                                    </div>
                                    <div>
                                    {user.friend ?
                                        <button>A</button>:
                                        <button>M</button>}
                                    </div>
                                </div>
                            ))
        return (
            <div className='bg-search'>
                <div>
                    <div>
                        <input onChange={(e) => this.handleChange('input', e.target.value)} placeholder='Search...' />  
                    </div>
                    <div className='column-6 form-select'>
                        <select onChange={(e) => this.handleChange('select', e.target.value)}>
                            <option disabled="disabled" selected='selected'>Filter by...</option>
                            <option value='All'>All</option>
                            <option value='Web Development'>Web</option>
                            <option value='IOS Development'>IOS</option>
                            <option value='Salesforce Development'>Salesforce</option>
                            <option value='UI/UX Design'>QA</option>
                            <option value='QA Engineer'>UX/UI</option>
                        </select>
                    </div>
                </div>
                <div id="scrollableDiv" style={{ height: 300, overflow: "auto" }}>
          <InfiniteScroll
            dataLength={this.state.items.length}
            next={this.fetchMoreData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv"
          >
            {this.state.users.map(user => (
              <div >
                <img src={user.picture} />
                <p>{user.firstname}{' '}{user.lastname}{' '}|{' '}{user.developertype}</p>
              </div>
            ))}
          </InfiniteScroll>
        </div>
            </div>
        )
    }
}

export default Search