const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todosTestdata = [{
    _id : new ObjectID(),
    text:'Making Meal'
    
},
{
    _id: new ObjectID(),
    text:'Talking to family members',
  completed: true,
  completedAt: 788
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
      return Todo.insertMany(todosTestdata);
    }).then(()=>done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('Testing the /Get request',()=>{
    it('Listing Documents in Node',(done)=>{
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res)=>{
        expect(res.body.todos.length).toBe(2);
    }).end(done)    ;
    
});

});

describe('/GET/id',()=>{
    it('should return valid todo',(done)=>{
        request(app)
        .get(`/todos/${todosTestdata[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(todosTestdata[0].text)
        }).end(done);
    })

    it('should 404 for valid id if does not exist',(done)=>{
        var id=new ObjectID().toHexString();

        request(app)  

    .get(`/todos/${id}`)
    .expect(404)
    .end(done);
    });

    it('should 404 for invalid ',(done)=>{
        request(app)
        .get('/todos/5b0bfcad37808f6c')
        .expect(404)
        .end(done);
         });
});

/*
describe('DELETE /:id',()=>{
it('should delete todo with id',(done)=>{

  var hexId = todosTestdata[1]._id.toHexString();

request(app)
.delete(`/todos/${hexId}`)
.expect(200)
.expect((res)=>{
  
  expect(res.body.todo._id).toBe(hexId);
}).end((err,res)=>
{
  if(err){
    return done(err);
  }

  Todo.findById(hexId).then((todo)=>{
    expect(todo).toNotExist();
    done();
  });
}).catch((e)=>done(e));

})

});

*/

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    var hexId = todosTestdata[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete('/todos/123abc')
      .expect(404)
      .end(done);
  });
});
  
describe('PATCH /todos/:id',()=>{
  it('completed true',(done)=>{
 var text = 'make Macrone';
  var hxid = todosTestdata[0]._id.toHexString();
  request(app)
  .patch(`/todos/${hxid}`)
  .send({completed:true,
  text:text})  
.expect(200)
.expect((res)=>{
  expect(res.body.todo.completed).toBe(true);
  expect(res.body.todo.text).toBe(text);
  expect(res.body.todo.completedAt).toBeA('number');

}).end((err,res)=>{
  if(err)
  {
    return done(err);
  }
  Todo.findById(hxid).then((todo)=>{

    expect(todo.completed).toBe(true);
    done();

  }).catch((e)=>done(e))
})

  })



  it('should make completed false',(done)=>{
    var text = 'make couscous';
     var hxid = todosTestdata[1]._id.toHexString();
     request(app)
     .patch(`/todos/${hxid}`)
     .send({completed:false,
     text})  
   .expect(200)
   .expect((res)=>{
     expect(res.body.todo.completed).toBe(false);
     expect(res.body.todo.text).toBe(text);
     expect(res.body.todo.completedAt).toNotExist();
   
   }).end(done)
   
     })
})

