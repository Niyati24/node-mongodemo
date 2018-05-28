/*var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());


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

app.listen(3000,()=>{
    console.log('App started');
});

module.exports={app};
*/
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
    res.send({todos});
   }, (e)=>{
      res.status(400).send(e);
   });
  
});
app.get('/todos/:id',(req,res)=>{
var id= req.params.id;
  if(!ObjectID.isValid(id)){
    res.status(404).send();
  }
  Todo.findById(id).then((todo)=>{
    if(todo){
      res.status(200).send({todo});
    }
      res.status(404).send();
      
    
  }
  ,(e)=>{ res.status(404).send();
  })

});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};



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
