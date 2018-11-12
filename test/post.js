const chai = require('chai');
const chaiHttp = require('chai-http');
const {app} = require('../server');
const expect = chai.expect;
chai.use(chaiHttp);

const Post = require('../models/post');

describe('Post', () => {

    it('Should create with valid post attributes at POST /post', (done) => {
        let demoPost = { 
            title: "post title", 
            url: "https://www.google.com", 
            summary: "post summary",
            subreddit: 'tech' // make it fail in your code because it did not have an err for invalid input
        };
        chai.request(app)
            .post('/posts/new')
            .send(demoPost)
            .then((res) => {
                expect(res).to.have.status(200);
                Post.findOne({title: demoPost.title}).then((post) => {
                    expect(post.title).to.equal(demoPost.title);
                })
                return done()
            })
            .catch(err => done(err))
  
    });
});