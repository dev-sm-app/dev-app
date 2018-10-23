import React, {Component} from 'react';
import '../../Styles/components/_login.scss'

class Login extends Component {
    render () {
        return(
            <div className="mainBody">
                <header>
                    <h1>Social Media for Developers</h1>
                </header>
                <body>
                    <button>Log In</button>
                </body>
            </div>
        )
    }
}

export default Login;