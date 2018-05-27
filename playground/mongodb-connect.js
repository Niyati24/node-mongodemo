const MongoClient = require('mongodb').MongoClient;
// const {MongoClient,ObjectID} = require('mongodb');
// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err)
    {
        return console.log('unable to connect to Mongodb');
    }
    console.log('Connected to Mongo server');

    // db.collection('TodoApp').insertOne({
    //     text:'Doing a lot',
    //     completed:false
    // },(err,result)=>{
    //     if(err){
    //         return console.log('Unable to write to Mongo');
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2));    
    // });
    // db.collection('Users').insertOne(
    //     {name:'Niyati',
    //     age: 24,
    //     location:'Brussels'},(err,result)=>{
 
    //     if(err)
    //     {
    //     return console.log('Error Occured',err);
    //      }
    //      console.log(JSON.stringify(result.ops,undefined,2));

    //     });
    
    db.close();

});