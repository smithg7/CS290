// CS290 Web Development
// Author: Gary Smith
// Activity - How To Page
// References: https://blueimp.github.io/JavaScript-MD5  (For the MD5 hash function)


var publickey = "77fe67b74820c2fd3353f08676e5542c";
var privatekey = "c5998f047fe4cef8051aef875bf5fe6cf3f37c0f";
document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons() {
    //Add event listener for 1st button
    document.getElementById('characterSubmit').addEventListener('click', function (event) {
        var req = new XMLHttpRequest();
        var ts = Date.now();
        var url = 'http://gateway.marvel.com:80/v1/public/characters/';
        var name = document.getElementById('name').value;
        url += name;
        url += '?apikey=' + publickey;
        url += '&ts=' + ts;
        url += '&hash=' + md5(ts+privatekey+publickey);
        req.open('GET', url, true);

        //Add Event lister for the response.
        req.addEventListener('load', function () {
            if (req.status >= 200 && req.status < 400) {
                var response = JSON.parse(req.responseText);
                console.log(JSON.parse(req.responseText));

                //Populate the result into the field.
                var resultString = response.data.results[0].name;
                resultString += '\n';
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

    var codeExample1 = '&lt;!doctype html&gt;<BR>';
    codeExample1 += '&lt;html&gt;<BR>';
    codeExample1 += '&lt;head&gt;<BR>';
    codeExample1 += '   &lt;title&gt;Marvel API Sample page&lt;/title&gt;<BR>';
    codeExample1 += '&lt;/head&gt;<BR>';
    codeExample1 += '&lt;body&gt;<BR>';
    codeExample1 += '&lt;h1&gt;Marvel API how to Reference&lt;/h1&gt;<BR>';
    codeExample1 += '&lt;fieldset&gt;<BR>&lt;legend&gt;Character Data&lt;/legend&gt;<BR>';
    codeExample1 += '&lt;label for="name"&gt;Character ID (Example: 1009351, 1009610)&lt;/label&gt;<BR>';
    codeExample1 += '&lt;input type="text" name="name" id="name"&gt;&lt;br /&gt;<BR>';
    codeExample1 += '        &lt;input type="submit" id="characterSubmit"&gt;<BR>';
    codeExample1 += '   &lt;/fieldset&gt;<BR>';
    codeExample1 += '   &lt;fieldset&gt;<BR>';
    codeExample1 += '       &lt;legend&gt;Character Data Results&lt;/legend&gt;<BR>';
    codeExample1 += '       &lt;textarea id="characterresults" cols="45" rows="4"&gt;&lt;/textarea&gt;<BR>';
    codeExample1 += '       &lt;p&gt;Data provided by Marvel. © 2014 Marvel&lt;/p&gt;<BR>';
    codeExample1 += '   &lt;/fieldset&gt;<BR>';
    codeExample1 += '&lt;/body&gt;<BR>';
    codeExample1 += '&lt;/html&gt;<BR>';


    document.getElementById('codeExample1').innerHTML = codeExample1;


    var codeExample2 = '&lt;!doctype html&gt;<BR>';
    codeExample2 += '&lt;html&gt;<BR>';
    codeExample2 += '&lt;head&gt;<BR>';
    codeExample2 += '   &lt;title&gt;Marvel API How To Page&lt;/title&gt;<BR>';
    codeExample2 += '&lt;/head&gt;<BR>';
    codeExample2 += '&lt;body&gt;<BR>';
    codeExample2 += '&lt;h1&gt;Marvel API how to Reference&lt;/h1&gt;<BR>';
    codeExample2 += '&lt;fieldset&gt;<BR>&lt;legend&gt;Character Data&lt;/legend&gt;<BR>';
    codeExample2 += '&lt;label for="name"&gt;Character ID (Example: 1009351, 1009610)&lt;/label&gt;<BR>';
    codeExample2 += '&lt;input type="text" name="name" id="name"&gt;&lt;br /&gt;<BR>';
    codeExample2 += '        &lt;input type="submit" id="characterSubmit"&gt;<BR>';
    codeExample2 += '   &lt;/fieldset&gt;<BR>';
    codeExample2 += '   &lt;fieldset&gt;<BR>';
    codeExample2 += '       &lt;legend&gt;Character Data Results&lt;/legend&gt;<BR>';
    codeExample2 += '       &lt;textarea id="characterresults" cols="45" rows="4"&gt;&lt;/textarea&gt;<BR>';
    codeExample2 += '       &lt;p&gt;Data provided by Marvel. © 2014 Marvel&lt;/p&gt;<BR>';
    codeExample2 += '   &lt;/fieldset&gt;<BR>';
    codeExample2 += '&lt;script src="https://blueimp.github.io/JavaScript-MD5/js/md5.js"&gt;&lt;/script&gt;<BR>';
    codeExample2 += '&lt;script src="HowTo.js"&gt;&lt;/script&gt;<BR> <!-- Call your javascript file "HowTo.js" -->';
    codeExample2 += '&lt;/body&gt;<BR>';
    codeExample2 += '&lt;/html&gt;<BR>';


    document.getElementById('codeExample2').innerHTML = codeExample2;

};