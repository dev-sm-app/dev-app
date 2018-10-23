


module.exports = {
    userLogin: async (req, res) => {
        try{
            let payload = {
                client_id: REACT_APP_CLIENT_ID,
                client_secret: CLIENT_SECRET,
                code: req.query.code,
                grant_type: "authorization_code",
                redirect_uri: `http://${req.headers.host}/auth/callback`
            }
            let resWithToken = await axios.post(`https://${REACT_APP_DOMAIN}/oauth/token`, payload);
            let resWithUserData = await axios.get(`https://${REACT_APP_DOMAIN}/userinfo?access_token=${resWithToken.data.access_token}`);

            const db = req.app.get('db');
            let {sub, email, name} = resWithUserData.data;
            
            let foundUser = await db.find_user([sub])
                    if(foundUser[0]){
                        req.session.user = foundUser[0];
                        res.redirect('/#/home')
                    }else {
                        let createUser = await db.create_user([name, email, sub])
                        req.session.user = createUser[0];
                        res.redirect('/#/profile')
                    };
                }catch(err){
                    console.error(err);
        }
    },
    SetUser: (req, res) => {
        if(req.session.user){
            res.status(200).send(req.session.user)
        }else{
            res.status(401).send('you failed')
        }
    },
    Logout: (req, res) => {
        req.session.destroy();
            res.send();
    }

}