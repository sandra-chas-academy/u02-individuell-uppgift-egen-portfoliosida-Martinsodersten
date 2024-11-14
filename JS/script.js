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

// Json fetch and display
fetch("../data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error");
    }
    return response.json();
  })
  .then((data) => {
    const aboutSections = document.querySelectorAll(".about-subsection");

    aboutSections.forEach((section, index) => {
      if (data[index]) {
        section.querySelector(".title").innerText = data[index].title;
        section.querySelector(".company").innerText = data[index].company;
        section.querySelector(".location").innerText = data[index].location;
        section.querySelector(".date").innerText = data[index].date;
      }
    });
  })
  .catch((error) => console.error("Error loading JSON:", error));

const username = "Martinsodersten";

// Funktion för att hämta repos från GitHub
// fetch(`https://api.github.com/users/${username}/repos`).then((response) => {
//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }
//   return response.json();
// })
//  .then((data) => {
//   console.log(data);
//  })
