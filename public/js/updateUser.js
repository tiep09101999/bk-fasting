let userAvatar = null;
let userInfo = {};
let originAvatarSrc = null; // link ảnh gốc ban đầu khi chưa sửa
let originInfo = {};
let userUpdatePassword = {};
function updateUserInfo() {
  $("#inputImage").bind("change", function () {
    let fileData = $(this).prop("files")[0];
    let math = ["image/png", "image/jpg", "image/jpeg"];
    let limit = 1048576; // 104876 byte = 1Mb

    if ($.inArray(fileData.type, math) === -1) {
      alertify.notify("Kiểu file không hợp lệ. ( jpg/png/jpeg )", "error", 5);
      $(this).val(null);
      return false;
    }
    if (fileData.size > limit) {
      alertify.notify("Ảnh phải có kích thước nhỏ hơn 1MB", "error", 5);
      $(this).val(null);
      return false;
    }
    if (typeof FileReader != "undefined") {
      // let imagePreview = $("#editAvatar");
      // imagePreview.empty();
      let fileReader = new FileReader();
      // fileReader.onload = function (element) {
      //   $("<img>", {
      //     src: element.target.result,
      //     class: "avatar img-circle",
      //     id: "user-modal-avatar",
      //     alt: "avatar",
      //   }).appendTo(imagePreview);
      // };
      // imagePreview.show();
      fileReader.readAsDataURL(fileData);

      let formData = new FormData();
      formData.append("avatar", fileData);
      userAvatar = formData;
    } else {
      alertify.notify("Trình duyệt không hỗ trợ FileReader", "error", 3);
    }
  });
  $("#editName").bind("change", function () {
    let username = $(this).val();
    if (username.length > 17 || username.length < 3) {
      alertify.notify(
        "Username từ 3 đến 17 kí tự và không chứa kí tự đặc biệt",
        "error",
        3
      );
      $(this).val(originInfo.username);
      delete userInfo.username;
      return false;
    }
    userInfo.username = $(this).val();
  });
  $("#editGender").bind("change", function () {
    let gender = $(this).find(":selected").data("gender");
    userInfo.gender = gender;
  });

  $("#editAddress").bind("change", function () {
    let address = $(this).val();
    if (address.length > 17 || address.length < 3) {
      alertify.notify("Địa chỉ chỉ từ 3 đến 17 kí tự", "error", 3);
      $(this).val(originInfo.address);
      delete userInfo.address;
      return false;
    }
    userInfo.address = $(this).val();
  });
  $("#editPhone").bind("change", function () {
    let phone = $(this).val();
    let regExp = new RegExp(/^(0)[0-9]{9,10}$/);

    if (!regExp.test(phone)) {
      alertify.notify("Số điện thoại không hợp lệ", "error", 3);
      $(this).val(originInfo.phone);
      delete userInfo.phone;
      return false;
    }
    userInfo.phone = $(this).val();
  });

  console.log("updateUserinfo");
}

function callUpdateAvatar() {
  $.ajax({
    url: "/user/update-avatar",
    type: "put",
    cache: false,
    processData: false,
    contentType: false,
    data: userAvatar,
    success: function (result) {
      // update avatar ở thanh cá nhân góc phải

      $("#navbar_avatar").attr("src", result.imageSrc);
      $("#");
    },
    // error: function(error){
    //     console.log(error);
    //     $(".user-modal-alert-error").find("span").text(error.responseText);
    //     $(".user-modal-alert-error").css("display", "block");
    // }
  });
}

function callUpdateInfo() {
  $.ajax({
    url: "/user/update-info",
    type: "put",
    data: userInfo,
    success: function (result) {
      //   $(".user-modal-alert-success").find("span").text(result.message);
      //   $(".user-modal-alert-success").css("display", "block");
      $("#navbar-username").text("Xin chào, " + userInfo.username);
      //   // $("#input-btn-cancel-update-user").click();
    },
    error: function (error) {
      $(".user-modal-alert-error").find("span").text(error.responseText);
      $(".user-modal-alert-error").css("display", "block");

      $("#input-btn-cancel-update-user").click();
    },
  });
}

$(document).ready(function () {
  //   originAvatarSrc = $("#user-modal-avatar").attr("src");
  originInfo = {
    username: $("#editName").val(),
    address: $("#editAddress").val(),
    phone: $("#editPhone").val(),
  };
  updateUserInfo();
  $("#btn-update-user").on("click", function () {
    if ($.isEmptyObject(userInfo) && !userAvatar) {
      alertify.notify("Bạn chưa thay đổi dữ liệu", "error", 3);
      return false;
    }
    Swal.fire({
      title: "Bạn có chắc chắn muốn cập nhật thông tin?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
    }).then((result) => {
      if (result.isConfirmed) {
        if (userAvatar) {
          callUpdateAvatar();
        }
        if (!$.isEmptyObject(userInfo)) {
          callUpdateInfo();
        }
      }
    });
  });
});
