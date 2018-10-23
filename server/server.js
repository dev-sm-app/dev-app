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

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
// User EndPoints //


// Friend EndPoints //


// Post EndPoints //


// Message EndPoints //



massive(CONNECTION_STRING).then(db => {
    app.set('db', db);

app.listen(REACT_APP_SERVER_PORT, function(){
    console.log(`listening on port: ${REACT_APP_SERVER_PORT}`);
    });
});

