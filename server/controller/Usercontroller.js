const {CONNECTION_STRING,
    SESSION_SECRET,
    REACT_APP_SERVER_PORT,
    REACT_APP_DOMAIN,
    REACT_APP_CLIENT_ID,
    CLIENT_SECRET} = process.env;
const axios = require('axios');
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
            let {sub, email, name, picture} = resWithUserData.data;
            
            let foundUser = await db.find_user([sub])
                    if(foundUser[0]){
                        req.session.user = foundUser[0];
                        res.redirect('/#/home')
                    }else {
                        let createUser = await db.create_user([name, email, sub, picture])
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
        res.redirect("http://localhost:3000/#/");
    },
    updateUser: (req, res) => {
        const db = req.app.get('db');

    db.update_info([req.session.user.id, req.body.first, req.body.last, req.body.dev, req.body.company, req.body.bio])
    .then(user => res.status(200).send(user))
    .catch(err => {
        res.status(500).send()
        console.log(err)
    })
    }

}