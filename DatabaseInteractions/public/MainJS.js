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
    console.log("The value you typed is: " + thisForm.elements["newOne"].value);

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
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        var cell4 = newRow.insertCell(3);
        var cell5 = newRow.insertCell(4);
        var cell6 = newRow.insertCell(5);

        cell1.innerHTML = data[row].Ename
        cell2.innerHTML = data[row].reps
        cell3.innerHTML = data[row].weight
        cell4.innerHTML = data[row].date
        cell5.innerHTML = data[row].lbs
        var buttonHTML = "<form id='EditForm"+data[row].id+"'>";
        buttonHTML += "<input type='hidden' id='Eid' value='"+data[row].weight+data[row].id+"' />";
        buttonHTML += "<input type='text' id='newOne' value='"+data[row].weight+data[row].id+"' />";
        buttonHTML += "<input type='submit' onclick='EditBtn(" + data[row].id + ")' value='Edit' />";
        buttonHTML += "</form>";
        buttonHTML += "<form id='DeleteForm"+data[row].id+"'>";
        buttonHTML += "<input type='hidden' id='Eid' value='"+data[row].weight+data[row].id+"' />";

        buttonHTML += "<input type='submit' onclick='deleteBtn(" + data[row].id + ")' value='Delete' />";
        buttonHTML += "</form>";
        cell6.innerHTML = buttonHTML;
    }
}