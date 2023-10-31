$(document).ready(function() {
  console.log("Hello Jquery loaded in js file");
});

const form = document.getElementById("myForm");
const dropdown = document.getElementById("dropdown");
const [questionsubject, skillsubject, projectsubject] = [
  document.getElementById("subject1"),
  document.getElementById("subject2"),
  document.getElementById("subject3")]
const searchbar = document.getElementsByClassName("input-container")

var inputElement = document.getElementById("InputField");
var inputValue = inputElement.value


//RENDER WEB-PAGE AFTER LOADING-PAGE 
window.addEventListener('load', function () {

  setTimeout(function () {
      const loadingContainer = document.querySelector('.loading-container');
      const content = document.querySelector('.website-container');

      loadingContainer.style.display = 'none';
      content.style.display = 'block';
  }, 0); // 1000 milliseconds = 1.0 seconds
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

form.addEventListener("submit", function(event) { //im not sure if i like the fact that this doesnt know that its holding skillLevel objects
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
    alert("AYO");
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


function addButtons() { //maybe change to boxes to make back buttons and walkthrough buttons
  /*
  adds an array of text into the walkthroughs
  */
  TEST = ["blah blah blah", "E E E E", "T T T t"]; //would just add it as a parameter here for steps array
  for (let i = 0; i < TEST.length; i++) {
    let step = (i + 1).toString();
    let walkthrough = TEST[i];
    const text1 = `Step ${step}: ${walkthrough}`; //converts the list into text for buttons
    const id = `button-step-${step}`;
    addButton(text1, id);
  }
}

function addButton(text, id) {
  /*
  adds individual buttons before div-line-end
  */
  let txt2 = $(`<button id=${id} onclick="stepButtonCLicked(this)"></button>`).text(text); //probably add onCLicked to submit text for backend
  $("#div-line-end").before(txt2);
  txt2.addClass("step-button");
  console.log("it working");
}

function stepButtonCLicked(ele) {
  let id = ele.id;
  let text = document.getElementById(id).innerHTML; // would prob need to parse out the Step {number}: to get good prompt or be able to share the walkthrough text
  $('#project-type').html(text); //changing text of existing HTML
  /*
  -----add back-end function here------
  */
  console.log("step button clicked");
}

