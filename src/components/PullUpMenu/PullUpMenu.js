import React, { Component } from "react"
import CodeModal from "../CodeModal/CodeModal"
import Dropzone from "react-dropzone"

class PullUpMenu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showMenu: false,
            showModal: false
        }
    }

    toggleShow = (e) => {
        this.setState({
            [e.target.name]: !this.state[e.target.name]
        })
    }

    render() {
        const className = this.state.showMenu ? "pull_up_menu_content" : "pull_up_none"
        return (
            <div className="pull_up_menu">
                <div className={className}>
                    
                    <Dropzone
                    onDrop={this.props.handleDrop}
                    accept="image/*"
                    className="dropzone"
                    ><p>Add Image</p></Dropzone>
                    <button
                    className="menu_item"
                    name="showModal"
                    onClick={this.toggleShow}
                    >Add Code Snippet</button>
                </div>
                <button
                    className="dots"
                    name="showMenu"
                    onClick={this.toggleShow}
                    disabled={!this.props.roomCheck}
                >...</button>
                <CodeModal 
                show={this.state.showModal}
                toggleShow={this.toggleShow}
                code={this.props.code}
                mode={this.props.mode}
                updateCode={this.props.updateCode}
                updateMode={this.props.updateMode}
                />
            </div>
        )
    }
}

export default PullUpMenu