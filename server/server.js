require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').Server(app)
const axios = require('axios');
const massive = require('massive');
const bodyParser = require('body-parser');
const session = require('express-session');
const user = require('./controller/Usercontroller');
const friend = require('./controller/Friendcontroller');
const mess = require('./controller/Messagecontroller');
const post =require('./controller/Postcontroller');
const io = require('socket.io')(server)

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
app.put('/api/update', user.updateUser);


// Friend EndPoints //


// Post EndPoints //


// Message EndPoints //


io.on('connection', socket => {
    console.log('User Connected')
    socket.on('join room', data => {
        io.to(data.room).emit('room joined', data.room)
    })
    socket.on('disconnect', () => {
        console.log('User Disconnected')
    })
})

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);

server.listen(REACT_APP_SERVER_PORT, function(){
    console.log(`listening on port: ${REACT_APP_SERVER_PORT}`);
    });
});

