function calculateTime() {
  $(".choose__card")
    .off("click")
    .on("click", function () {
      let uid = $(this).data("uid");
      $.ajax({
        url: `/choose`,
        method: "put",
        data: { uid: uid },
        success: function (data) {
          if (data.success) {
          }
        },
      });
    });
}

function chooseDifPlan() {
  $("#chooseDifPlan")
    .off("click")
    .on("click", function () {
      $.ajax({
        url: `/choose-dif-plan`,
        method: "put",
        success: function (data) {
          if (data.success) {
            location.reload();
          }
        },
      });
    });
}

function startPlanAgain() {
  $("#btnStartPlanAgain")
    .off("click")
    .on("click", function () {
      let uid = $(this).data("uid");

      $.ajax({
        url: `/choose`,
        method: "put",
        data: { uid: uid },
        success: function (data) {
          if (data.success) {
            location.reload();
          }
        },
      });
    });
}

$(document).ready(function () {
  calculateTime();
  startPlanAgain();
  chooseDifPlan();
});
