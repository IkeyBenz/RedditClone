const posts = require('express').Router();
const Post = require('../models/post');
const Comment = require('../models/comment');
const commentsRouter = require('./comments');

// Top Level Forwarding from '/posts/'

// Get New Post Form
posts.get('/new', (req, res) => {
    res.render('posts/new');
});
// Get Post
posts.get('/:id', (req, res) => {
    Post.findById(req.params.id).then(post => {
        Comment.find({ _id: { $in: post.comments }}).then(comments => {
            post.comments = comments;
            res.render('posts/show', { post: post });
        })
        
    });
});
// Post Post
posts.post('/', (req, res) => {
    const post = new Post(req.body);
    post.save((err, post) => {
        return res.redirect('/');
    });
});
// Update Post
posts.patch('/:id', (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body).then(() => {
        res.redirect(`/posts/${req.params.id}`);
    });
});
// Delete Post
posts.delete('/:id', (req, res) => {
    Post.findByIdAndDelete(req.params.id).then(post => {
        res.redirect('/');
    });
});
// Forwards all comment requests to the comments router
posts.use('/:id/comments', (req, res, next) => {
    req.postId = req.params.id;
    next();
}, commentsRouter);

module.exports = posts;