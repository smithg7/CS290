//****************************************
// Author: Gary Smith
// CS290 - Web Development
// HW Assignment - DOM and Events
//****************************************

//Create the table
var myTable = document.createElement("table");
myTable.style.border = "solid";
myTable.style.borderWidth="2px";
document.body.appendChild(myTable);
var headerRow = document.createElement("tr");
myTable.appendChild(headerRow);

for (var i = 0; i < 4; i++)
{
    var h1 = document.createElement("th");
    h1.textContent = "Header " + (i+1);
    headerRow.appendChild(h1);
}

for (var j = 1; j < 4; j++)
{
    var row = document.createElement("tr");
    for (var k = 1; k < 5; k++)
    {
        var cell = document.createElement("td");
        cell.textContent = j + ", " + k;
        cell.style.border = "solid";
        cell.style.borderWidth = "1px";
        row.appendChild(cell);
    }
    myTable.appendChild(row);
}



//create the buttons
//Up Button
var upButton = document.createElement("button");
upButton.textContent = "Up";
upButton.id = "upButton";
document.body.appendChild(upButton);
//Down Button
var downButton = document.createElement("button");
downButton.textContent = "Down";
downButton.id = "downButton";
document.body.appendChild(downButton);
//Left Button
var leftButton = document.createElement("button");
leftButton.textContent = "Left";
leftButton.id = "leftButton";
document.body.appendChild(leftButton);
//Right Button
var rightButton = document.createElement("button");
rightButton.textContent = "Right";
rightButton.id = "rightButton";
document.body.appendChild(rightButton);
document.body.appendChild(document.createElement("br"));
//Mark Cell Button
var markButton = document.createElement("button");
markButton.textContent = "Mark Cell";
markButton.id = "markCellButton";
document.body.appendChild(markButton);

//Set the top left cell as selected
var firstcell = myTable.rows[1].cells[0];
firstcell.style.borderWidth = "3px";
firstcell.className = "selected";

//create functions for the buttons
//Right Button
function moveRight() {
     var current = document.getElementsByClassName("selected")[0];
     var arr = current.textContent.split(",");
     var x = Number(arr[0]);
     var y = Number(arr[1]);

     var nextOne = myTable.rows[x].cells[y];
     nextOne.style.borderWidth = "3px";
     nextOne.className = "selected";
     
     current.style.borderWidth = "1px";
     current.className = "";
}

//Left button
function moveLeft() {
     var current = document.getElementsByClassName("selected")[0];
     var arr = current.textContent.split(",");
     var x = Number(arr[0]);
     var y = Number(arr[1]);
     var nextOne = myTable.rows[x].cells[y-2];
     nextOne.style.borderWidth = "3px";
     nextOne.className = "selected";

     current.style.borderWidth = "1px";
     current.className = "";
}

//Down Button
function moveDown() {
    var current = document.getElementsByClassName("selected")[0];
    var arr = current.textContent.split(",");
    var x = Number(arr[0]);
    var y = Number(arr[1]);
    var nextOne = myTable.rows[x + 1].cells[y - 1];
    nextOne.style.borderWidth = "3px";
    nextOne.className = "selected";

    current.style.borderWidth = "1px";
    current.className = "";
}

//Up Button
function moveUp() {
    var current = document.getElementsByClassName("selected")[0];
    var arr = current.textContent.split(",");
    var x = Number(arr[0]);
    var y = Number(arr[1]);
    if (x < 2) return;
    var nextOne = myTable.rows[x - 1].cells[y - 1];
    nextOne.style.borderWidth = "3px";
    nextOne.className = "selected";

    current.style.borderWidth = "1px";
    current.className = "";
}

//Mark Cell Button
 function markCell() {
     var current = document.getElementsByClassName("selected");
     if (current[0].style.backgroundColor == "yellow")
     {
         current[0].style.backgroundColor = "white";
     }
     else
     {
         current[0].style.backgroundColor = "yellow";
     }
     
 }

//Add event listeners for each button
 document.getElementById("rightButton").addEventListener("click", moveRight);
 document.getElementById("leftButton").addEventListener("click", moveLeft);
 document.getElementById("downButton").addEventListener("click", moveDown);
 document.getElementById("upButton").addEventListener("click", moveUp);
 document.getElementById("markCellButton").addEventListener("click", markCell);