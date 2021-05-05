const userOn = require("./userOn");
const fastingLevel = require("./fastingLevel");
const pushNotification = require("./pushNotification");

let initSockets = (io) => {
  userOn(io);
  fastingLevel(io);
  pushNotification(io);
};
module.exports = initSockets;
