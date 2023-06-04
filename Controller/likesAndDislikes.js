const LikesAndDislikes = require("../Model/likesAndDislikes");
const mongoose = require("mongoose");

//increment like on a post
const handleLikeNewPost = async (req, res) => {
  const userId = req.headers["user_id"];
  const postId = req.headers["post_id"];

  try {
    const result = await LikesAndDislikes.findByIdAndUpdate(
      postId,
      { $push: { likes: userId } },
      { new: true }
    );

    res.json(result);
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

//decrement like on a post
const handleUnLikeNewPost = async (req, res) => {
  const userId = req.headers["user_id"];
  const postId = req.headers["post_id"];

  try {
    const result = await LikesAndDislikes.findByIdAndUpdate(
      postId,
      { $pull: { likes: userId } },
      { new: true }
    );

    res.json(result);
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

module.exports = { handleLikeNewPost, handleUnLikeNewPost };
