//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req, res) {
  var lastName = req.body.lname;
  var firstName = req.body.fname;
  var email = req.body.email;
  var data = {
    members: [
      {
      email_address: email,
      status: "subscribed",
      merge_fields:{
        FNAME:firstName,
        LNAME:lastName
      }
    }
  ]
  };
app.post("/failure",function(req,res){
  res.redirect("/");
});

  var jsonData = JSON.stringify(data);
  var options = {
    url: "https://us3.api.mailchimp.com/3.0/lists/b5cf7ef268",
    // the default request method is GET and we need to change that
    method: "POST",
    headers: {
      "Authorization": "Noha fcea9a44cc121c31b7af21d2369a55da-us3"
    },
   body: jsonData
  };
  console.log(firstName + " " + lastName + " " + email);

  request(options, function(error, response, body) {
    if (response.statusCode=="200") {
      res.sendFile(__dirname + "/success.html");
    }

    else {

      res.sendFile(__dirname + "/failure.html");
      console.log(response.statusCode);
    }
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("started on 3000");
});

//fcea9a44cc121c31b7af21d2369a55da-us3
//unique list id : b5cf7ef268
