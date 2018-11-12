const commentsRouter = require('express').Router();
const Comment = require('../models/comment');
// Top Level Forwarding from '/posts/:id/comments/'

// Get new comments form
commentsRouter.get('/new', (req, res) => {

});
// Get comment
commentsRouter.get('/:id', (req, res) => {

});
// Post new comment
commentsRouter.post('/comments', (req, res) => {
    const comment = new Comment(req.body);
    comment.save().then()
});
// Update Comment
commentsRouter.patch('/:id', (req, res) => {

});
// Delete Comment
commentsRouter.delete('/:id', (req, res) => {

});

module.exports = commentsRouter;