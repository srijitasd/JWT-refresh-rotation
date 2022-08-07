const Mongoose = require("mongoose");

const PostSchema = new Mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    trim: true,
  },
  id: {
    type: Number,
    trim: true,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    trim: true,
    required: true,
  },
  body: {
    type: String,
    trim: true,
    required: true,
  },
});

const Post = Mongoose.model("Post", PostSchema);

module.exports = Post;
