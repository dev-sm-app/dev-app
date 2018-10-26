import React from "react"
import { Link, withRouter } from "react-router-dom";
import home from '../../Styles/images/home-blue.png';
import message from '../../Styles/images/message-blue.png';
import search from '../../Styles/images/search-blue.png';

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

                            {props.location.pathname === "/messages"
                            ?  
                            <div className="inner_message_box">
                                <Link to="/messages"><img src={message} alt="message" className="message"/></Link>
                            </div>
                            :
                            <div className="inner_message_box_no_orange">
                                <Link to="/messages"><img src={message} alt="message" className="message"/></Link>
                            </div>
                            }

                        </div>

                        <div className="home_divider"> 
                            {props.location.pathname === "/home"
                            ?
                            <div className="inner_message_box">
                                <Link to="/home"><img src={home} alt="home" className="home"/></Link>
                            </div>
                            :
                            <div className="inner_message_box_no_orange">
                                <Link to="/home"><img src={home} alt="home" className="home"/></Link>
                            </div>
                            }

                        </div>

                        <div className="search_divider">
                            {props.location.pathname === "/search"
                            ?
                            <div className="inner_message_box">
                                <Link to="/search"><img src={search} alt="search" className="search"/></Link>
                            </div>
                            :
                            <div className="inner_message_box_no_orange">
                                <Link to="/search"><img src={search} alt="search" className="search"/></Link>
                            </div>
                            }
                            
                        </div>
                    </div>
            }
        </div>
    )
}

export default withRouter(NavBar)