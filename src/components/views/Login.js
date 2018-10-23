import React, {Component} from 'react';

class Login extends Component {
    render () {
        return(
            <div className="mainBody">
                <header>
                    <title>
                        <h1>App Name</h1>
                    </title>
                    <p>A really cool app for connecting with other developers</p>
                </header>
                <body>
                    <button>Log In</button>
                </body>
            </div>
        )
    }
}

export default Login;