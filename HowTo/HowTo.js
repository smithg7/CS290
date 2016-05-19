// CS290 Web Development
// Author: Gary Smith
// Activity - How To Page
// References: https://blueimp.github.io/JavaScript-MD5


var appid = "77fe67b74820c2fd3353f08676e5542c";
var privatekey = "c5998f047fe4cef8051aef875bf5fe6cf3f37c0f"
document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons() {
    //Add event listener for 1st button
    document.getElementById('characterSubmit').addEventListener('click', function (event) {
        var req = new XMLHttpRequest();
        var ts = Date.now();
        var url = 'http://gateway.marvel.com:80/v1/public/characters/';
        var name = document.getElementById('name').value;
        url += '?name='+name;
        url += '&apikey=' + appid;
        url += '&ts=' + ts;
        url += '&hash=' + md5(ts+privatekey+appid);
        req.open('GET', url, true);

        //Add Event lister for the response.
        req.addEventListener('load', function () {
            if (req.status >= 200 && req.status < 400) {
                var response = JSON.parse(req.responseText);
                console.log(JSON.parse(req.responseText));

                //Populate the result into the field.
                var resultString = response.data.results[0].name;
                resultString += '\n'
                resultString += response.data.results[0].description;
                document.getElementById('characterresults').textContent = resultString;

            } else {
                console.log("Error in network request: " + request.statusText);
            }
        });

        //Send the request.  No parameters needed since they are passed in the URL.
        req.send(null);
        event.preventDefault();
    });


};