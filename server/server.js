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
const post = require('./controller/Postcontroller');
const io = require('socket.io')(server)

app.use(bodyParser.json());
const { CONNECTION_STRING,
    SESSION_SECRET,
    REACT_APP_SERVER_PORT,
    REACT_APP_DOMAIN,
    REACT_APP_CLIENT_ID,
    CLIENT_SECRET } = process.env;

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
// app.use(user.devEnvironment)

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
})
// User EndPoints //
app.get('/auth/callback', user.userLogin);
app.get('/api/auth/setUser', user.SetUser);
app.get('/api/auth/logout', user.Logout);
app.put('/api/update', user.updateUser);
app.get('/api/scroll', user.Scroll);
app.get('/api/user/list', user.userList);
app.get('/api/search', user.myFriends);



// Friend EndPoints //
app.get('/api/friend/list', friend.myFriends);

// Post EndPoints //


// Message EndPoints //
app.get("/api/recents", mess.getRecents)
app.get("/api/messages", mess.getMessages)
app.post("/api/sendmessage", mess.sendMessage)
app.get("/api/recents", mess.getRecents)


io.on('connection', socket => {
    console.log(`${socket.id} connected`)
    socket.on('join room', data => {
        socket.join(data.room)
    })
    socket.on('send message', data => {
        io.to(data.roomid).emit('message sent', data)
    })

    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`)
    })
})

server.listen(REACT_APP_SERVER_PORT, function () {
    console.log(`listening on port: ${REACT_APP_SERVER_PORT}`);
});

