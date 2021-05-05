const planModel = require("../model/plan");
let fastingLevel = (io) => {
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

    socket.on("time-passed-level", (data) => {
      let time = data;
      socket.emit("req-time-passed-level", time);
    });
    socket.on("disconnect", (data) => {
      socket.emit("req-time-passed-level", data);
    });
  });
};

module.exports = fastingLevel;
