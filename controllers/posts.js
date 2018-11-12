const posts = require('express').Router();
const Post = require('../models/post');
const commentsRouter = require('./comments');

// Top Level Forwarding from '/posts/'

// Get New Post Form
posts.get('/new', (req, res) => {
    res.render('posts/new');
});
// Get Post
posts.get('/:id', (req, res) => {
    Post.findById(req.params.id).then(post => {
        res.render('posts/show', { post: post });
    });
});
// Post Post
posts.post('/new', (req, res) => {
    const post = new Post(req.body);
    post.save((err, post) => {
        return res.redirect('/');
    });
});
// Update Post
posts.patch('/:id', (req, res) => {
    Post.findOneAndUpdate({_id: req.params.id}, {})
});
// Delete Post
posts.delete('/:id', (req, res) => {

});

// 
posts.use('/:id/comments', (req, res, next) => {
    req.postId = req.params.id;
    next();
}, commentsRouter);

module.exports = posts;