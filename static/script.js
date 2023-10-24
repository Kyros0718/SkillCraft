const form = document.getElementById("myForm");
const skilldropdown = document.getElementById("skill-dropdown");
var inputElement = document.getElementById("InputField");
var inputValue = inputElement.value;
form.addEventListener("submit", function(event) {
  event.preventDefault();
  if (inputElement.value.trim() !== '') {
    showDropdown(["Beginner", "Intermediate", "Expert"]);
  }
  else{
    skilldropdown.style.display = "none"
  }
});

function showDropdown(items) {
    skilldropdown.style.display = "block";
    skilldropdown.innerHTML = ""; // Clear previous options

    items.forEach(itemText => {
        const resultItem = document.createElement("div");
        resultItem.classList.add("result-item");
        resultItem.textContent = itemText;
        resultItem.addEventListener("click", () => onItemClicked(itemText));
        skilldropdown.appendChild(resultItem); // Corrected the variable name here
    });
}

function onItemClicked(selectedItem) {
  if (selectedItem !== "Beginner" && selectedItem !== "Intermediate" && selectedItem !== "Expert") {
    alert("loading...");
  }
}
