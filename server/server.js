// import external modules
const express = require("express");
const bodyParser = require("body-parser");

// local file import
const {mongoose} = require("./db/mongoose");
const {Todo} = require("./models/todo");
const {User} = require("./models/user");

var app = express();
app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  //console.log(req.body);
  //create a new todo
  var todo = new Todo({
    text: req.body.text
  });

  // save the created todo
  todo.save().then((doc) => {
      res.send(doc);
    }, (err) => {
      res.status(400).send(err);
    });
});

app.get("/todos", (req, res) => {
  Todo.find()
    .then((todos) => {
      res.send({todos});
    }, (err) => {
      res.status(400).send(err);
    });
});

app.listen(3000, () => {
  console.log("App started on port 3000");
});

module.exports = {app};
