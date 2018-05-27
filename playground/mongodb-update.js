//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');
// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err)
    {
        return console.log('unable to connect to Mongodb');
    }
    console.log('Connected to Mongo server');

    

//findOneAndUpdate
db.collection('Users').findOneAndUpdate({
    _id:ObjectID('5b0a7a22ea77f32be1720223')},
{    $set:{name:'Chavi'},
    $inc:{ age:1 }
}
,
{
retunOriginal: false
}).then((results)=>{
    console.log(results);
});


    
    db.close();

});