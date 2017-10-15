// import external modules
var express = require("express");
var bodyParser = require("body-parser");

// local file import
var {mongoose} = require("./db/mongoose");
var {Todo} = require("./models/todo");
var {User} = require("./models/user");

var app = express();
app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  //console.log(req.body);
  //create a new todo
  var todo = new Todo({
    text: req.body.text
  });

  // save the created todo
  todo.save()
    .then((doc) => {
      res.send(doc);
    }, (err) => {
      res.status(400).send(err);
    });
});

app.listen(3000, () => {
  console.log("App started on port 3000");
});
