const router = require('express').Router();
const Post = require('../models/post');

router.get('/', (req, res) => {
    Post.find({}).then(posts => {
        res.render('posts/index', { posts: posts });
    });
});

module.exports = router;