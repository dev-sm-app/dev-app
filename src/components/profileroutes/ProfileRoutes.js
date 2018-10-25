import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {userData} from './../../ducks/reducer';


class ProfileRoutes extends Component {
    constructor(){
        super();
        this.state = {
          page: 1,
          first: '',
          last: '',
          dev: '',
          company: '',
          bio: '',
        }
    }

   

    handleChange(prop, val){
      this.setState({[prop]: val})
    }

    Save(){
      axios.put('/api/update', {first: this.state.first, last: this.state.last,
      dev: this.state.dev, company: this.state.company, bio: this.state.bio}).then(res => {
        
      })
    }
    handleClick(val){
      this.setState({page: val})
    }

    Routes(val){
    
      if(this.state.page === 1){
        return (
          <div className='info-boxes'>
      <div className='names'>
        <div>
          <p>First Name</p>
          <input value={this.state.first} onChange={(e) => this.handleChange('first', e.target.value)} />
        </div>
        <div>
          <p>Last Name</p>
          <input value={this.state.last} onChange={(e) => this.handleChange('last', e.target.value)} />
        </div>
      </div>
      <div className='types'>
        <div>
          <div>
            <div>
              <p>Developer Type</p>
            </div>
            <div className='custom-select'>
              <select value={this.state.dev} onChange={(e) => this.handleChange('dev', e.target.value)}>
                <option value=''>Choose Developement..</option>
                <option value='Web Development'>Web</option>
                <option value='IOS Development'>IOS</option>
                <option value='Salesforce Development'>salesforce</option>
                <option value='UI/UX Design'>UI/UX</option>
                <option value='QA Engineer'>QA Engineer</option>
              </select>
                
            </div>
          </div>
        <div>
          <div>
            <p>Current Employer</p>
          </div>
          <div>
            <input value={this.state.company} onChange={(e) => this.handleChange('company', e.target.value)} />
          </div>
          <div>
            <p>Bio</p>
          </div>
          <div>
              <textarea placeholder='Tell us about yourself/skills.' value={this.state.bio} onChange={(e) => this.handleChange('bio', e.target.value)}/>
          </div>
         <div>
          <button onClick={() => this.Save()}>Save</button>
         </div>
        </div> 
      </div>
    </div>
  </div>
        )
      } else if(this.state.page === 2){
        return (
          <div>

          </div>
        )
      } else if(this.state.page === 3){
        return(
          <div>

          </div>
        )
      }

    }
  render() {
    return (
      <div className='bg-profile'>
        <div className='toggle-bar'>
          <div>
            <button onClick={() => this.handleClick(1)}>info</button>
          </div>
          <div>
            <button onClick={() => this.handleClick(2)}>posts</button>
          </div>
          <div>
            <button onClick={() => this.handleClick(3)}>friends</button>
          </div>
        </div>
        <div className='route'>
          {this.Routes()}
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps, {userData})(ProfileRoutes);