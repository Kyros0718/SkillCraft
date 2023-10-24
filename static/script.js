const form = document.getElementById("myForm");
const dropdown = document.getElementById("dropdown");
const ideadropdown = document.getElementById("idea-dropdown");
var inputElement = document.getElementById("InputField");
var inputValue = inputElement.value;
form.addEventListener("submit", function(event) {
  event.preventDefault();
  if (inputElement.value.trim() !== '') {
    showDropdown(["Beginner", "Intermediate", "Expert"]);
  }
  else{
    dropdown.style.display = "none"
  }
});

function showDropdown(items) {
    dropdown.style.display = "block";
    dropdown.innerHTML = ""; // Clear previous options
    ideadropdown.innerHTML = ""; // Clear previous options
    

    items.forEach(itemText => {
        const resultItem = document.createElement("div");
        resultItem.classList.add("result-item");
        resultItem.textContent = itemText;
        resultItem.addEventListener("click", () => onItemClicked(itemText));
        dropdown.appendChild(resultItem); // Corrected the variable name here
    });
}

function onItemClicked(selectedItem) {
  if (selectedItem === "Beginner" || selectedItem === "Intermediate" || selectedItem === "Expert") {
    dropdown.style.display = "none";
    showDropdown(["item1","item2","item3","item4","item5","item6","item7","item8","item9","item10",])
  }
  else {
    dropdown.style.display = "none";
  }
}