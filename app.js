const express = require('express');
const request = require('request');
const https = require('https');
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){

    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){

    console.log(req.body);

    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const Email = req.body.Email;

    const data = {
        members: [
            {
            email_address: Email,
            status: "subscribed",
            merge_fields:{
                FNAME: FirstName,
                LNAME: LastName
            }
        }
        ]
    };
    
    const jsonData = JSON.stringify(data);

    const url = "https://us7.api.mailchimp.com/3.0/lists/f1c5dc5f12" 

    const options= {
        method: "POST",
        auth: "new1:3bbd91c49c3ee53641e6fa912cadb328-us7"
    }

    const request =  https.request(url,options,function(response){
        
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");

        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        
        
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

});



app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running at port 3000");
    
})


// 3bbd91c49c3ee53641e6fa912cadb328-us7

// f1c5dc5f12