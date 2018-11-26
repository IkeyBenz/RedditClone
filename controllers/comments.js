const comments = require('express').Router();
const Comment = require('../models/comment');
const Post = require('../models/post');

// Top Level Forwarding from '/posts/:id/comments/'
// req.postId = the postid for the current comment

// Get new comments form
comments.get('/new', (req, res) => {
    Post.findById(req.postId).then(post => {
        res.render('comments/new', { post: post });
    });
});
// Get comment
comments.get('/:id', (req, res) => {
    Comment.findById(req.params.id).then(comment => {
        res.render('comments/show', { comment: comment });
    });
});
// Post new comment
comments.post('/', (req, res) => {
    const comment = new Comment(req.body);
    comment.save().then(comment => {
        return Post.findById(req.postId)
    }).then(post => {
        post.comments.unshift(comment);
        console.log(post.comments);
        return post.save();
    }).then(post => {
        res.redirect(`/posts/${req.postId}/`);

    });
});
// Update Comment
comments.patch('/:id', (req, res) => {
    Comment.findByIdAndUpdate(req.params.id, req.body).then(comment => {
        Post.findById(req.postId).then(post => {
            res.render('posts/show', { post: post });
        });
    });
});
// Delete Comment
comments.delete('/:id', (req, res) => {
    Comment.findByIdAndRemove(req.params.id).then(comment => {
        Post.findById(req.postId).then(post => {
            res.render('posts/show', { post: post });
        });
    });
});

module.exports = comments;