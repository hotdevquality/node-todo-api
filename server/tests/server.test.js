const expect = require("expect");
const request = require("supertest");
const {ObjectID} = require("mongodb");

const {app} = require("./../server");
const {Todo} = require("./../models/todo");
const {todos, populateTodos, users, populateUsers} = require("./seed/seed");

beforeEach(populateUsers);
beforeEach(populateTodos);

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

describe("GET /todo/:id", () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it("should return 404 if todo not found", (done) => {
    var hexID = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${hexID}`)
      .expect(404)
      .end(done);
  });

  it("should return 404 for non-object id", (done) => {
    request(app)
      .get(`/todos/123`)
      .expect(404)
      .end(done);
  });

});

describe("DELETE /todos/:id", () => {
  it("should return a todo", (done) => {
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }
        Todo.findById(hexId).then((todo) => {
          expect(todo).toBeFalsy();
          done();
        }).catch((e) => done(e));
      });
  });

  it("should return 404 if todo not found", (done) => {
    var hexID = new ObjectID().toHexString();
    request(app)
      .delete(`/todos/${hexID}`)
      .expect(404)
      .end(done);
  });

  it("should return 404 if object id is invalid", (done) => {
    request(app)
      .delete(`/todos/123`)
      .expect(404)
      .end(done);
  });
});

describe("PATCH /todos/:id", () => {
  it("should update the todo", (done) => {
    var hexId = todos[1]._id.toHexString();
    var text = "Another second test to do update";
    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: true,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        // expect(res.body.todo.completedAt).toBeA("number");
        expect(typeof res.body.todo.completedAt).toBe('number');
      })
      .end(done);
  });

  it("should clear completedAt when completed is false", (done) => {
    var hexId = todos[0]._id.toHexString();
    var text = "Another first test to do update";
    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: false,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        // expect(res.body.todo.completedAt).toNotExist(); // depreciated
        // expect(res.body.todo.completedAt).toBeNull(); // another option
        expect(res.body.todo.completedAt).toBeFalsy();
      })
      .end(done);
  });
});
