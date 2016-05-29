// CS290 Web Development
// Author: Gary Smith
// 

document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons() {
    //Add event listener for the first submit button.
    document.getElementById('exerciseSubmit').addEventListener('click', function (event) {
        var req = new XMLHttpRequest();
        var url = 'http://ec2-52-36-65-162.us-west-2.compute.amazonaws.com:4000';
        var payload = { name: null, reps: null, weight: null, date: null, lbs: null};

        payload.name = document.getElementById('name').value;
        payload.reps = document.getElementById('reps').value;
        payload.weight = document.getElementById('weight').value;
        payload.date = document.getElementById('date').value;
        payload.lbs = document.getElementById('lbs').checked;
        
        //Request data via a post.
        req.open('POST', url, true);
        req.setRequestHeader('Content-Type', 'application/json');

        //Add Event lister for the response.
        req.addEventListener('load', function () {
             if (req.status >= 200 && req.status < 400) {

                console.log(req.responseText);
                //The response text will contain a JSON object with table data
                //clear out the table and replace it with the database info
                PopulateTable(JSON.parse(req.responseText));
                
             } else {
                 console.log("Error in network request: ");
             }
        });

        //Send the request with the data entered in the form.
        req.send(JSON.stringify(payload));
        event.preventDefault();
    });
  
};

function EditBtn(Eid)
{ 
    var thisForm = document.getElementById('EditForm'+Eid);
    console.log("The value you typed is: " + thisForm.elements["Hname"+Eid].value);
    console.log("The value you typed is: " + thisForm.elements["Hreps"+Eid].value);
    console.log("The value you typed is: " + thisForm.elements["Hweight"+Eid].value);
    console.log("The value you typed is: " + thisForm.elements["Hdate"+Eid].value);
    console.log("The value you typed is: " + thisForm.elements["Hlbs"+Eid].checked);




    var Editreq = new XMLHttpRequest();
    var url = 'http://ec2-52-36-65-162.us-west-2.compute.amazonaws.com:4000';
    var payload = { EditBtn: null, id: null};

    payload.EditBtn = "1";
    payload.id = Eid;
    
    //Request data via a post.
    Editreq.open('POST', url, true);
    Editreq.setRequestHeader('Content-Type', 'application/json');

    //Add Event lister for the response.
    Editreq.addEventListener('load', function () {
         if (Editreq.status >= 200 && Editreq.status < 400) {
            console.log(Editreq.responseText);
            PopulateTable(JSON.parse(Editreq.responseText));
            
         } else {
             console.log("Error in network request: ");
         }
    });

    //Send the request with the data entered in the form.
    Editreq.send(JSON.stringify(payload));
    event.preventDefault();
}

function deleteBtn(Eid)
{
    var Deletereq = new XMLHttpRequest();
    var url = 'http://ec2-52-36-65-162.us-west-2.compute.amazonaws.com:4000';
    var payload = { DeleteBtn: null, id: null};

    payload.DeleteBtn = "1";
    payload.id = Eid;
    
    //Request data via a post.
    Deletereq.open('POST', url, true);
    Deletereq.setRequestHeader('Content-Type', 'application/json');

    //Add Event lister for the response.
    Deletereq.addEventListener('load', function () {
         if (Deletereq.status >= 200 && Deletereq.status < 400) {
            console.log(Deletereq.responseText);
            PopulateTable(JSON.parse(Deletereq.responseText));
            
         } else {
             console.log("Error in network request: ");
         }
    });

    //Send the request with the data entered in the form.
    Deletereq.send(JSON.stringify(payload));
    event.preventDefault();
}


function PopulateTable(data)
{
    var pageTable = document.getElementById('dataTable');

    //delete all existing rows
    for(var i = 0; i < pageTable.rows.length;)
    {   
       pageTable.deleteRow(i);
    }

    //Add all the new rows back in
    for (var row in data) {
        var newRow = pageTable.insertRow();
        var rowHTML = "<td><input type='text' class='hiding' id='Vname" + data[row].id + "' value='";
        rowHTML += data[row].Ename + "' onchange='copyToHidden(" + data[row].id + ")' />";
        rowHTML += "<div id='nameData" + data[row].id + "'>" + data[row].Ename + "</div></td>";

        rowHTML += "<td><input type='text' class='hiding' id='Vreps" + data[row].id + "' value='";
        rowHTML += data[row].reps + "' onchange='copyToHidden(" + data[row].id + ")' />";
        rowHTML += "<div id='repsData" + data[row].id + "'>" + data[row].reps + "</div></td>";

        rowHTML += "<td><input type='text' class='hiding' id='Vweight" + data[row].id + "' value='";
        rowHTML += data[row].weight + "' onchange='copyToHidden(" + data[row].id + ")' />";
        rowHTML += "<div id='weightData" + data[row].id + "'>" + data[row].weight + "</div></td>";

        rowHTML += "<td><input type='text' class='hiding' id='Vdate" + data[row].id + "' value='";
        rowHTML += data[row].date + "' onchange='copyToHidden(" + data[row].id + ")' />";
        rowHTML += "<div id='dateData" + data[row].id + "'>" + data[row].date + "</div></td>";

        rowHTML += "<td><input type='checkbox' class='hiding' id='Vlbs" + data[row].id + "' checked=";
        rowHTML += data[row].lbs + " onchange='copyToHidden(" + data[row].id + ")' />";
        rowHTML += "<div id='lbsData" + data[row].id + "'>" + data[row].lbs + "</div></td>";

        rowHTML += "<td><form id='EditForm" + data[row].id + "'>";
        rowHTML += "<input type='hidden' id='Hname" + data[row].id + "' value='"+data[row].Ename+"' />";
        rowHTML += "<input type='hidden' id='Hreps" + data[row].id + "' value='"+data[row].reps+"' />";
        rowHTML += "<input type='hidden' id='Hweight" + data[row].id + "' value='"+data[row].weight+"' />";
        rowHTML += "<input type='hidden' id='Hdate" + data[row].id + "' value='"+data[row].date+"' />";
        rowHTML += "<input type='hidden' id='Hlbs" + data[row].id + "' value='"+data[row].lbs+"' />";
        rowHTML += "<input type='button' id='showHidden" + data[row].id + "' value='Edit' onclick='showFields(" + data[row].id + ")' />";
        rowHTML += "<input type='submit' id='EditSubmit" + data[row].id + "' class='hiding' onclick='EditBtn(" + data[row].id + ")' value='Save' />";
        rowHTML += "</form></td>";

        rowHTML += "<td><form id='DeleteForm"+data[row].id+"'>";
        rowHTML += "<input type='hidden' id='Eid' value='"+data[row].weight+data[row].id+"' />";
        rowHTML += "<input type='submit' onclick='deleteBtn(" + data[row].id + ")' value='Delete' />";
        rowHTML += "</form></td>";
        newRow.innerHTML = rowHTML;
        
    }
}

function showFields(rowID)
{
    document.getElementById("Vname"+rowID).className = "showing";
    document.getElementById("Vreps"+rowID).className = "showing";
    document.getElementById("Vweight"+rowID).className = "showing";
    document.getElementById("Vdate"+rowID).className = "showing";
    document.getElementById("Vlbs"+rowID).className = "showing";
    document.getElementById("EditSubmit"+rowID).className = "showingMyButton";
    document.getElementById("showHidden"+rowID).className = "hiding";
    document.getElementById("nameData"+rowID).className = "hiding";
    document.getElementById("repsData"+rowID).className = "hiding";
    document.getElementById("weightData"+rowID).className = "hiding";
    document.getElementById("dateData"+rowID).className = "hiding";
    document.getElementById("lbsData"+rowID).className = "hiding";
}

function copyToHidden(rowNum)
{
    var hiddenField = document.getElementById('Hname'+rowNum);
    var visibleField = document.getElementById('Vname'+rowNum);
    hiddenField.value = visibleField.value;
    var hiddenField = document.getElementById('Hreps'+rowNum);
    var visibleField = document.getElementById('Vreps'+rowNum);
    hiddenField.value = visibleField.value;
    var hiddenField = document.getElementById('Hweight'+rowNum);
    var visibleField = document.getElementById('Vweight'+rowNum);
    hiddenField.value = visibleField.value;
    var hiddenField = document.getElementById('Hdate'+rowNum);
    var visibleField = document.getElementById('Vdate'+rowNum);
    hiddenField.value = visibleField.value;
    var hiddenField = document.getElementById('Hlbs'+rowNum);
    var visibleField = document.getElementById('Vlbs'+rowNum);
    hiddenField.checked = visibleField.checked;
}