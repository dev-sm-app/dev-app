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
            hasMore: true,
            users: []
        }
    }
    componentDidMount(){
     
    }
    handleChange(prop, val){
        this.setState({[prop]: val})
        this.Search();
        
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
    friendOrNot(){
        axios.get('/api/friend/list').then(friendList => {
            axios.get(`/api/scroll/${this.state.items}`).then(userList => {
                let users = userList.data.map(user => {
                    let friends = friendList.data.filter(friend => user.id === friend.friendid)
                      if(friends.length){
                        user.friend = true
                    } else {
                        user.friend = false
                    }
                      return user;
                })
                this.setState({users: users})
            })
        })
    }

    fetchMoreData = () => {
        if (this.state.users.length >= 100) {
          this.setState({ hasMore: false });
          return;
        }
    }
 
    render() {
        return (
            <div className='bg-search'>
                <div>
                    <div>
                        <input onChange={(e) => this.handleChange('input', e.target.value)} placeholder='Search...' />  
                    </div>
                    <div className='column-6 form-select'>
                        <select onChange={(e) => this.handleChange('select', e.target.value)}>
                            <option disabled="disabled" selected="selected">Filter by...</option>
                            <option value='All'>All</option>
                            <option value='Web Development'>Web</option>
                            <option value='IOS Development'>IOS</option>
                            <option value='Salesforce Development'>Salesforce</option>
                            <option value='UI/UX Design'>QA</option>
                            <option value='QA Engineer'>UX/UI</option>
                        </select>
                    </div>
                </div>
                    <div>
                        <InfiniteScroll
                            dataLength={this.state.users.length}
                            next={this.fetchMoreData}
                            hasMore={this.state.hasMore}
                            loader={<h4>Loading...</h4>}
                            endMessage={
                                <p style={{ textAlign: "center" }}>
                                <b>Those are all of the users.</b>
                                </p>
                        }>
                            {this.state.users.map((e, i) => (
                                <div key={i}>
                                    <div>
                                        <img src={e.picture} alt='' />
                                        <p>{e.firstname}{' '}{e.lastname}{' '}|{' '}{e.deverlopertype}</p>
                                    </div>
                                    <div>
                                        <button>A</button>
                                        <button>M</button>
                                    </div>
                                </div>
                            ))}
                        </InfiniteScroll>
                    </div>
            </div>
        )
    }
}

export default Search