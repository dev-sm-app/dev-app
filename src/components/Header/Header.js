import React from "react"
import { Link, withRouter } from "react-router-dom"

import { connect } from "react-redux"

function Header(props) {
    let text = ""
    if(props.location.pathname === "/home") {
        text = "Dev App"
    }
    if(props.location.pathname === "/message") {
        text = "Direct Message"
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
                        <h1>{text}</h1>
                        <Link to="/profile"><img src={props.user.picture} alt="profile"/></Link>
                        {/* <a href="http://localhost:3000/api/auth/logout"><button>Logout</button></a> */}
                    </div>
            }
        </div>
    )
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default withRouter(connect(mapStateToProps)(Header))