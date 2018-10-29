

module.exports = {
    myFriends: (req, res) => {
        const db = req.app.get('db');

    db.my_friends(req.session.user.id).then(result => res.status(200).send(result))
    .catch(err => {
        res.status(500).send()
        console.log(err)
    })
    }
}