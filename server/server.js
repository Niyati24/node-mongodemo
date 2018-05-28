var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
app.use(bodyParser.json());
app.listen(3000,()=>{
    console.log('App started');
});

app.post('/todo',(req,res)=>{
//    console.log(req.body);
//craeting new data
var newTodo = new Todo({
    text: req.body.text
});

newTodo.save().then((doc)=>{
    res.send(doc);
},(e)=>{
    res.status(400).send(e);
});
});




// var newTodo = new Todo({
//     text:'Go for walk',
//     completed:false,
//     completedAt:20181012
// });

//     newTodo.save().then((docs)=>{
// console.log(docs);
//     },(e)=>{
// console.log('Unable to save');
//     });

//Creating users


// var newUser = new User({
//     email:'hello@gmail.com'
// });

// newUser.save().then((res)=>{
// console.log(JSON.stringify(res,undefined,2));
// },(e)=>{
// console.log('Eror',e);
// })
