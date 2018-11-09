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
    updateUser: async (req, res) => {
            const db = req.app.get('db');
            if(req.session.user) {
                try {
                    let user = await db.update_info([req.session.user.id, req.body.first, req.body.last, req.body.dev, req.body.company, req.body.bio])
                    let updatedUser = await db.get_updated_user([req.session.user.id])
                    req.session.user = updatedUser[0]
                    res.status(200).send(user)
                }catch(err) {
                    console.log(err)
                    res.sendStatus(500)
                }
            }
            else {
                res.sendStatus(401)
            }
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
        req.query.limit = Number(req.query.limit);
        req.query.page = Number(req.query.page);

        if(req.session.user) {

            db.my_friends(req.session.user.id).then(result => {
    
                if(req.query.input && req.query.select === ''){
                    
                } else if(req.query.input === '%%' && req.query.select){
                     if(req.query.select === 'All'){
                        db.select_all([req.session.user.id, req.query.limit, req.query.page]).then(user => res.status(200).send({user, result}))
                        } else if(req.query.select === 'Web Development'){
                        db.select_web([req.query.limit, req.query.page, req.session.user.id]).then(user => res.status(200).send({user, result})) 
                        } else if(req.query.select === 'IOS Development'){
                        db.select_ios([req.query.limit, req.query.page, req.session.user.id]).then(user => res.status(200).send({user, result}))
                        } else if(req.query.select === 'Salesforce Development'){
                        db.select_sales([req.query.limit, req.query.page, req.session.user.id ]).then(user => res.status(200).send({user, result})) 
                        } else if(req.query.select === 'QA Engineer'){
                        db.select_qa([req.query.limit, req.query.page, req.session.user.id]).then(user => res.status(200).send({user, result}))
                        } else if(req.query.select === 'UX/UI Design'){
                        db.select_ux([req.query.limit, req.query.page, req.session.user.id]).then(user => res.status(200).send({user, result}))
                        }
                }else if(req.query.select ==='All'){
                    db.input_all([req.session.user.id, req.query.input, req.query.limit, req.query.page]).then(user => res.status(200).send({user, result}))
                }else if(req.query.select === 'Web Development'){
                    db.input_web([req.session.user.id, req.query.input, req.query.limit, req.query.page]).then(user => res.status(200).send({user, result})) 
                }else if(req.query.select === 'IOS Development'){
                    db.input_ios([req.session.user.id, req.query.input, req.query.limit, req.query.page]).then(user => res.status(200).send({user, result}))
                }else if(req.query.select === 'Salesforce Development'){
                    db.input_sales([req.session.user.id, req.query.input, req.query.limit, req.query.page ]).then(user => res.status(200).send({user, result})) 
                }else if(req.query.select === 'QA Engineer'){
                    db.input_qa([req.session.user.id, req.query.input, req.query.limit, req.query.page]).then(user => res.status(200).send({user, result}))
                }else if(req.query.select === 'UX/UI Design'){
                    db.input_ux([req.session.user.id, req.query.input, req.query.limit, req.query.page]).then(user => res.status(200).send({user, result}))
     
                }
            }).catch(err => {
                res.status(500)
                console.log(err)
            })
        }
        else {
            res.status(401).send("Need to be logged in")
        }
    },
    getFriends: (req, res) => {
        const db = req.app.get('db');

        db.get_friends([req.session.user.id, req.query.offset]).then(friend => {
            res.status(200).send(friend)
        }).catch(err => {
        res.status(500).send()
        console.log(err)
    })
    }


}