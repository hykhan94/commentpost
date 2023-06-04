const express = require("express");
const {
  handleGetPostByUserId,
  handleCreateNewPost,
} = require("../Controller/posts");
const { handleMiddleware } = require("../Middlewares/authMiddleware");

const postRouter = express.Router();
postRouter.use(handleMiddleware);
postRouter.route("/").get(handleGetPostByUserId).post(handleCreateNewPost);

module.exports = postRouter;
