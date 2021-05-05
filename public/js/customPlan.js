function customPlan() {
  // lấy ra thời gian user chọn
  $("#btn-start-custom-plan")
    .off("click")
    .on("click", function () {
      let timeToStart = $("#custom-time").val();
      let time = Date.now();
      let distanceTime =
        Math.floor((new Date(timeToStart).getTime() - time) / 1000) + 1;
      if (timeToStart.length < 1) {
        alertify.notify("Bạn chưa chọn thời gian", "error", 3);
        return false;
      }
      console.log(time);

      $.ajax({
        url: "/choose-custom-plan",
        method: "put",
        data: {
          timeToStart: timeToStart,
          timelimit: distanceTime,
        },
        success: function (data) {
          if (data.success) {
          }
        },
      });
    });
}
customPlan();
