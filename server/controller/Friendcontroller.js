

module.exports = {
    myFriends: (req, res) => {
        const db = req.app.get('db');

    db.my_friends(req.session.user.id).then(result => res.status(200).send(result))
    .catch(err => {
        res.status(500).send()
        console.log(err)
    })
    },
    addFriend: (req, res) => {
        const db = req.app.get('db');
       
    db.add_friend([req.session.user.id, req.body.id]).then(friends => res.status(200).send(friends))
    .catch(err => {
        res.status(500).send()
        console.log(err)
    })
    },
    removeFriend: (req, res) => {
        const db = req.app.get('db');

    db.remove_friend([req.session.user.id, req.params.id]).then(friend => res.status(200))
     .catch(err => {
         res.status(500).send()
         console.log(err)
     })
    },
    followingCount: (req, res) => {
        const db = req.app.get('db');

    db.following_count(req.session.user.id).then(count => res.status(200).send(count))
    .catch(err => {
        res.status(500).send()
        console.log(err)
    })
    },
    followersCount: (req, res) => {
        const db = req.app.get('db');

    db.followers_count(req.session.user.id).then(count => res.status(200).send(count))
      .catch(err => {
          res.status(500).send()
          console.log(err)
      })
    }

}