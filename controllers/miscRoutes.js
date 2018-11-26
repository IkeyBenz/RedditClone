const router = require('express').Router();
const Post = require('../models/post');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

console.log(jwt.decode("$2b$10$HBRkf40f9veLRcyg.YiQfu6GlF.Et.Pu7xi9p8t0QicrsQ1Sb8Y.S"));

router.get('/', (req, res) => {
    Post.find({}).then(posts => {
        if (req.cookies.nToken) {
            const id = jwt.decode(req.cookies.nToken);
            User.findOne({_id: id}).then(user => {
                return res.render('posts/index', { posts: posts, user: user });
            });
        }
        return res.render('posts/index', { posts: posts });
    });
});

router.get('/r/:subreddit', (req, res) => {
    Post.find({ subreddit: req.params.subreddit }).then(posts => {
        res.render('posts/index', { posts: posts });
    });
});


module.exports = router;