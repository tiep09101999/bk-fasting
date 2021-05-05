// open Modal editAccount

const editAccount = document.querySelector(".editAccount"),
  buttonUpdateUser = document.querySelector("#btn-update-user"),
  modaleditAccount = document.querySelector(".modal.editAccount"),
  iconCloseeditAccount = document.querySelector(".editAccount .modal__icon"),
  body2 = document.querySelector("body");

editAccount.addEventListener("click", openModaleditAccount);

iconCloseeditAccount.addEventListener("click", closeModaleditAccount);
buttonUpdateUser.addEventListener("click", closeModaleditAccount);

function openModaleditAccount() {
  modaleditAccount.classList.add("open");
  modaleditAccount.style.overflow = "hidden";

  if (window.innerWidth < 799) {
    body2.style.overflow = "hidden";
  }
}

function closeModaleditAccount() {
  modaleditAccount.classList.remove("open");

  modaleditAccount.style.overflow = "visible";

  if (window.innerWidth < 799) {
    body2.style.overflow = "visible";
  }
}
