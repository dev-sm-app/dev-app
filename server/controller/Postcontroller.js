module.exports = {
    getPosts: (req, res) => {
        const db = req.app.get("db")
        db.get_posts([req.session.user.id])
        .then(posts => res.status(200).send (posts))
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
    postCount: (req, res) => {
        const db = req.app.get('db');
    
    db.profile_posts(req.session.user.id).then(posts => res.status(200).send(posts))

    }
}