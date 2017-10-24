const {ObjectID} = require("mongodb");
const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");
const {User} = require("./../server/models/user");
/*
Todo.remove({}).then((result) => {
  console.log(result);
});

// this takes more queries
Todo.findOneAndRemove({
  _id: "59ee8c271ca795c8c080f199"
}).then((todo) => {
  console.log(todo);
});
*/

Todo.findByIdAndRemove('59ee8c271ca795c8c080f199').then((todo) => {
  console.log(todo);
});
