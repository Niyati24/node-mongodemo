var mongoose = require('./../server/db/mongoose');
var {Todo} = require('./../server/models/todo');

// Todo.remove({}).then((results)=>{
//     console.log(results);
// });

var id ='5b0c1d6c1560391cf8bec81c';
Todo.findByIdAndRemove(id).then((result)=>{
    console.log(result);
})