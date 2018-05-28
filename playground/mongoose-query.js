var mongoose = require('./../server/db/mongoose');
var {Todo} = require('./../server/models/todo');
var {ObjectID} = require('mongodb');

var id='5b0bfcad37808f6c2f82ca0d';
if(ObjectID.isValid(id))
{
console.log('Is valid');
}

Todo.find({
    _id:id

}).then((todos)=>{
    console.log('Todods',todos);
})

Todo.findOne({
    _id:id

}).then((todos)=>{
    console.log('Todods',todos);
})


Todo.findById(id).then((todos)=>{
    console.log('Todods',todos);
}).catch((e)=>console.log(e));
//findOne