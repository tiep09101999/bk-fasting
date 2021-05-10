function remindMeLater() {
  // lấy ra thời gian user chọn
  $("#btn-start-remind-me")
    .off("click")
    .on("click", function () {
      //$("#remind-time").trigger("click");
      let timeToStart = $("#remind-time").val();
      let time = Date.now();
      let distanceTime = new Date(timeToStart).getTime() - time;
      console.log(distanceTime);
      if (timeToStart.length < 1) {
        alertify.notify("Bạn chưa chọn thời gian", "error", 3);
        return false;
      }
      let dataSendSocket = {
        distanceTime: distanceTime,
        timeToStart: timeToStart,
      };
      $.ajax({
        url: "/chooseReminder",
        method: "put",
        data: {
          timeToStart: new Date(timeToStart).getTime(),
        },
        success: function (data) {
          if (data.success) {
            // location.reload();
            socket.emit("push-notification-remind-me", dataSendSocket);
          }
        },
      });
    });
}
remindMeLater();
