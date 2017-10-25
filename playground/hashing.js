const {SHA256} = require("crypto-js");
const jwt = require("jsonwebtoken");

var data = {
  id: 10
};

var token = jwt.sign(data, "123abc!");
console.log(token);

var decoded = jwt.verify(token, "123abc!");
console.log(decoded);


/*
// All the below is called JSON web token (JWT)
var message = "I am user number 3";
var hash =SHA256(message).toString();

console.log(`Message: ${message}`);
console.log(`Hash: ${hash}`);

var data = {
  id: 4
};
var token = {
  data,
  hash: SHA256(JSON.stringify(data) + 'somescret').toString()
};

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

var hashResult = SHA256(JSON.stringify(token.data) + 'somescret').toString();
if(hashResult === token.hash) {
  console.log("Trusted, as data was not changed.")
} else {
  console.log("Do not trust! Data was changed.")
}
*/
