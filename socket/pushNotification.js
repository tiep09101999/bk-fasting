const subscriptionModel = require("../model/subscription");

let pushNotification = (io) => {
  io.on("connection", async (socket) => {
    let sub = await subscriptionModel.findLastSub(socket.request.user._id);
    socket.on("push-notification-before-1-hour", (data) => {
      let payload1 = JSON.stringify({
        title: "Sắp đến giờ rồi !!",
        body: "Còn 1 tiếng nữa là đến giờ ăn uống rồii",
      });
      webPush
        .sendNotification(sub, payload1)
        .catch((error) => console.error(error));
    });
    socket.on("push-notification-after-fasting-1-day", (data) => {
      let str = "Bạn đã nhịn ăn quá " + data + " ngày";
      let payload2 = JSON.stringify({
        title: "Hãy quay lại nào !!",
        body: str,
      });
      webPush
        .sendNotification(sub, payload2)
        .catch((error) => console.error(error));
    });
  });
};

module.exports = pushNotification;
