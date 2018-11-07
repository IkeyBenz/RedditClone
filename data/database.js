const mongoose = require('mongoose');
const DBURL = process.env.MONGODB_URI || 'mongodb://localhost/reddit';
assert = require('assert');

mongoose.Promise = global.Promise;
mongoose.connect(DBURL, { useNewUrlParser: true }, (err, db) => {
    assert.equal(err, null);
    console.log('Successfully Connected to the Local Database.');
});

mongoose.connection.on('error', console.error.bind(console, 'MongoDB Connection Error:'));
mongoose.set('debug', true);

module.exports = mongoose.connection;

