require('dotenv').config();
const express = require('express');
const axios = require('axios');
const massive = require('massive');
const bodyParser = require('body-parser');
const session = require('express-session');
const user = require('./controller/Usercontroller');
const friend = require('./controller/Friendcontroller');
const mess = require('./controller/Messagecontroller');
const post =require('./controller/Postcontroller');

const app = express();
app.use(bodyParser.json());
const {CONNECTION_STRING,
    SESSION_SECRET,
    REACT_APP_SERVER_PORT,
    REACT_APP_DOMAIN,
    REACT_APP_CLIENT_ID,
    CLIENT_SECRET} = process.env;

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
// User EndPoints //
app.get('/auth/callback', user.userLogin);
app.get('/api/auth/setUser', user.SetUser);
app.get('/api/auth/logout', user.Logout);

// Friend EndPoints //


// Post EndPoints //


// Message EndPoints //



massive(CONNECTION_STRING).then(db => {
    app.set('db', db);

app.listen(REACT_APP_SERVER_PORT, function(){
    console.log(`listening on port: ${REACT_APP_SERVER_PORT}`);
    });
});

