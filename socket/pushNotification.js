const subscriptionModel = require("../model/subscription");
const webPush = require("web-push");
let pushNotification = (io) => {
  io.on("connection", async (socket) => {
    let items = await subscriptionModel.findSubByUserId(
      socket.request.user._id
    );

    socket.on("push-notification-before-1-hour", (data) => {
      let payload1 = JSON.stringify({
        title: "Sắp đến giờ rồi !!",
        body: "Còn 1 tiếng nữa là đến giờ ăn uống rồii",
      });
      items.forEach((sub) => {
        webPush
          .sendNotification(sub.subscription, payload1)
          .catch((error) => console.error(error));
      });
    });
    socket.on("push-notification-after-fasting-1-day", (data) => {
      let str = "Bạn đã nhịn ăn quá dự kiến " + data + " ngày";
      let payload2 = JSON.stringify({
        title: "Hãy quay lại nào !!",
        body: str,
      });
      items.forEach((sub) => {
        webPush
          .sendNotification(sub.subscription, payload2)
          .catch((error) => console.error(error));
      });
    });
    socket.on("finish-time-feeding-window", (data) => {
      let payload2 = JSON.stringify({
        title: "Đã hết thời gian ăn uống !!",
        body: "Hãy quay lại và tiếp tục kế hoạch nào",
      });
      items.forEach((sub) => {
        webPush
          .sendNotification(sub.subscription, payload2)
          .catch((error) => console.error(error));
      });
    });
    socket.on("push-notification-start-fasting-custom-plan", (data) => {
      let payload2 = JSON.stringify({
        title: "Đã đến thời gian nhịn ăn  !!",
        body: " Tiếp tục kế hoạch nào",
      });
      items.forEach((sub) => {
        webPush
          .sendNotification(sub.subscription, payload2)
          .catch((error) => console.error(error));
      });
    });
  });
};

module.exports = pushNotification;
