var {SHA256} = require('crypto-js');
var jwt = require('jsonwebtoken');

var data ={
    id:10
};


var token = jwt.sign(data,'789');
console.log(token);
var decoded= jwt.verify(token,'789');
console.log(decoded);
// var message = "I am home";
// var hashmessage = SHA256(message);
// console.log(`Message: ${message}`);
// console.log(`HashMessage: ${hashmessage}`);