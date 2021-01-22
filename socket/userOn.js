const planModel = require("../model/plan");
let userOn = (io) => {
  io.on("connection", async (socket) => {
    // let currentUserId = socket.request.user._id;

    // /**
    //  * Trong truong hop user mở nhiều tab ( mỗi tab là 1 socket.id riêng)
    //  * thì sẽ có nhiều socketId cho user đó. Phải lưu vào 1 mảng
    //  * để có thể truyền về cho tất cả các tab
    //  */

    // if (clients[currentUserId]) {
    //   clients[currentUserId].push(socket.id);
    // } else {
    //   clients[currentUserId] = [socket.id];
    // }

    // lấy ra user chọn Plan từ khi nào

    let plan = await planModel.model.findPlanById(
      socket.request.user.plan.planId
    );

    // tính thời gian đã trôi qua
    let time = new Date();
    let choosePlanTime = socket.request.user.plan.chooseAt;
    let timePassed = parseInt((time - choosePlanTime) / 1000);

    let data_fasting = {
      timePassed: timePassed,
      timelimit: plan.fastHours * 3600,
      chooseAt: choosePlanTime,
      notice: "fasting",
    };
    let data_feeding = {
      timePassed: timePassed,
      timelimit: plan.eatHours * 3600,
      // lúc này chooseAt đã được update thành thời điểm khi user ấn button "Kết thúc"
      // để end fasting
      chooseAt: choosePlanTime,
      notice: "feeding",
    };

    socket.on("user-online", () => {
      if (socket.request.user.plan.isEndFasting) {
        console.log("User " + socket.request.user.username + " online 123");
        socket.emit("req-user-online", data_feeding);
      } else {
        console.log("User " + socket.request.user.username + " online");
        socket.emit("req-user-online", data_fasting);
      }
    });
  });
};

module.exports = userOn;
