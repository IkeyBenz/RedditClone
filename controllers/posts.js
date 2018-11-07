const router = require('express').Router();
const Post = require('../models/post');

// Index All Posts
router.get('/', (req, res) => {
    Post.find({}).then(posts => {
        res.render('posts/index', { posts: posts });
    });
});

// Get Form
router.get('/new', (req, res) => {
    res.render('posts/new');
});
// Get Post
router.get('/:id', (req, res) => {
    Post.findById(req.params.id).then(post => {
        res.render('posts/show', { post: post });
    });
});
// Post Post
router.post('/new', (req, res) => {
    const post = new Post(req.body);
    post.save((err, post) => {
        return res.redirect('/');
    });
});
// Update Post
router.patch('/:id', (req, res) => {

});
// Delete Post
router.delete('/:id', (req, res) => {

});

module.exports = router;