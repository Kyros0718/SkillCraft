//------------------------------ CONST & VAR ------------------------------
const rootStyles = getComputedStyle(document.documentElement);


//WEBSITE NAV/BODY CONST & VAR_____
const leftNav = document.getElementById("left-nav");
const topNav = document.getElementById("top-nav");
const mainBody = document.getElementById("main-body");
const logoTop = document.getElementById('logo-top');
const logoLeft = document.getElementById('logo-left');


//PROJECT-SEARCH CONST & VAR_____
const [questionsubject, skillsubject, projectsubject] = [
  document.getElementById("subject1"),
  document.getElementById("subject2"),
  document.getElementById("subject3")]
const searchbar = document.getElementById("form-container");
const buttonBackground = rootStyles.getPropertyValue('--searchbutton-background');
const searchButton = document.getElementById('search-button')
const dropdown = document.getElementById("dropdown");

var inputElement = document.getElementById("InputField");
var inputText = inputElement.textContent;


//WALKTHROUGH CONST & VAR_____
const walkthrough_topic = document.getElementById("project-topic");
const walkthrough_level = document.getElementById("project-level");
const walkthrough_title = document.getElementById("project-type");
const expandingSteps = document.getElementById("expanding-steps");







//------------------------------ FUNCTIONS ------------------------------


//Render [WEB-PAGE] After [LOADING-PAGE] 
window.addEventListener('load', function () {
  setTimeout(function () { //SET LOADING-TIMER
      const loadingContainer = document.querySelector('.loading-container');
      const content = document.querySelector('.website-container');

      loadingContainer.style.display = 'none';
      content.style.display = 'block';
  }, 0); // 1000 milliseconds = 1.0 seconds
});




//left-NAV Display Toggle ON/OFF
if (window.innerWidth <= 1000){ //left-NAV default display depends on window width
  leftNav.style.display = 'none';
  topNav.style.width = '100%';
  topNav.style.left = '0';
  mainBody.style.left = '0';
  mainBody.style.width = '100%';
  logoTop.style.display = 'block';
};

logoTop.addEventListener("click", function() { //Turn Off left-NAV
  leftNav.style.display = 'block';
  topNav.style.width = 'calc(100% - var(--left-nav-width))';
  topNav.style.left = 'var(--left-nav-width)';
  mainBody.style.left = 'var(--left-nav-width)';
  mainBody.style.width = 'calc(100% - var(--left-nav-width))';
  logoTop.style.display = 'none';
});

logoLeft.addEventListener("click", function() { //Turn On left-Nav
  leftNav.style.display = 'none';
  topNav.style.width = '100%';
  topNav.style.left = '0';
  mainBody.style.left = '0';
  mainBody.style.width = '100%';
  logoTop.style.display = 'block';
});




//----- PROJECT-SEARCH____________________

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
searchbar.addEventListener("submit", function(event) {
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
    searchbar.style.border = "1px solid white";
  }
});


//Dropdown Functionality
function showDropdown(items) {
    dropdown.style.display = "block";
    dropdown.innerHTML = ""; // Clear previous options
    

    items.forEach(itemText => {
        const resultContainer = document.createElement("ul");
        const resultItem = document.createElement("li");
        resultContainer.classList.add("result-container")
        resultItem.classList.add("result-item");
        resultContainer.appendChild(resultItem)
        resultItem.textContent = itemText;
        resultContainer.addEventListener("click", () => onItemClicked(itemText));
        dropdown.appendChild(resultContainer); // Corrected the variable name here
    });
}

var skill_level_choice = '';
var project_idea_choice = '';
var project_idea_instruction = [];
//Items Clicked From Dropdown [SKILL]/[PROJECT]
function onItemClicked(selectedItem) {
  if (skillLevelNames.includes(selectedItem)) { //ITEM CHOSEN IS A [SKILL-LEVEL]
    searchButton.style.background = 'grey';
    searchButton.disabled = true;
    skill_level_choice = selectedItem;
    fetch('/project_searching', { //Send User's Input Text and Skill Level to the Server
      method: 'POST',
      body: JSON.stringify({input_text: inputElement.value , skill_level: selectedItem }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => { //BACK_END LIST OF PROJECT DROPDOWN
      searchButton.style.background = buttonBackground;
      searchButton.disabled = false;  
      showDropdown(data.project_list) 
    })
    .catch(error => { //FRONT_END LIST OF PROJECT DROPDOWN
      searchButton.style.background = buttonBackground;
      searchButton.disabled = false;
      console.error("YOU ARE IN FRONT_END DISPLAY ONLY");
      showDropdown(["TEMP_PROJECT 1", "TEMP_PROJECT 2","TEMP_PROJECT 3", "TEMP_PROJECT 4","TEMP_PROJECT 5", "TEMP_PROJECT 6","TEMP_PROJECT 7", "TEMP_PROJECT 8","TEMP_PROJECT 9", "TEMP_PROJECT 10",])
    });

    dropdown.style.display = "none";
    skillsubject.style.display = "none";
    projectsubject.style.display = "block";
    
  }
  else { //ITEM CHOSEN IS A [PROJECT]
    project_idea_choice = selectedItem;
    
    walkthrough_title.textContent = selectedItem; //CHANGE WALKTHROUGH TITLE TO PROJECT SELECTED
    walkthrough_level.textContent = skill_level_choice;
    walkthrough_topic.textContent = inputElement.value;
    walkthrough_title.style.display = "block";
    walkthrough_level.style.display = "block";
    walkthrough_topic.style.display = "block";

    //CLOSE DROPDOWN DISPLAY 
    searchbar.style.border = "none";

    dropdown.style.display = "none";
    projectsubject.style.display = "none";
    questionsubject.style.display = "block";

    fetch('/walkthrough', { //Send User's Project Idea Choice to Server
      method: 'POST',
      body: JSON.stringify({input_text: inputElement.value , skill_level: skill_level_choice, project_idea: selectedItem }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => { //BACK_END LIST OF PROJECT DROPDOWN
      project_idea_instruction = data.project_idea_steps;
      expandingSteps.showExandableSteps(data.project_idea_steps,'rgb(0, 0, 0)');
    })
    .catch(error => { //FRONT_END LIST OF PROJECT DROPDOWN
      project_idea_instruction = ["TEMP_STEP 1","TEMP_STEP 2","TEMP_STEP 3","TEMP_STEP 4","TEMP_STEP 5"];
      console.error("YOU ARE IN FRONT_END DISPLAY ONLY");
      expandingSteps.showExandableSteps(["TEMP_STEP 1","TEMP_STEP 2","TEMP_STEP 3","TEMP_STEP 4","TEMP_STEP 5"],'rgb(0, 0, 0)');
    });
  }
}






//----- WALKTHROUGH____________________
var project_idea_current = '';
var project_step_help = '';
HTMLDivElement.prototype.showExandableSteps = function (items, backgroundColor) {
  this.style.display = "block";
  this.style.backgroundColor = backgroundColor;

  const steps = document.createElement('div');
  steps.classList.add("steps");
  this.innerHTML = ""; // Clear previous options
  
  this.appendChild(steps)


  items.forEach(itemText => {
      const stepContainer = document.createElement("div");
      const stepItem = document.createElement("div");
      const stepExpandable = document.createElement("div");

      stepContainer.classList.add("step-container");
      stepItem.classList.add("step-item");
      stepExpandable.classList.add("step-expandable");

      stepContainer.appendChild(stepItem);
      stepContainer.appendChild(stepExpandable);
      stepItem.textContent = itemText;
      steps.appendChild(stepContainer);
      
      if (this.id.includes('expanding-steps')) { //identifying main steps of projects
        stepContainer.classList.add("main-steps");
      };

      stepItem.addEventListener("click", function() {
        this.parentNode.classList.toggle('step-expanded'); //EXPAND & COLLAPSE STEPS
        project_idea_current = findParentWithClass(stepItem,"main-steps").querySelector('.step-item').textContent
        
        if (this.parentElement.classList.contains('step-expanded')) {
          const newBackgroundColor = calcNewBackgroundColor(backgroundColor);
          
          fetch('/expanding-instruction', { //Send User's choice in the steps to Server
            method: 'POST',
            body: JSON.stringify({
              input_text: inputElement.value,
              skill_level: skill_level_choice,
              project_idea: project_idea_choice,
              project_idea_steps: project_idea_instruction,
              project_idea_currentstep: project_idea_current,
              project_step_help: itemText}),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => response.json())
          .then(data => { //BACK_END LIST OF PROJECT DROPDOWN
            stepExpandable.showExandableSteps(data.project_step_expand,newBackgroundColor);
          })
          .catch(error => { //FRONT_END LIST OF PROJECT DROPDOWN
            console.error("YOU ARE IN FRONT_END DISPLAY ONLY");
            stepExpandable.showExandableSteps(["TEMP_EXPAND 1","TEMP_EXPAND 2","TEMP_EXPAND 3","TEMP_EXPAND 4","TEMP_EXPAND 5"],newBackgroundColor);
          });


        } else {
          stepExpandable.innerHTML = "";
        }
      }); 
  });
}

function calcNewBackgroundColor(currentColor) {

  const rgbValues = currentColor.match(/\d+/g);
  if (rgbValues.length === 3) {
      // Increase the red, green, and blue values by 
      const change = 20;
      const newRed = parseInt(rgbValues[0]) + change;
      const newGreen = parseInt(rgbValues[1]) + change;
      const newBlue = parseInt(rgbValues[2]) + change;
      return `rgb(${newRed}, ${newGreen}, ${newBlue})`;
  } else {
      return currentColor; 
  }
}

function findParentWithClass(element, targetClass) {
  if (!element) {
      return null; // If the element doesn't exist, return null
  }

  if (element.classList.contains(targetClass)) {
      return element; // If the current element has the target class, return it
  }

  // Recursively call the function on the parent element
  return findParentWithClass(element.parentNode, targetClass);
} 