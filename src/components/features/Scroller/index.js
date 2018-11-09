import React, { Component } from 'react';
import SearchScroll from './SearchScroll';
import axios from 'axios';

import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import {updateFriendName, updateCurrentlyMessaging, userData} from './../../../ducks/reducer';



class index extends Component {
    constructor(){
        super();
        this.state = {
            users: [],
            input: '',
            select: '',
            limit: 10,
            page: 0,
            offset: 0,
            totalPages: 1,
            scrolling: false,

        }
    }
    componentWillMount(){
        this.loadUsers();
         window.addEventListener('scroll', this.invokeScroll)
    }
    async componentDidMount() {
        try {
            let userRes = await axios.get("/api/auth/setUser")
              this.props.userData(userRes.data);
        }
        catch(err) {
            console.log(err)
            if(err.response.status === 401) {
              alert("You need to login")
              this.props.history.push("/")
            }
        }
    }
    invokeScroll = (e) => {
        this.handleScroll(e)
    }
    componentWillUnmount(){
        window.removeEventListener('scroll', this.invokeScroll)
    }

    enableScroll = () => {
        window.scroll(0,0);
        this.loadUsers();
        window.addEventListener('scroll', this.invokeScroll);
    }
    disableScroll = () => {
        window.removeEventListener('scroll', this.invokeScroll)
    }

    handleChange(prop, val){
        // let scrollListener = window.addEventListener('scroll', this.invokeScroll)
            this.setState(prevState => ({
                [prop]: val, 
                users: [],
                offset: 0,
                page: 0,
                totalPages: 1
            }), this.enableScroll)
    }
    scrollTop(){
        const top = document.querySelector('ul.users');
          var height = top.offsetTop;
          alert(height);
    }

    handleScroll = (e) => {
        if(this.state.scrolling) return
        if(this.state.totalPages <= this.state.page) return
        const lastItem = document.querySelector('#user-list > li:last-child')
        if(!lastItem){
            this.disableScroll();
            return 
        }
        const lastItemOffset = lastItem.offsetTop + lastItem.clientHeight
        const pageOffset = window.pageYOffset + window.innerHeight
        var bottomOffset = 20
        if(pageOffset > lastItemOffset - bottomOffset) this.loadMore();

    }

    loadUsers = () => {
        axios.get(`/api/search?select=${this.state.select}&input=%${this.state.input}%&limit=${this.state.limit}&page=${this.state.offset}`).then(res => {
            let users = res.data.user.map(user => {
                let friends = res.data.result.filter(friend => user.id === friend.friendid)
                if(friends.length){
                    user.friend = true
                } else {
                    user.friend = false
                }
                return user;
            })
            this.setState({
                users: [...this.state.users, ...users],
                scrolling: false,
                offset: (this.state.offset + 10)
                })
        })
    }
    loadMore(){
       
        this.setState(prevState => ({
            page: prevState.page++,
            scrolling: true,
            totalPages: prevState.totalPages++,
        }), this.loadUsers())  
    }



  render() {

      
      return (
<div className='bg-search'>
    <div id='input-edits'>
        <div id='div'>
            <input disabled={!this.state.select} onChange={(e) => this.handleChange('input', e.target.value)} placeholder='>_' />  
        </div>
        <div id='div2' className='column-6 form-select'>
            <select  defaultValue='' onChange={(e) => this.handleChange('select', e.target.value)}>
                <option disabled="disabled" value=''>Dev Type...</option>
                <option value='All'>All</option>
                <option value='Web Development'>Web</option>
                <option value='IOS Development'>IOS</option>
                <option value='Salesforce Development'>Salesforce</option>
                <option value='QA Engineer'>QA</option>
                <option value='UX/UI Design'>UX/UI</option>
            </select>
        </div>
    </div>
    <div id='bg-scroll'>
       {this.state.users.length ? <ul id='user-list' className='users' >
            {
                this.state.users.map((users, i) => 
                <li className='search' key={i}>
                <SearchScroll user={users} />
                </li>
            )}
        </ul>: <><h4 style={{height: '20vh', width: '100%', color: 'grey', paddingLeft: '15%', paddingTop: '10px', border: '1px solid grey'}}>Search For Developer...</h4>
                </>}
            <div id='empty-block'></div>
    </div>
</div>
    )
  }
}

export default connect(null, {updateFriendName, updateCurrentlyMessaging, userData})(withRouter(index));