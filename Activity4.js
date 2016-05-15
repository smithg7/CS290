// CS290 Web Development
// Author: Gary Smith
// Activity - Ajax Interactions

var appid = "fa7d80c48643dfadde2cced1b1be6ca1";
document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons() {
    //Add event listener for 1st button
    document.getElementById('weatherSubmit').addEventListener('click', function (event) {
        var req = new XMLHttpRequest();

        var url = 'http://api.openweathermap.org/data/2.5/weather?appid=' + appid + "&units=imperial";
        var city = document.getElementById('city').value;
        var zip = document.getElementById('zip').value;
        city = "&q=" + city;
        zip = "&zip=" + zip;
        //if the city is blank, use the zip.
        if (city === "&q=") {
            url += zip;
        }
        else {
            url += city;
        }
        req.open('GET', url, true);

        //Add Event lister for the response.
        req.addEventListener('load', function () {
            if (req.status >= 200 && req.status < 400) {
                var response = JSON.parse(req.responseText);
                console.log(JSON.parse(req.responseText));

                //Populate the result into the field.
                var resultString = response.name + '\n';
                resultString += "Temp: " + response.main.temp + '\n';
                resultString += "Wind degrees: " + response.wind.deg + '\n';
                resultString += "Wind speed (mps): " + response.wind.speed + '\n';
                document.getElementById('weatherresults').textContent = resultString;

            } else {
                console.log("Error in network request: " + request.statusText);
            }
        });

        //Send the request.  No parameters needed since they are passed in the URL.
        req.send(null);
        event.preventDefault();
    });

    //Add event listener for the other button.
    document.getElementById('echoSubmit').addEventListener('click', function (event) {
        var req = new XMLHttpRequest();
        var url = 'http://httpbin.org/post';
        var payload = { first: null, last: null, age: null };

        payload.first = document.getElementById('first').value;
        payload.last = document.getElementById('last').value;
        payload.age = document.getElementById('age').value;

        //Request data via a post.
        req.open('POST', url, true);
        req.setRequestHeader('Content-Type', 'application/json');

        //Add Event lister for the response.
        req.addEventListener('load', function () {
            if (req.status >= 200 && req.status < 400) {
                var response = JSON.parse(req.responseText);
                console.log(JSON.parse(req.responseText));

                //Populate the result into the string.
                var returnedData = JSON.parse(response.data);
                var resultString = "Your Name: " + returnedData.last + ', ' + returnedData.first + '\n';
                resultString += "You are " + returnedData.age + ' years old. \n';
                document.getElementById('echoresults').textContent = resultString;

            } else {
                console.log("Error in network request: " + request.statusText);
            }
        });

        //Send the request with the data entered in the form.
        req.send(JSON.stringify(payload));
        event.preventDefault();
    });

};