function customPlan() {
  // lấy ra thời gian user chọn
  $("#btn-start-custom-plan")
    .off("click")
    .on("click", function () {
      let time = $("#custom-time").val();
      if (time.length < 1) {
        alertify.notify("Bạn chưa chọn thời gian", "error", 3);
        return false;
      }
      console.log(time);

      $.ajax({
        url: "/choose-custom-plan",
        method: "put",
        data: {
          timeToStart: time,
        },
        success: function (data) {
          if (data.success) {
          }
        },
      });
    });
}
customPlan();
