const User = require("../Model/user");
const bcrypt = require("bcryptjs");

//find all users
const handleGetAllUsers = async (req, res) => {
  const allDbUsers = await User.find(req.params.id);
  return res.send(allDbUsers);
}; //It will show all users along with the auto-generated IDs

//create new user
const handleCreateNewUser = async (req, res) => {
  const body = req.body; //Body will accept following parameters
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.password
  ) {
    return res.status(400).json({ msg: "All fields are required..." });
  } //if any of the parameter is missing, it will show the error message
  const emailExist = await User.findOne({ email: body.email }); //Checking if email already exists
  if (emailExist) {
    res.status(400).json({ msg: "Email already exists" }); //If email already exists, it shall execute this line
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(body.password, salt);
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    password: hashedPassword,
  }); //New instance shall be created that will include parameters added in body
  result.save();
  console.log(result);
  return res.status(201).json({ msg: "Success" }); //after successfully logging al the fields, 'Success' message shall appear in postman
};

//find user by id
const handleGetUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(400).json({ msg: "No user found" });
  return res.send(user); //This will find users with the help of uniquely generated ID. Note that we have to add id in the link rather than adding id in the header.
};

//update user by id and update
const handleUpdateUserById = async (req, res) => {
  const body = req.body;
  await User.findByIdAndUpdate(req.params.id, {
    lastName: "Changed",
  });
  return res.json({ msg: "Success" }); //This will change the last name of user by finding user with the help of id.
};

//delete user by id
const handleDeleteUserById = async (req, res) => {
  const body = req.body;
  await User.findByIdAndDelete(req.params.id);
  return res.json({ msg: "Success" });
}; //This will delete user by finding user with the help of id.

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
