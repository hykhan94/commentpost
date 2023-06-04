const express = require("express");
const {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
} = require("../Controller/user");

const registerRouter = express.Router();

registerRouter.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

registerRouter
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = registerRouter;
