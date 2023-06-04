const express = require("express");
const { handleGetAllUsers } = require("../Controller/authDashboard");
const { handleMiddleware } = require("../Middlewares/authMiddleware");

const authRouter = express.Router();
authRouter.use(handleMiddleware);
authRouter.route("/").get(handleGetAllUsers);

module.exports = authRouter;
