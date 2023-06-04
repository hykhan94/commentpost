const express = require("express");
const { handleLoginUsers } = require("../Controller/login");

const loginRouter = express.Router();

loginRouter.route("/").post(handleLoginUsers);

module.exports = loginRouter;
