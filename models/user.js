const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, select: false },
    createdAt: { type: Date },
    updatedAt: { type: Date }
});

UserSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    if (!this.createdAt)
        this.createdAt = this.updatedAt;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            console.log(this.password);
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(password, done) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        console.log(password, this.password);
        done(err, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);