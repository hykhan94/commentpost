const express = require("express");
const {
  handleCreateNewComment,
  handleGetPostById,
} = require("../Controller/comment");

const commentRouter = express.Router();
commentRouter.route("/").post(handleCreateNewComment).get(handleGetPostById);

module.exports = commentRouter;
