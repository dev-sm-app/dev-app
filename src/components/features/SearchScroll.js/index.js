import React, { Component } from 'react'

export default class index extends Component {
    constructor(){
        super();
        this.state = {
            users: [],
        }
    }
    componentWillMount(){
        this.loadUsers();
    }

    loadUsers = () => {

    }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}
