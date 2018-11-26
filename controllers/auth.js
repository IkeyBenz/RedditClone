const authenticator = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

authenticator.post('/signup', (req, res) => {
    const newUser = new User(req.body);
    newUser.save().then(user => {
        const token = jwt.sign({_id: user._id}, process.env.SECRET, { expiresIn: '60 days' });
        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
        res.redirect('/');
    }).catch(error => {
        console.log(error.message);
        return res.status(400).send({err: error });
    });
});

// Authenticate user and display profile
authenticator.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ username }, 'username password').then(user => {
        if (!user)
            return res.status(401).send({ message: 'Wrong Username or Password' });
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.status(401).send({ message: 'Incorrect Password' });
            const token = jwt.sign({_id: user._id}, process.env.SECRET, { expiresIn: '60 days' });
            res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
            res.redirect('/');
        });
    });
});
// Deauthenticate user and display home page
authenticator.post('/signout', (req, res) => {
    res.clearCookie('nToken');
    res.redirect('/');
});


module.exports = authenticator;