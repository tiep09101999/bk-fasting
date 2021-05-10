// open Modal Custom
// let dateControl = document.querySelector('input[type="datetime-local"]');
// dateControl.value = new Date();
const custom = document.querySelector(".choose__card2.custom"),
  modalCustom = document.querySelector(".modal.custom"),
  remindMe = document.querySelector(".modal.remind"),
  iconCloseCustom = document.querySelector(".custom .modal__icon"),
  iconCloseRemind = document.querySelector(".custom .remind_icon"),
  body = document.querySelector("body");

$("#btnStartPlanAgainCustom")
  .off("click")
  .on("click", function () {
    openModalCustom();
  });
$("#modal_icon")
  .off("click")
  .on("click", function () {
    closeModalCustom();
  });
$("#remind__icon")
  .off("click")
  .on("click", function () {
    closeModalRemindMe();
  });

$("#reminder_me")
  .off("click")
  .on("click", function () {
    openModalRemindMe();
  });
custom.addEventListener("click", openModalCustom);
iconCloseCustom.addEventListener("click", closeModalCustom);

function openModalCustom() {
  modalCustom.classList.add("open");
  modalCustom.style.overflow = "hidden";

  if (window.innerWidth < 799) {
    body.style.overflow = "hidden";
  }
}
function openModalRemindMe() {
  remindMe.classList.add("open");
  remindMe.style.overflow = "hidden";

  if (window.innerWidth < 799) {
    body.style.overflow = "hidden";
  }
}

function closeModalRemindMe() {
  remindMe.classList.remove("open");

  remindMe.style.overflow = "visible";

  if (window.innerWidth < 799) {
    body.style.overflow = "visible";
  }
}
function closeModalCustom() {
  modalCustom.classList.remove("open");

  modalCustom.style.overflow = "visible";

  if (window.innerWidth < 799) {
    body.style.overflow = "visible";
  }
}
