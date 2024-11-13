// DROPDOWN MENU

const toggleButton = document.querySelector(".dropdown-toggle");
const dropdownMenuList = document.querySelector(".dropdown-menu");
const openModals = document.querySelectorAll(".open-modal");
const closeModals = document.querySelectorAll(".close-modal");
const modals = document.querySelectorAll(".modal");

toggleButton.addEventListener("click", () => {
  dropdownMenuList.classList.toggle("hidden");
});

// MODALS

openModals.forEach((button, index) => {
  button.addEventListener("click", () => {
    modals[index].showModal();
  });
});

closeModals.forEach((button, index) => {
  button.addEventListener("click", () => {
    modals[index].close();
  });
});
