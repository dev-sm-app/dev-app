import React from "react"
import { Link, withRouter } from "react-router-dom"

function NavBar(props) {
    return (
        <div>
            {
                props.location.pathname === "/"
                    ?
                    null
                    :
                    <div>
                        <Link to="/message"><div>Message</div></Link>
                        <Link to="/home"><div>Home</div></Link>
                        <Link to="/search"><div>Search</div></Link>
                    </div>
            }
        </div>
    )
}

export default withRouter(NavBar)