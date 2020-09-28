[![CodeFactor](https://www.codefactor.io/repository/github/danitetus/pushover-js/badge)](https://www.codefactor.io/repository/github/danitetus/pushover-js)
#pushover-js
========

A Node JS module to use with Pushover notifications app

========

##Installation
    npm install pushover-js

========

##Usage
        
        // Load the module
        var push = require( 'pushover-js');
        
        // Set user and token for API calls
        var obj = {
            "user" : "<USER STRING>",
            "token": "<APP TOKEN KEY>"
        };
        
        // Initiate object width user/token object
        // Callback function gets two parameters:
        //
        //      - err  -> If authentication went wrong, this will be true otherwise will be false
        //      - data -> This is a JSON object with the server response

        var notifications = new push(obj, function (err, data){
            if (err){
                // Authentication false
                console.log(data);
            } else {
                // Authentication succeded

                // Setting the message to send
                var msj = {
                    "title" : "Title of the notification",
                    "message" : "Message content",
                    "sound" : "magic",                           // optional
                    "priority" : 0,                              // optional
                    "expires" : 30                              // necesary if set priority == 2
                };
                
                // Calling sending method.
                // This gets two parameters:
                //
                //      - err -> If something wrong, true, otherwise false
                //      - data -> JSON object with server response

                notifications.send(msj, function (err, data){
                    if (err){
                        //Something went wrong
                        console.log(data);
                    } else {
                            //Message queued
                            console.log("Success");
                            console.log(data);
                    }
                });
            }
        });
