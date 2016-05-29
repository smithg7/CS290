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
                var DBTable = JSON.parse(req.responseText);
                for (var row in DBTable) {
                  console.log(row.Ename);
                }
                
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
    var thisForm = document.getElementById("EditForm"+Eid);
    console.log(thisForm.elements["Eid"].value);
    // var Editreq = new XMLHttpRequest();
    // var url = 'http://ec2-52-36-65-162.us-west-2.compute.amazonaws.com:4000';
    // var payload = { EditBtn: null, id: null};

    // payload.EditBtn = "1";
    // payload.id = Eid;

    
    // //Request data via a post.
    // Editreq.open('POST', url, true);
    // Editreq.setRequestHeader('Content-Type', 'application/json');

    // //Add Event lister for the response.
    // Editreq.addEventListener('load', function () {
    //      if (Editreq.status >= 200 && Editreq.status < 400) {
    //         console.log(Editreq.responseText);
    //         //document.write(Editreq.responseText);
    //         //document.close();
            
    //      } else {
    //          console.log("Error in network request: ");
    //      }
    // });

    //Send the request with the data entered in the form.
    //Editreq.send(JSON.stringify(payload));
    event.preventDefault();
}

function deleteBtn(Eid)
{

    console.log("ID to edit: " + Eid);
    event.preventDefault();
}

function editSubmit()
{
    console.log("edit submitted");
    event.preventDefault();
}