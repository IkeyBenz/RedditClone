const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  createdAt: { type: Date },
  updatedAt: { type: Date },
  title: { type: String, required: true },
  url: { type: String, required: true },
  summary: { type: String, required: true },
  subreddit: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

PostSchema.pre("save", function(next) {
  const now = new Date();
  this.updatedAt = now;
  this.createdAt = this.createdAt || now;
  for (param of ['title', 'url', 'summary', 'subreddit']) {
    if (!this[param])
      return console.error(`Post ${param} is required and was not included in your attempted post.`);
  }
  next();
});

module.exports = mongoose.model("Post", PostSchema);