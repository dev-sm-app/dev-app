module.exports = {
    getMessages: async (req, res) => {
        const db = req.app.get("db")
        const { userId, friendId } = req.query

        const messages = await db.get_messages([Number(userId)])
        const filteredMessages = messages
        .filter(message => (message.userid === Number(userId) && message.friendid ===  Number(friendId)) 
        || (message.userid === Number(friendId) && message.friendid ===  Number(userId)))
        res.status(200).send(filteredMessages)
    },
    sendMessage: (req, res) => {
        const db = req.app.get("db")
        const { userid, friendid, authorpicture, message, messagepicture, messagedate, code, mode} = req.body

        db.send_message([Number(userid), Number(friendid), authorpicture, message, messagepicture, messagedate, code, mode])
        .then(() => res.status(200))
    },
    getRecents: async(req, res) => {
        const db = req.app.get("db")

        if(req.session.user) {
            const recents = await db.get_recents([req.session.user.id])
            const filteredRecents = recents.filter(contact => !(contact.id === req.session.user.id))
            res.status(200).send(filteredRecents)
        }
        else {
            res.status(401).send("Need to be logged in")
        }
    },
    addRecent: (req, res) => {
        const db = req.app.get('db');

    db.add_recents([req.session.user.id, req.body.id, `${Date.now()}`]).then(response => res.status(200))
    .catch(err => {
        res.status(500).send()
        console.log(err)
    })
    }
}