// DROPDOWN MENU

const toggleButton = document.querySelector(".dropdown-toggle");
const dropdownMenuList = document.querySelector(".dropdown-menu");
const openModals = document.querySelectorAll(".open-modal");
const closeModals = document.querySelectorAll(".close-modal");
const modals = document.querySelectorAll(".modal");
const repoContainer = document.getElementById("repoContainer");

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
fetch("./data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error");
    }
    return response.json();
  })
  .then((data) => {
    const aboutSections = document.querySelectorAll(".work-subsection");

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




// Fetching and displaying public repos  from Github
document.addEventListener("DOMContentLoaded", () => {
  const repoContainer = document.getElementById("repoContainer");

  if (!repoContainer) {
    console.log("No repoContainer found on this page. Skipping repo rendering.");
    return; 
  }

  const username = "Martinsodersten";
  const repoImages = [
    "./minesweeper-img.png",
    "./pig-game-img.png",
    "./todo-img.png",
    "./projecttile1.jpg",
  ];

  fetch(`https://api.github.com/users/${username}/repos`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((repos) => {
      // Begränsa till de första 4 repositories
      repos.slice(0, 4).forEach((repo, index) => {
        const repoCard = document.createElement("div");
        repoCard.classList.add("repo-card");

        const image = document.createElement("img");
        image.src = repoImages[index] || "./default-image.png"; // Hantera om bilder saknas
        image.alt = `${repo.name} image`;
        image.classList.add("repo-image");

        const title = document.createElement("h2");
        title.classList.add("repo-title");
        title.innerText = repo.name;

        const description = document.createElement("p");
        description.classList.add("repo-description");
        description.innerText = repo.description || "No description available.";

        const link = document.createElement("a");
        link.classList.add("repo-link");
        link.href = repo.html_url;
        link.target = "_blank";
        link.innerText = "View repository";

        repoCard.appendChild(image);
        repoCard.appendChild(title);
        repoCard.appendChild(description);
        repoCard.appendChild(link);

        repoContainer.appendChild(repoCard);
      });
    })
    .catch((error) => console.error("Error fetching repositories:", error));
});
