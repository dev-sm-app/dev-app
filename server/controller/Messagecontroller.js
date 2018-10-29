module.exports = {
    getMessages: async (req, res) => {
        const db = req.app.get("db")
        const { userId, friendId } = req.query

        const messages = await db.get_messages([Number(userId)])
        console.log("messages", messages)
        const filteredMessages = messages
        .filter(message => (message.userid === Number(userId) && message.friendid ===  Number(friendId)) 
        || (message.userid === Number(friendId) && message.friendid ===  Number(userId)))
        res.status(200).send(filteredMessages)
    },
    sendMessage: (req, res) => {
        const db = req.app.get("db")
        const { userId, friendId, authorPicture, message, messagePicture, type} = req.body
        let newMessagePicture = ""
        if(messagePicture === "") {
            newMessagePicture = null
        }
        else {
            newMessagepicture = messagePicture
        }
        db.send_message([Number(userId), Number(friendId), authorPicture, message, newMessagePicture, type])
        .then(message => res.status(200).send(message[0]))
    },
    getRecents: async(req, res) => {
        const db = req.app.get("db")
        const { userId } = req.query

        const recents = await db.get_recents([Number(userId)])
        const filteredRecents = recents.filter(contact => !(contact.id === Number(userId)))
        res.status(200).send(filteredRecents)
    }
}