const Post = require("../Model/posts");
const mongoose = require("mongoose");
const User = mongoose.model("user");

//Create new post
const handleCreateNewPost = async (req, res) => {
  const body = req.body; //This will accept post to be entered in the body
  const userId = req.headers["user_id"]; //This will accept user_id to be entered in the header
  if (!body || !body.post) {
    return res.status(400).json({ msg: "Post is required..." });
  } //It will chek whether post is entered in the body or not?
  const result = new Post({
    content: body.post,
    user: userId,
  }); //This will create a new instance where it accepts new post and userid.
  result.save();
  res
    .status(200)
    .json({ msg: "Post is successfully created...", post: result.toJSON() });
}; //content and user that were created under a new instance named as 'result' shall be saved and message will be displayed.

//find posts by id
const handleGetPostByUserId = async (req, res) => {
  const userId = req.headers["user_id"]; //This will accept user_id in haeders
  const post = await Post.findOne({ user: userId }).populate(
    "user",
    "-_id -__v -password"
  ); //Post will be searched from the given user_id. While user will be populated, it's password shall remain hidden

  if (!post) return res.status(400).json({ msg: "No post found" });
  return res.status(200).json(post.toJSON());
}; //If no post is found against a user, message of 'No Post found' shall be displayed, otherwise post shall be displayed by converting result to JSON.

module.exports = {
  handleGetPostByUserId,
  handleCreateNewPost,
};
