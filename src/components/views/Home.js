import React, { Component } from "react";
import axios from "axios";
import { userData } from "../../ducks/reducer";
import { connect } from "react-redux";
import Post from "../views/Post";
import ReactModal from "react-modal";
import cancel from '../../Styles/images/cancel-icon.png'

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postDescription: '',
      postPicture: '',
      showModal: false,
      posts: []
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    axios.get("/api/auth/setUser").then(res => {
      this.props.userData(res.data);
    });
    axios.get('/api/posts')
    .then(posts => {
        this.setState({
            posts: posts.data
        })
    })
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  createPost (post) {
    this.setState({
      posts: [post, ...this.state.posts], 
      postDescription: '',
      postPicture: ''
    })
    axios.post('/api/post', {post})
    this.handleCloseModal()
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    let displayAllPosts = this.state.posts.map((post, i) => {
      return (
        <Post
          key={i}
          post={post}
        />
      );
    });

    console.log(this.state.postDescription)

    return (
      <div className="mainHome">
        <ReactModal
          style={{
            overlay: {
              backgroundColor: "rgba(50, 50, 50, 0.85)",
            },
            content: {
              background: "#000",
              color: "#00AFF3",
              border: "1px solid #00AFF3",
              borderRadius: '0'
            }
          }}
          isOpen={this.state.showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseModal}
        >
          <div className="modalHead">
            {/* <p className="postHere">Write your post here!!</p> */}
            <img src={cancel} alt="" onClick={this.handleCloseModal}/>
          </div>
          <div className="postArea">
            <img src={this.props.user.picture} alt="" />
            <textarea
              className="coolInput"
              type="text"
              placeholder="What do you want to say?"
              value={this.state.postDescription}
              name="postDescription"
              onChange={this.handleInput}
            />
          </div>
          <div className="modalFoot">
            <button onClick={() => this.createPost({
              description: this.state.postDescription, 
              picture: this.state.postPicture,
              authorpicture: this.props.user.picture,
              firstname: this.props.user.firstname,
              lastname: this.props.user.lastname,
              postdate: `${Date.now()}`,
              developertype: this.props.user.developertype
              })}>Post</button>
            </div>
        </ReactModal>

        <input
          type="text"
          placeholder="What do you want to say?"
          onClick={this.handleOpenModal}
        />
        {displayAllPosts}
        <div className="bottomSpace">
          
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { userData }
)(Home);
