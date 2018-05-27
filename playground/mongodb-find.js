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

    
    // db.collection('TodoApp').find({completed:false}).toArray().then((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));

    // },(err)=>
    // {
    //     console.log('error occured');
    // });

    //to count no of users whose name is Andrew

    db.collection('Users').find({name:'Niyati'}).toArray().then((docs)=>{
        console.log(JSON.stringify(docs,undefined,2));
    },(err)=>{
        console.log('Error',err);
    })
    db.close();

});