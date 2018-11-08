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
    addRecent: async (req, res) => {
        const db = req.app.get('db');

        try {
            if(req.session.user) {
                const recents = db.get_recents([req.session.user.id])
                const filteredRecents = recents.filter(contact => !(contact.id === req.session.user.id))
                const index = filteredRecents.findIndex((contact) => contact.id === req.session.user.id && contact.friendid === req.body.id)
                if(index >= 0) {
                    await db.update_last_messaged([`${Date.now()}`, req.session.user.id, req.body.id])
                    res.status(200)
    
                }
                else {
                    await db.add_recents([req.session.user.id, req.body.id, `${Date.now()}`])
                    res.status(200)
                }
            }
            else {
                res.status(401).send("Need to be logged in")
            }
        } catch(err) {
            console.log(err)
        }
    }
}