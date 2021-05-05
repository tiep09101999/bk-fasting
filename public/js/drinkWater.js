function drinkWater() {
  // khi thực hiện uống nước
  $("#addDrink").on("click", function () {
    // lấy giá trị lượng nước đang đc chọn để cộng thêm
    let data = +$("#addDrink > span").text();
    // lượng nước đã uống
    let dataBefore = +$("#modal__drinkTitle > span").text();
    // lượng nước sau khi cộng
    let dataAfter = data + dataBefore;
    $.ajax({
      url: "/updateWaterDrunk",
      method: "put",
      data: {
        waterDrunk: dataAfter,
      },
      success: function (data) {
        if (data.success) {
          $("#modal__drinkTitle > span").text(dataAfter);
        }
      },
    });
  });
  // trừ lượng nước đã uống
  $("#subDrink").on("click", function () {
    let data = +$("#addDrink > span").text();
    let dataBefore = +$("#modal__drinkTitle > span").text();
    let dataAfter = "";
    // nếu như lượng nước đã uống ít hơn mực nước chọn thì sẽ set giá trị
    // đã uống về 0
    if (dataBefore < data) {
      dataAfter = 0;
    } else {
      dataAfter = dataBefore - data;
    }
    $.ajax({
      url: "/updateWaterDrunk",
      method: "put",
      data: {
        waterDrunk: dataAfter,
      },
      success: function (data) {
        if (data.success) {
          $("#modal__drinkTitle > span").text(dataAfter);
        }
      },
    });
  });
}

// khi thay đổi lượng nước mặc định
function changeWaterAmount() {
  $("#modal_cup")
    .off("click")
    .on("click", function () {
      let data = $(this).data("drink");
      $("#addDrink > span").text(data);
      $.ajax({
        url: "/updateWaterAmount",
        method: "put",
        data: {
          waterAmount: data,
        },
        success: function (data) {
          if (data.success) {
          }
        },
      });
    });
}
$(document).ready(function () {
  drinkWater();
  changeWaterAmount();
});
