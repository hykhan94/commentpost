const number = require("@hapi/joi/lib/types/number");
const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

//model
const Post = mongoose.model("post", postsSchema);
module.exports = Post;
