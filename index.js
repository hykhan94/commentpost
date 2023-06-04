const express = require("express");
const app = express();

const registerRouter = require("./Routes/user");
const postRouter = require("./Routes/post");
const commentRouter = require("./Routes/comment");
const loginRouter = require("./Routes/login");
const authRouter = require("./Routes/authVerify");
const likesAndDislikesRouter = require("./Routes/likesAndDislikes");

const { connectMongoDb } = require("./connections");
const PORT = 8001;
const router = express.Router();

//connections
//
connectMongoDb("mongodb://127.0.0.1:27017/my-db").then(() => {
  console.log("MongoDB is connected");
}); //This will establish collection with mongodb. This passes on a promise that if mongodb is connected, it will then console log message.

//Middleware
app.use(express.urlencoded({ extended: false })); //This middleware is used when the data to be entered from the body is in 'x-www-form-urlencoded'

//api routes
router.use("/register", registerRouter);
router.use("/posts", postRouter);
router.use("/comment", commentRouter); //all of these routes are coming their respective name files
router.use("/login", loginRouter);
router.use("/allusers", authRouter);
router.use("/likes", likesAndDislikesRouter);

//mount the router in the application
app.use("/api", router); //this route is the main route. 'app' route is used for routing on mian index page while 'router' is used for routing via different files

//connection established
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
