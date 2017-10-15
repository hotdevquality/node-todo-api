var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var todo = mongoose.model('todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

var user = mongoose.model("user", {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
});
/*
var newTodo = new todo({
  text: 'Cook dinner'
});

newTodo.save()
  .then((doc) => {
    console.log('Saved todo', doc);
  }, (err) => {
    console.log('Unable to save todo');
  }); */
/*
  var newTodo2 = new todo({
    text: '   Edit this video'
  });

  newTodo2.save()
    .then((doc) => {
      console.log('Saved todo', JSON.stringify(doc, undefined, 2));
    }, (err) => {
      console.log('Unable to save todo')
  });
*/
    var newUser = new user({
      email: ' '
    });

    newUser.save()
      .then((doc) => {
        console.log('User saved', JSON.stringify(doc, undefined, 2));
      }, (err) => {
        console.log('Unable to save user', err)
    });
