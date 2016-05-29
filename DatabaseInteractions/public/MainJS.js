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
            //     //var response = JSON.parse(req.responseText);
            //     //console.log(JSON.parse(req.responseText));

            //     //Populate the result into the string.
            //     var returnedData = JSON.parse(response.data);
            //     console.log("Something worked.");
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

function EditBtn(e)
{
    console.log(e.sender.className);
    event.preventDefault();
}

function deleteBtn()
{
    console.log("weird");

    event.preventDefault();
}