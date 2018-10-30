const {CONNECTION_STRING,
    SESSION_SECRET,
    REACT_APP_SERVER_PORT,
    REACT_APP_DOMAIN,
    REACT_APP_CLIENT_ID,
    ENVIRONMENT,
    CLIENT_SECRET
} = process.env;
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
    },
    devEnvironment: (req, res, next) => {
        if(ENVIRONMENT === "dev") {
            req.app.get("db")
            .set_data()
            .then(userData => {
                req.session.user = userData[0]
                next()
            })
        }
        else {
            next()
        }
    },
    Scroll: (req, res) => {
        const db = req.app.get('db');

        db.get_search([req.session.user.id, req.query.items])
            .then(response => res.status(200).send(response))
            .catch(err => {
                res.status(500).send('errors')
                console.log(err)
            })
    },
    userList: (req, res) => {
        const db = req.app.get('db');

        db.get_user_info(req.session.user.id).then(result => res.status(200).send(result))
        .catch(err => {
        res.status(500).send()
        console.log(err)
        })
    },
    myFriends: (req, res) => {
        const db = req.app.get('db');

        db.my_friends(req.session.user.id).then(result => {
            if(req.query.select === 'All'){
            db.select_all(req.session.user.id, req.query.input).then(user => res.status(200).send({user, result}))
            } else if(req.query.select === 'Web Development'){
            db.select_web(req.query.input).then(user => res.status(200).send({user, result})) 
            } else if(req.query.select === 'IOS Development'){
                db.select_ios(req.query.input).then(user => res.status(200).send(user, result))
            } else if(req.query.select === 'Salesforce Development'){
                db.select_sales(req.query.input ).then(user => res.status(200).send({user, result})) 
            } else if(req.query.select === 'QA Engineer'){
                db.select_qa(req.query.input).then(user => res.status(200).send({user, result}))
            } else if(req.query.select === 'UX/UI Design'){
                db.select_ux(req.query.input).then(user => res.status(200).send({user, result}))
            }
        }).catch(err => {
            res.status(500).send()
            console.log(err)
        })
    }


}