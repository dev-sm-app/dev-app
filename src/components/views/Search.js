import React, { Component } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';

class Search extends Component {
    constructor(){
        super();
        this.state = {
            search: '',
            select: '',
            items: 10,
            hasMore: true,
            users: []
        }
    }
    handleChange(prop, val){
        this.setState({[prop]: val})
        this.loadMore();
    }
    loadMore(){
        axios.get(`/api/scroll/${this.state.items}`).then(res => {
            this.setState({users: res.data})
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
                        <input onChange={(e) => this.handleChange('search', e.target.value)} placeholder='Search...' />  
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