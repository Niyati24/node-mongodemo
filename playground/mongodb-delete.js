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

    //deleteMany
    // db.collection('TodoApp').deleteMany({completed:true}).then((result)=>{
    // console.log(JSON.stringify(result,undefined,2));

    // });

    //deleteOne
// db.collection('TodoApp').deleteOne({text:'Eat Lunch'}).then((output)=>{
// console.log(output);
// });

//findOneAndDelete
db.collection('TodoApp').findOneAndDelete({_id:ObjectID('5b09c225614bf341e891e07a')}).then((results)=>{
    console.log(results);
});


    //   db.collection('Users').find({name:'Niyati'}).toArray().then((docs)=>{
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(err)=>{
    //     console.log('Error',err);
    // })
    db.close();

});