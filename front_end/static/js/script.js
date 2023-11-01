const form = document.getElementById("myForm");
const dropdown = document.getElementById("dropdown");
const [questionsubject, skillsubject, projectsubject] = [
  document.getElementById("subject1"),
  document.getElementById("subject2"),
  document.getElementById("subject3")]
const searchbar = document.getElementsByClassName("input-container");

var inputElement = document.getElementById("InputField");
var inputText = inputElement.textContent;

const walkthrough_title = document.getElementById("project-type");


//RENDER WEB-PAGE AFTER LOADING-PAGE 
window.addEventListener('load', function () {
  setTimeout(function () { //SET LOADING-TIMER
      const loadingContainer = document.querySelector('.loading-container');
      const content = document.querySelector('.website-container');

      loadingContainer.style.display = 'none';
      content.style.display = 'block';
  }, 2500); // 1000 milliseconds = 1.0 seconds
});


//CLASS OF SKILL-LEVELS FOR PROJECTS
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


//Interaction with the Generate-Button
form.addEventListener("submit", function(event) {
  event.preventDefault();
  if (inputElement.value.trim() !== '') { //If Input is not Empty, Render Skill Levels
    showDropdown(skillLevelNames); //Display Dropdowns Of Skill Levels

    questionsubject.style.display = "none";
    skillsubject.style.display = "block"; //Change Subject Titles
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

    fetch('/project_searching', { //Send User's Input Text and Skill Level to the Server
      method: 'POST',
      body: JSON.stringify({input_text: inputElement.value , skill_level: selectedItem }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => { //BACK_END LIST OF PROJECT DROPDOWN
        showDropdown(data.project_list)
    })
    .catch(error => { //FRONT_END LIST OF PROJECT DROPDOWN
      console.error("YOU ARE IN FRONT_END DISPLAY ONLY");
      showDropdown(["TEMP_PROJECT 1", "TEMP_PROJECT 2","TEMP_PROJECT 3", "TEMP_PROJECT 4","TEMP_PROJECT 5", "TEMP_PROJECT 6","TEMP_PROJECT 7", "TEMP_PROJECT 8","TEMP_PROJECT 9", "TEMP_PROJECT 10",])
    });

    dropdown.style.display = "none";
    skillsubject.style.display = "none";
    projectsubject.style.display = "block";
    
  }
  else {
    walkthrough_title.textContent = selectedItem; //CHANGE WALKTHROUGH TITLE TO PROJECT SELECTED

    for (let i = 0; i < searchbar.length; i++) { //Stop Heighlighting Dropdown Border
      searchbar[i].style.border = "none";
    }
    dropdown.style.display = "none";
    projectsubject.style.display = "none";
    questionsubject.style.display = "block";
  }
}
