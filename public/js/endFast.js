function endFast() {
  // khi  ấn dừng lấy ra time bắt đầu
  $("#btnSaveFasting")
    .off("click")
    .on("click", function () {
      let timeStart = $(this).data("time");
      let takeNote = $("#take_note").val();
      let waterDrunk = $("#modal__drinkTitle > span").text();
      $.ajax({
        url: "/addTimeLine",
        method: "post",
        data: {
          dateStart: timeStart,
          dateEnd: Date.now(),
          takeNote: takeNote,
          waterDrunk: waterDrunk,
        },
        success: function (data) {
          if (data.success) {
            location.reload();
          }
        },
      });
    });
}
$(document).ready(function () {
  endFast();
});
