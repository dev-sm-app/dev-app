module.exports = {
    getMessages: async (req, res) => {
        const db = req.app.get("db")
        const { userId, friendId } = req.query

        const messages = await db.get_messages([Number(userId)])
        const filteredMessages = messages
            .filter(message => (message.userid === Number(userId) && message.friendid === Number(friendId))
                || (message.userid === Number(friendId) && message.friendid === Number(userId)))
        res.status(200).send(filteredMessages)
    },
    sendMessage: (req, res) => {
        const db = req.app.get("db")
        const { userid, friendid, authorpicture, message, messagepicture, messagedate, code, mode } = req.body
        console.log("hi")

        db.send_message([Number(userid), Number(friendid), authorpicture, message, messagepicture, messagedate, code, mode])
        .then(() => res.status(200).send("Adsfa"))
        .catch(err => console.log(err))
    },
    getRecents: async (req, res) => {
        const db = req.app.get("db")

        if (req.session.user) {
            const recentsOne = await db.get_recents([req.session.user.id])
            const recentsTwo = await db.get_recents_two([req.session.user.id])
            res.status(200).send([...recentsOne, ...recentsTwo])
        }
        else {
            res.status(401).send("Need to be logged in")
        }
    },
    addRecent: async (req, res) => {
        const db = req.app.get('db');

        try {
            if (req.session.user) {
                const recentsArrOne = await db.get_recents([req.session.user.id])
                const recentsArrTwo = await db.get_recents_two([req.session.user.id])
                const recents = [...recentsArrOne, ...recentsArrTwo]
                const index = recents.findIndex((contact) => contact.id === req.body.id)
                console.log(index)
                if (index === -1) {
                    await db.add_recents([req.session.user.id, req.body.id, `${Date.now()}`])
                    res.sendStatus(200)
                }
                else {
                    await db.update_last_messaged([`${Date.now()}`, req.session.user.id, req.body.id])
                    res.sendStatus(200)
                }
            }
        } catch (err) {
            console.log(err)
        }
    }
}