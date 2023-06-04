const User = require("../Model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//login users
const handleLoginUsers = async (req, res) => {
  const body = req.body;
  const email = req.headers["email"]; //This will accept email to be entered in the header
  const password = req.headers["password"]; //This will accept password to be entered in the header

  //Checking if email-user exists
  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).json({ msg: "Incorrect Email-ID" });
  //Checking if user password matches
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(400).json({ msg: "Incorrect Password" });
  try {
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send(token);
  } catch (error) {
    res.status(400).send(error.message);
  }
  //res.status(200).json({ msg: "success" });
};

module.exports = {
  handleLoginUsers,
};
