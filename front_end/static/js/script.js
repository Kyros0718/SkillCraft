const form = document.getElementById("myForm");
const dropdown = document.getElementById("dropdown");
const [questionsubject, skillsubject, projectsubject] = [
  document.getElementById("subject1"),
  document.getElementById("subject2"),
  document.getElementById("subject3")]
const searchbar = document.getElementsByClassName("input-container")

var inputElement = document.getElementById("InputField");
var inputValue = inputElement.value;


//RENDER WEB-PAGE AFTER LOADING-PAGE 
window.addEventListener('load', function () {

  setTimeout(function () {
      const loadingContainer = document.querySelector('.loading-container');
      const content = document.querySelector('.website-container');

      loadingContainer.style.display = 'none';
      content.style.display = 'block';
  }, 2500); // 1000 milliseconds = 1.0 seconds
});


class SkillLevel {
  constructor(Level) {
    this._skillLevel = Level;
  }
  get skillLevel() {
    return this._skillLevel;
  }
}

const skillLevels = [
  new SkillLevel("Beginner"),
  new SkillLevel("Intermediate"),
  new SkillLevel("Expert")];

const skillLevelNames = skillLevels.map(level => level.skillLevel);

form.addEventListener("submit", function(event) {
  event.preventDefault();
  if (inputElement.value.trim() !== '') { //If Input is not Empty, Render Skill Levels
    
    showDropdown(skillLevelNames);

    questionsubject.style.display = "none";
    skillsubject.style.display = "block";
    projectsubject.style.display = "none";
  }
  else { //If Empty, dont Render Anything

    dropdown.style.display = "none";

    questionsubject.style.display = "block";
    skillsubject.style.display = "none";
    projectsubject.style.display = "none";
  }

  if (dropdown.style.display !== "none") { //If Dropdown, Highlight Border
    for (let i = 0; i < searchbar.length; i++) {
      searchbar[i].style.border = "1px solid white";
    }
  }
});

function showDropdown(items) {
    dropdown.style.display = "block";
    dropdown.innerHTML = ""; // Clear previous options
    

    items.forEach(itemText => {
        const resultItem = document.createElement("div");
        resultItem.classList.add("result-item");
        resultItem.textContent = itemText;
        resultItem.addEventListener("click", () => onItemClicked(itemText));
        dropdown.appendChild(resultItem); // Corrected the variable name here
    });
}

function onItemClicked(selectedItem) {
  if (skillLevelNames.includes(selectedItem)) {
    dropdown.style.display = "none";
    skillsubject.style.display = "none";
    projectsubject.style.display = "block";
    showDropdown(["item1","item2","item3","item4","item5","item6","item7","item8","item9","item10"])
  }
  else {
    for (let i = 0; i < searchbar.length; i++) {
      searchbar[i].style.border = "none";
    }
    dropdown.style.display = "none";
    projectsubject.style.display = "none";
    questionsubject.style.display = "block";
  }
}
