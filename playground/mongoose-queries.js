const {ObjectID} = require("mongodb");
const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");
const {User} = require("./../server/models/user");

var id = "59e4e1d2c9be961c81e2ccb5";
var userID = "59e38d3835e32c119084589e";
/*
if(!ObjectID.isValid(id)) {
  console.log("Object ID not valid");
}

// using find() method to locate document with ObjectID
Todo.find({
  _id: id
}).then((todos) => {
  console.log("Todos", todos);
});

// using findOne() method to locate document with ObjectID
Todo.findOne({
  _id: id
}).then((todos) => {
  console.log("Todos", todos);
});

// using findById() method to locate document with ObjectID
Todo.findById(id)
    .then((todo) => {
      if(!todo) {
        return console.log("Object ID not found");
      }
    console.log("Todo by ID:", todo)
}).catch((todoErr) => console.log(todoErr));
*/

/*
User.find({
  _id: userID
}).then((user) => {
  console.log("User", user);
});

User.findOne({
  _id: userID
}).then((user) => {
  console.log("User", user);
});
*/
User.findById(userID).then((user) => {
  if(!user) {
    return console.log("Unable to find user with that ID.");
  }
  console.log("User by ID", JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));
