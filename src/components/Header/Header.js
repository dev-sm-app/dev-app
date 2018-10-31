import React from "react"
import { Link, withRouter } from "react-router-dom";
import logo from "../../Styles/images/logo.png";
import { connect } from "react-redux";

function Header(props) {
    let text = ""
    if(props.location.pathname === "/home") {
        text = "Dev App"
    }
    if(props.location.pathname === "/messages") {
        if(props.friendName) {
            text = props.friendName
        }
        else {
            text = "Direct Message"
        }
    }
    if(props.location.pathname === "/profile") {
        text = "Your Profile"
    }
    if(props.location.pathname.includes("/user")) {
        text = "User Profile"
    }
    return (
        <div>
            {
                props.location.pathname === "/" || props.location.pathname === "/search"
                ?
                    null
                :
                    <div className="site_header">
<<<<<<< HEAD
                        <div>
                            <h1>{text}</h1>
                            <Link to="/profile"><img src={props.user.picture} alt="profile"/></Link>
                        </div>
=======
                        <Link to="/home"><img className="siteLogo" src={logo} alt=""/></Link>                        
                        <h1>{text}</h1>
                        <Link to="/profile"><img className="profilePic" src={props.user.picture} alt="profile"/></Link>
>>>>>>> master
                        {/* <a href="http://localhost:3000/api/auth/logout"><button>Logout</button></a> */}
                    </div>
            }
        </div>
    )
}

function mapStateToProps(state) {
    return {
        user: state.user,
        friendName: state.friendName
    }
}

export default withRouter(connect(mapStateToProps)(Header))