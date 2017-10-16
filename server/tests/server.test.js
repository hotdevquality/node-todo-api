const expect = require("expect");
const request = require("supertest");

const {app} = require("./../server");
const {Todo} = require("./../models/todo");

// Neeeded to add some todo for test purpose
const todos = [
  {text: "First test todo"},
  {text: "Second test todo"}
];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
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
        Todo.find({text}).then((todos) => {
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
          expect(todos.length).toBe(2);
          done();
        }).catch((todosErr) => done(todosErr));
      });
  });
});

describe("GET /todos", () => {
  it("should get all todos", (done) => {
    request(app)
      .get("/todos")
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});
