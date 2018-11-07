const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);

const Post = require('../models/post');

describe('Post', () => {
    it('Should create with valid post attributes at POST /post', (done) => {
        var post = { title: "post title", url: "https://www.google.com", summary: "post summary" };
        Post.findOneAndRemove(post, function() {
            Post.find(function(err, posts) {
                var postCount = posts.count;
                chai
                .request("localhost:5000")
                .post("/posts/new")
                .send(post)
                .then(res => {
                    Post.find(function(err, posts) {
                        postCount.should.be.equal(posts.length + 1);
                        res.should.have.status(200);
                        return done();
                    });
                })
                .catch(err => {
                    return done(err);
                });
            });
        });
    });
});