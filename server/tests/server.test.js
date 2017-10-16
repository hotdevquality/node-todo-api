const expect = require("expect");
const request = require("supertest");

const {app} = require("./../server");
const {Todo} = require("./../models/todo");

beforeEach((done) => {
  Todo.remove({}).then(() => done());
});

describe("POST /todos", () => {
  it("should create a new todo", (done) => {
    var text = "Test todo text";

    // make request via supertest

    request(app)
      .post("/todos")
      .send({text}) // Object will be converted by supertest to JSON Object
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      // end but also check along to see what got stored in mongodb collection
      .end((err, res) => {
        if(err) {
          return done(err);
        }

        // if no err, then check the todos created does exist in the backend
        Todo.find().then((todos) => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          }).catch((todosErr) => done(todosErr));
      });
  });

  it("should not create todo with invalid body data", (done) => {
    request(app)
      .post("/todos")
      .send({})
      .expect(400)
      .end((err, res) => {
        if(err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(0);
          done();
        }).catch((todosErr) => done(todosErr));
      })
  });


});
