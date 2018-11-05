module.exports = {
    getPosts: (req, res) => {
        const db = req.app.get("db")
        if(req.session.user) {
            db.get_posts([req.session.user.id])
            .then(posts => res.status(200).send (posts))
        }
        else {
            res.status(401).send("Need to be logged in")
        }
    }, 

    createPost: (req, res) => {
        const db = req.app.get("db")
        const {post} = req.body
        let actualpicture = ''
        if(post.picture === ''){
            actualpicture = null
        } else {
            actualpicture = post.picture
        }
        db.create_post([req.session.user.id, post.description, actualpicture, post.authorpicture, post.firstname, post.lastname, post.postdate, post.developertype])
        res.status(200)
    },
    deletePost: async (req, res) => {
        const db = req.app.get("db")
        const {id} = req.params

        await db.delete_post([Number(id)])
        db.get_posts([req.session.user.id])
        .then(posts => res.status(200).send(posts))
    }
}