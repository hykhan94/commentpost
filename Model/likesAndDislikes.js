const mongoose = require("mongoose");

const likesAndDislikesSchema = new mongoose.Schema({
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "likes" }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
});

const LikesAndDislikes = mongoose.model(
  "likesAndDislikes",
  likesAndDislikesSchema
);
module.exports = LikesAndDislikes;
