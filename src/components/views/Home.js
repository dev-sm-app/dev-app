import React, { Component } from "react";
import axios from "axios";
import { userData } from "../../ducks/reducer";
import { connect } from "react-redux";
import Post from "../Post/Post";
import ReactModal from "react-modal";
import PullUpMenu from "../PullUpMenu/PullUpMenu"
import cancel from '../../Styles/images/cancel-icon.png'

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postDescription: '',
      postPicture: '',
      showModal: false,
      posts: [],
      code: "",
      mode: "javascript"
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  async componentDidMount() {
    try {
      let userRes = await axios.get("/api/auth/setUser")
        this.props.userData(userRes.data);
        console.log("user", this.props.user)
        if(!this.props.user.firstname || !this.props.user.lastname || !this.props.user.developertype) {
          alert("Please edit your profile and fill out the fields")
          this.props.history.push("/profile")
      }
    }
    catch(err) {
      if(err.response.status === 401) {
        alert("You need to login")
        this.props.history.push("/")
      }
      return
    }
    let postsRes = await axios.get('/api/posts')
    this.setState({
      posts: postsRes.data
    })
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  createPost (post) {
    
      axios.post('/api/post', {post})
      this.setState({
        posts: [post, ...this.state.posts], 
        postDescription: '',
        postPicture: '',
        code: "",
        mode: "javascript"
      })
      this.handleCloseModal()
    }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  deletePost = (id) => {
    axios.delete(`/api/post/${id}`)
    .then(postsRes => this.setState({posts: postsRes.data}))
  }

  updateCode = (code) => {
    this.setState({code})
  }

  updateMode = (e) => {
    this.setState({
      mode: e.target.value
    })
  }

  handleDrop = (files) => {
    const {
      REACT_APP_CLOUDINARY_URL,
      REACT_APP_CLOUDINARY_API,
      REACT_APP_CLOUDINARY_PRESET
    } = process.env

    const formData = new FormData()
    formData.append("file", files[0])
    formData.append("tags", "DevApp, medium, gist")
    formData.append("upload_preset", `${REACT_APP_CLOUDINARY_PRESET}`)
    formData.append("api_key", `${REACT_APP_CLOUDINARY_API}`)
    formData.append("timestamp", (Date.now() / 1000 | 0))

    axios.post(`${REACT_APP_CLOUDINARY_URL}`, formData)
    .then(res => {
      this.setState({
        postPicture: res.data.secure_url
      })
    })
  }

  render() {
    let displayAllPosts = this.state.posts.map((post, i) => {
      return (
        <Post
          key={i}
          post={post}
          deletePost={this.deletePost}
        />
      );
    });

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
              borderRadius: '0',
              overflow: 'hidden'
            }
          }}
          isOpen={this.state.showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseModal}
        >
          <div className="modalHead">
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
          <PullUpMenu
          code={this.state.code}
          mode={this.state.mode}
          updateCode={this.updateCode}
          updateMode={this.updateMode}
          handleDrop={this.handleDrop}
          roomCheck={true}
          />
            <button onClick={() => this.createPost({
              description: this.state.postDescription, 
              postdate: `${Date.now()}`,
              picture: this.state.postPicture,
              code: this.state.code,
              mode: this.state.mode,
              authorpicture: this.props.user.picture,
              firstname: this.props.user.firstname,
              lastname: this.props.user.lastname,
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
