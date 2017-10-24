// import external modules
const _ = require("lodash");
const {ObjectID} = require("mongodb");
const express = require("express");
const bodyParser = require("body-parser");

// local file import
const {mongoose} = require("./db/mongoose");
const {Todo} = require("./models/todo");
const {User} = require("./models/user");

var app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
var id;

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

app.get("/todos/:id", (req, res) => {
  id = req.params.id;
  // Check for Valid ID using isValid()
  if(!ObjectID.isValid(id)) {
  // if not valid send respond with 404 status code with empty todo body array
    return res.status(404).send();
  }
  // findById()
  Todo.findById(id).then((todo) => {
    // if success
    if(!todo) {
      // if no todo - send back 404 with empty body
      return res.status(404).send();
    }
    // respond back with todo body
    res.send({todo});
  }).catch((err) => {
    res.status(400).send();
  });
});

app.delete("/todos/:id", (req, res) => {
  id = req.params.id;
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }
    res.send({todo})
  }).catch((err) => res.status(400).send());
});

app.patch("/todos/:id",(req, res) => {
  id = req.params.id;
  var body = _.pick(req.body, ["text", "completed"]);

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});

module.exports = {app};
