const users = require('express').Router();
const User = require('../models/user');


// Top level forwarding from '/users/'

// Display Signup Form
users.get('/signup', (req, res) => {
    res.render('user/signup');
});

users.get('/signin', (req, res) => {
    res.render('user/signin');
});

// Create new user
users.post('/', (req, res) => {
    const newUser = new User(req.body);
    newUser.save().then(user => {
        res.render('user/profile')
    });
});

// Get user
users.get('/:id', (req, res) => {
    User.findOne({_id: req.params.id}).then(user => {
        res.render('user/profile', { user: user });
    });
});

// Update user
users.patch('/:id', (req, res) => {
    User.findOneAndUpdate({_id: req.params.id}, req.body, (user) => {
        res.render('/user/profile', { user, user });
    });
});

// Delete user
users.delete('/:id', (req, res) => {
    User.findOneAndDelete({_id: req.params.id}).then(() => {
        res.render('posts/index');
    });
});

module.exports = users;