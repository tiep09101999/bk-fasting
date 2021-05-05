// open Modal Custom
// let dateControl = document.querySelector('input[type="datetime-local"]');
// dateControl.value = new Date();
const custom = document.querySelector(".choose__card2.custom"),
  modalCustom = document.querySelector(".modal.custom"),
  iconCloseCustom = document.querySelector(".custom .modal__icon"),
  body = document.querySelector("body");

custom.addEventListener("click", openModalCustom);

iconCloseCustom.addEventListener("click", closeModalCustom);

function openModalCustom() {
  modalCustom.classList.add("open");
  modalCustom.style.overflow = "hidden";

  if (window.innerWidth < 799) {
    body.style.overflow = "hidden";
  }
}

function closeModalCustom() {
  modalCustom.classList.remove("open");

  modalCustom.style.overflow = "visible";

  if (window.innerWidth < 799) {
    body.style.overflow = "visible";
  }
}
