import React from "react"
import { Link } from "react-router-dom"

function NavBar() {
    return (
        <div>
            <Link to="/message"><div>Message</div></Link>
            <Link to="/home"><div>Home</div></Link>
            <Link to="/search"><div>Search</div></Link>
        </div>
    )
}

export default NavBar