import React from "react"
import { Link, withRouter } from "react-router-dom";
import home from '../../Styles/images/house_blue_32.png';
import message from '../../Styles/images/envelope_green_32.png';
import search from '../../Styles/images/magnifying-glass_pink_32.png';

function NavBar(props) {
    return (
        <div>
            {
                props.location.pathname === "/"
                    ?
                    null
                    :
                    <div className="bottom_nav">
                        <div className="message_divider">
                            <div className="inner_message_box">
                                <Link to="/message"><img src={message} alt="message" className="message"/></Link>
                            </div>
                        </div>
                        <div className="home_divider"> 
                            <div className="inner_message_box">
                                <Link to="/home"><img src={home} alt="home" className="home"/></Link>
                            </div>
                        </div>
                        <div className="search_divider">
                            <div className="inner_message_box">
                                <Link to="/search"><img src={search} alt="search" className="search"/></Link>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default withRouter(NavBar)