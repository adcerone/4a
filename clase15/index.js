var button = document.querySelector("#ingreso button");
var input = document.getElementById("input");
var listContainer = document.getElementById("lista");
var counter = 0;

button.addEventListener("click", function() {
  var inputValue = input.value;
  counter++;

  var itemContainer = document.createElement("div");
  itemContainer.className = "row";
  itemContainer.id = "item" + counter;

  var rowContainer = document.createElement("div");
  rowContainer.className = "row";

  var nameContainer = document.createElement("div");
  nameContainer.className = "col-6";

  var nameParagraph = document.createElement("p");
  nameParagraph.textContent = inputValue;
  nameContainer.appendChild(nameParagraph);

  var buttonContainer = document.createElement("div");
  buttonContainer.className = "col-6";

  var deleteButton = document.createElement("button");
  deleteButton.textContent = "Eliminar";
  buttonContainer.appendChild(deleteButton);

  rowContainer.appendChild(nameContainer);
  rowContainer.appendChild(buttonContainer);

  itemContainer.appendChild(rowContainer);
  listContainer.appendChild(itemContainer);

  deleteButton.addEventListener("click", function() {
  
    var itemDiv = deleteButton.closest(".row");
    if (itemDiv) {
      itemDiv.parentNode.removeChild(itemDiv);
    }
  });

  input.value = "";
});