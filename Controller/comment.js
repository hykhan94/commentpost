const Comment = require("../Model/comment");

//Create new comment
const handleCreateNewComment = async (req, res) => {
  const body = req.body; //This line accepts code from Postman's body
  const userId = req.headers["user_id"]; //This line is taking user_id from headers
  const postId = req.headers["post_id"]; //This line is taking post_id from headers
  if (!body || !body.comment) {
    return res.status(400).json({ msg: "Comment is required..." });
  } //This line shall be executed if either body or comment from the body is missing.
  const result = new Comment({
    content: body.comment,
    user: userId,
    post: postId,
  }); //This line is accepting content from the body while user and post will containe it's respective ids that were auto-generated while creating users and posts.
  result.save(); //This line will save all info posted in 'result'
  res.status(200).json({
    msg: "Comment is successfully created...",
    comment: result.toJSON(),
  }); //This line will show message after saving comment and show the saved comment after converting to JSON.
};

//find comments by id
const handleGetPostById = async (req, res) => {
  const userId = req.headers["user_id"]; //This line accepts user_id from headers
  const postId = req.headers["post_id"]; //This line accepts post_id from headers
  const comment = await Comment.findOne({
    user: userId,
    post: postId,
  })
    .populate("user", "-_id -__v -password")
    .populate("post"); //This line will find and display comments from specific user and post. It will not password.
  if (!comment) return res.status(400).json({ msg: "No comment found" }); //This lone will execute if no comment is found
  return res.status(200).json(comment.toJSON()); //This will return status of 200 and convert the data to JSON.
};

module.exports = {
  handleCreateNewComment,
  handleGetPostById,
};
