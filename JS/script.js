// DROPDOWN MENU

const toggleButton = document.querySelector(".dropdown-toggle");
const dropdownMenuList = document.querySelector(".dropdown-menu");
const openModals = document.querySelectorAll(".open-modal");
const closeModals = document.querySelectorAll(".close-modal");
const modals = document.querySelectorAll(".modal");
const repoContainer = document.getElementById("repoContainer");
const repoImages = ["../img/projecttile1.jpg"];

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
fetch(`https://api.github.com/users/${username}/repos`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((repos) => {
    repos.forEach((repo) => {
      const repoCard = document.createElement("div");
      repoCard.classList.add("repo-card");

      const image = document.createElement("img");
      image.src = repoImages[0];
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

      repoCard.appendChild(title);
      repoCard.appendChild(description);
      repoCard.appendChild(link);
      repoCard.appendChild(image);

      repoContainer.appendChild(repoCard);
    });
  })
  .catch((error) => console.error("Error fetching repositories:", error));
