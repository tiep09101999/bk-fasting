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

    // tính thời gian đã trôi qua
    let time = new Date();
    let choosePlanTime = socket.request.user.plan.chooseAt;
    let flag = choosePlanTime >= time ? true : false;
    // khoảng cách 2 thời gian nếu user chọn custom plan
    let distanceTime = flag
      ? parseInt((choosePlanTime - time) / 1000)
      : parseInt((time - choosePlanTime) / 1000);
    let plan = await planModel.model.findPlanById(
      socket.request.user.plan.planId
    );

    // data này khi user chọn thời điểm ở tương lai và phải đợi đến
    let data_wait = {
      timePassed: distanceTime,
      timelimit: 86400,
      chooseAt: choosePlanTime,
      notice: "custom-wait",
    };
    // chọn time trong quá khứ và coi như đã trải qua
    let data_passed = {
      timePassed: distanceTime,
      timelimit: 86400,
      chooseAt: choosePlanTime,
      notice: "custom-passed",
    };
    let data_feeding_custom = {
      timePassed: distanceTime,
      timelimit: 86400,
      chooseAt: choosePlanTime,
      notice: "feeding",
    };

    if (socket.request.user.plan.name === "custom") {
      socket.on("user-online", () => {
        if (socket.request.user.plan.isEndFasting) {
          console.log(
            "User " + socket.request.user.username + " online - feeding"
          );
          socket.emit("req-user-online", data_feeding_custom);
        } else {
          if (flag) {
            console.log(
              "User " + socket.request.user.username + " online - waiting"
            );
            socket.emit("req-user-online", data_wait);
          } else {
            console.log(
              "User " + socket.request.user.username + " online - custom-passed"
            );
            socket.emit("req-user-online", data_passed);
          }
        }
      });
    } else {
      // trường hợp khi user chọn plan thường
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
          console.log(
            "User " + socket.request.user.username + " online - feeding"
          );
          socket.emit("req-user-online", data_feeding);
        } else {
          console.log(
            "User " + socket.request.user.username + " online - fasting"
          );
          socket.emit("req-user-online", data_fasting);
        }
      });
      // socket.on("disconnect", () => {
      //   // let timeDisconnect = new Date();
      //   // let time = timeDisconnect - data;
      //   if (socket.request.user.plan.isEndFasting) {
      //     console.log("User " + socket.request.user.username + " offline 123");
      //     socket.emit("req-user-online", data_feeding);
      //   } else {
      //     console.log("User " + socket.request.user.username + " offline");
      //     socket.emit("req-user-online", data_fasting);
      //   }
      // });
    }
  });
};

module.exports = userOn;
