const mongoose = require("mongoose");

const connectMongoDb = async (url) => {
  mongoose.connect(url);
};

module.exports = { connectMongoDb };
