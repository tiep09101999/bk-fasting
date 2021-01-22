const userOn = require("./userOn");
const fastingLevel = require("./fastingLevel");

let initSockets = (io) => {
  userOn(io);
  fastingLevel(io);
};
module.exports = initSockets;
