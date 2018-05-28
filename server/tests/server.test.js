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
    text:'Talking to family members'

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

  

