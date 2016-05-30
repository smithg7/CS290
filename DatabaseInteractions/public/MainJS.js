// CS290 Web Development
// Author: Gary Smith
// 

document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons() {
    //Add event listener for the first submit button.
    document.getElementById('exerciseSubmit').addEventListener('click', function (event) {
        var req = new XMLHttpRequest();
        var url = 'http://ec2-52-36-65-162.us-west-2.compute.amazonaws.com:4000';
        var payload = { Ename: null, reps: null, weight: null, date: null, lbs: null};

        payload.Ename = document.getElementById('name').value;
        payload.reps = document.getElementById('reps').value;
        payload.weight = document.getElementById('weight').value;
        payload.date = document.getElementById('date').value;
        payload.lbs = document.getElementById('lbs').checked;
        console.log("Inserting: " + JSON.stringify(payload));
        //Request data via a post.
        req.open('POST', url, true);
        req.setRequestHeader('Content-Type', 'application/json');

        //Add Event lister for the response.
        req.addEventListener('load', function () {
             if (req.status >= 200 && req.status < 400) {

                console.log("Result of Submit: " + req.responseText);
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

    var Editreq = new XMLHttpRequest();
    var url = 'http://ec2-52-36-65-162.us-west-2.compute.amazonaws.com:4000';
    var payload = { EditBtn: null, id: null, Ename: null, reps: null, weight: null, date: null, lbs: null};

    payload.EditBtn = "1";
    payload.id = Eid;
    payload.Ename = thisForm.elements["Hname"+Eid].value;
    payload.reps = thisForm.elements["Hreps"+Eid].value;
    payload.weight = thisForm.elements["Hweight"+Eid].value;
    payload.date = thisForm.elements["Hdate"+Eid].value;
    payload.lbs = thisForm.elements["Hlbs"+Eid].checked;
    
    console.log("Updating: " + JSON.stringify(payload));
    //Request data via a post.
    Editreq.open('POST', url, true);
    Editreq.setRequestHeader('Content-Type', 'application/json');

    //Add Event lister for the response.
    Editreq.addEventListener('load', function () {
         if (Editreq.status >= 200 && Editreq.status < 400) {
            console.log("Result of Edit: " + Editreq.responseText);
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
    data = data.dataList;
    //Add all the new rows back in
    for (var row in data) {
        if (data[row].lbs == 0 || data[row] == false)
        {
            data[row].lbs = false;
        }
        else
        {
            data[row].lbs = true;
        }
        var newRow = pageTable.insertRow();
        var rowHTML = "<td><input type='text' class='hiding' id='Vname" + data[row].id + "' value='";
        rowHTML += data[row].name + "' onchange='copyToHidden(" + data[row].id + ")' />";
        rowHTML += "<div class='showing' id='nameData" + data[row].id + "'>" + data[row].name + "</div></td>";

        rowHTML += "<td><input type='text' class='hiding' id='Vreps" + data[row].id + "' value='";
        rowHTML += data[row].reps + "' onchange='copyToHidden(" + data[row].id + ")' />";
        rowHTML += "<div class='showing' id='repsData" + data[row].id + "'>" + data[row].reps + "</div></td>";

        rowHTML += "<td><input type='text' class='hiding' id='Vweight" + data[row].id + "' value='";
        rowHTML += data[row].weight + "' onchange='copyToHidden(" + data[row].id + ")' />";
        rowHTML += "<div class='showing' id='weightData" + data[row].id + "'>" + data[row].weight + "</div></td>";

        rowHTML += "<td><input type='text' class='hiding' id='Vdate" + data[row].id + "' value='";
        rowHTML += data[row].date + "' onchange='copyToHidden(" + data[row].id + ")' />";
        rowHTML += "<div class='showing' id='dateData" + data[row].id + "'>" + data[row].date + "</div></td>";

        console.log("This is data[row].lbs:" + data[row].lbs);
        rowHTML += "<td><input type='checkbox' class='CBhiding' id='Vlbs" + data[row].id + "' checked=";
        rowHTML += data[row].lbs + " onchange='copyToHidden(" + data[row].id + ")' disabled/>";
        rowHTML += "</td>";

        rowHTML += "<td><form id='EditForm" + data[row].id + "'>";
        rowHTML += "<input type='hidden' id='Hname" + data[row].id + "' value='"+data[row].Ename+"' />";
        rowHTML += "<input type='hidden' id='Hreps" + data[row].id + "' value='"+data[row].reps+"' />";
        rowHTML += "<input type='hidden' id='Hweight" + data[row].id + "' value='"+data[row].weight+"' />";
        rowHTML += "<input type='hidden' id='Hdate" + data[row].id + "' value='"+data[row].date+"' />";
        rowHTML += "<input type='hidden' id='Hlbs" + data[row].id + "' checked='"+data[row].lbs+"' />";
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
    document.getElementById("Vlbs"+rowID).className = "CBshowing";
    document.getElementById("EditSubmit"+rowID).className = "showingMyButton";
    document.getElementById("showHidden"+rowID).className = "hiding";
    document.getElementById("nameData"+rowID).className = "hiding";
    document.getElementById("repsData"+rowID).className = "hiding";
    document.getElementById("weightData"+rowID).className = "hiding";
    document.getElementById("dateData"+rowID).className = "hiding";
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