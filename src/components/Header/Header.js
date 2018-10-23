import React from "react"
import { withRouter } from "react-router-dom"

import { connect } from "react-redux"

function Header(props) {
    console.log(props)
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
                    <div>
                        <h1>{text}</h1>
                        <img src="" alt=""/>
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