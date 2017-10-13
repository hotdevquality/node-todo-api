// const MongoClient = require('mongodb').MongoClient;
const {MongoClient} = require('mongodb');


// object destructuring example
var user = {name: 'Timothy', age:21};
var {name} = user;
console.log(name);

//another example using mongodb object
var obj = new ObjectID();
console.log(obj);
