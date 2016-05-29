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

                document.write(req.responseText);
                document.close();
                
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
    var req = new XMLHttpRequest();
    var url = 'http://ec2-52-36-65-162.us-west-2.compute.amazonaws.com:4000';
    var payload = { EditBtn: null, id: null};

    payload.EditBtn = "1";
    payload.id = Eid;

    
    //Request data via a post.
    req.open('POST', url, true);
    req.setRequestHeader('Content-Type', 'application/json');

    //Add Event lister for the response.
    req.addEventListener('load', function () {
         if (req.status >= 200 && req.status < 400) {
            //console.log(req.responseText);
            document.write(req.responseText);
            document.close();
            
         } else {
             console.log("Error in network request: ");
         }
    });

    //Send the request with the data entered in the form.
    req.send(JSON.stringify(payload));
    event.preventDefault();
}

function deleteBtn(Eid)
{

    console.log("ID to edit: " + Eid);
    event.preventDefault();
}

function EditSubmit()
{
    console.log("edit submitted");
    event.preventDefault();
}