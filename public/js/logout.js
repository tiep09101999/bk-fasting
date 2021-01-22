// function logout() {
$("#logout_confirm").on("click", function () {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     type: "question",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       $.get("/logout", function () {});
  //     }
  //   });
  let timerInterval;
  Swal.fire({
    position: "top-end",
    title: "Đăng xuất sau 3 giây",
    html: "<strong></strong>",
    timer: 2000,
    onBeforeOpen: () => {
      Swal.showLoading();
      timerInterval = setInterval(() => {
        Swal.getContent().querySelector("strong").textContent = Math.ceil(
          Swal.getTimerleft() / 1000
        );
        //Swal.getContent().querySelector("strong").textContent = Swal.getTimerleft();
      }, 1000);
    },
    onClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    $.get("/logout", function () {
      location.reload();
    });
  });
});
// }

// $(document).ready(function () {
//   logout();
// });
