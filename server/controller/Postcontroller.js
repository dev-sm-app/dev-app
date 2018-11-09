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
        db.create_post([req.session.user.id, post.description, post.picture, post.postdate, post.code, post.mode])
        res.status(200)
    },
    postCount: (req, res) => {
        const db = req.app.get('db');
    
    db.profile_posts(req.session.user.id).then(posts => res.status(200).send(posts))
    },
    deletePost: async (req, res) => {
        const db = req.app.get("db")
        const {id} = req.params

        await db.delete_post([Number(id)])
        db.get_posts([req.session.user.id])
        .then(posts => res.status(200).send(posts))
    }
}