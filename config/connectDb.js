const mongoose = require("mongoose");
const bluebird = require("bluebird");

// connect MongoDB
require("dotenv").config();
mongoose.set("useFindAndModify", false);

let connectDB = () => {
  mongoose.Promise = bluebird;

  // mongodb://localhost:27017/app-chat-nodejs
  let URI = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  return mongoose.connect(
    URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connect to DB successfully");
    }
  );
};

module.exports = connectDB;

// const mongoose = require("mongoose");
// const bluebird = require("bluebird");

// require("dotenv/config");

// let connectDB= () => {
//     mongoose.Promise = bluebird;

// }
