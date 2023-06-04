const User = require("../Model/user");

const handleGetAllUsers = async (req, res) => {
  try {
    const results = await User.find().exec();
    res.send(results);
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = { handleGetAllUsers };
