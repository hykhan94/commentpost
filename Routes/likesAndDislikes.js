const express = require("express");
const {
  handleLikeNewPost,
  handleUnLikeNewPost,
} = require("../Controller/likesAndDislikes");
const likesAndDislikesRouter = express.Router();

likesAndDislikesRouter
  .route("/")
  .put(handleLikeNewPost)
  .put(handleUnLikeNewPost);

module.exports = likesAndDislikesRouter;
