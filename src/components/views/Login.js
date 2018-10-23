import React, {Component} from 'react';


class Login extends Component {

    login(){
        let {REACT_APP_DOMAIN, REACT_APP_CLIENT_ID} = process.env;
        let url = encodeURIComponent(`${window.location.origin}/auth/callback`);
        window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${url}&response_type=code`
      }

    render () {
        return(
            <div className="mainBody">
                <header>
                    <h1>Social Media for Developers</h1>
                </header>
                <div>
                    <button onClick={() => this.login()}>Log In</button>
                </div>
            </div>
        )
    }
}

export default Login;