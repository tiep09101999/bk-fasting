function endFast() {
  // khi  ấn dừng lấy ra time bắt đầu
  $("#btnSaveFasting")
    .off("click")
    .on("click", function () {
      let dateEnd = Date.now();
      let timeStart = $(this).data("time");
      let takeNote = $("#take_note").val();
      let waterDrunk = $("#modal__drinkTitle > span").text();
      let currentWeight = $("#modal__endFastingInput").val();
      let distanceTime = timeEnd - timeStart;
      $.ajax({
        url: "/addTimeLine",
        method: "post",
        data: {
          currentWeight: currentWeight,
          dateStart: timeStart,
          dateEnd: dateEnd,
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
function deleteEndFast() {
  $("#btnDeleteFasting")
    .off("click")
    .on("click", function () {
      Swal.fire({
        title: "Bạn có chắc chắn muốn xóa lần nhịn ăn này?",
        text: "Bạn sẽ không thể hoàn tác",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có",
      }).then((result) => {
        if (result.isConfirmed) {
          $.ajax({
            url: "/delete-end-fasting",
            method: "put",

            success: function (data) {
              if (data.success) {
                location.reload();
              }
            },
          });
        }
      });
    });
}

function endCustomPlan() {
  $("#btnEndFastingCustom")
    .off("click")
    .on("click", function () {
      let dataEnd = Date.now();
      console.log(dataEnd);
      let timeChoose = $(this).data("time");
      console.log(timeChoose);
      if (dataEnd > timeChoose) {
        let dateEnd = Date.now();
        let timeStart = $(this).data("time");
        let takeNote = $("#take_note").val();
        let waterDrunk = $("#modal__drinkTitle > span").text();
        let currentWeight = $("#modal__endFastingInput").val();
        let distanceTime = timeEnd - timeStart;
        $.ajax({
          url: "/addTimeLine",
          method: "post",
          data: {
            currentWeight: currentWeight,
            dateStart: timeStart,
            dateEnd: dateEnd,
            takeNote: takeNote,
            waterDrunk: waterDrunk,
          },
          success: function (data) {
            if (data.success) {
              location.reload();
            }
          },
        });
      }
    });
}
$(document).ready(function () {
  endFast();
  deleteEndFast();
  endCustomPlan();
});
