const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  //fetch all available data-set
/*  db.collection('Todos')
    .find()
    .toArray()
    .then((docs) => {
      console.log('Todos');
      console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
      console.log('Unable to fetch todos', err);
    }); */
    // fetch data with specific data-set
/*
    db.collection('Todos')
      .find({completed: false})
      .toArray()
      .then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
      }, (err) => {
        console.log('Unable to fetch todos', err);
      });

      // fetch data with _id
      db.collection('Todos')
        .find({
          _id: new ObjectID('59e01542f8f7107aa6a8c098')
        })
        .toArray()
        .then((docs) => {
          console.log('Todos');
          console.log(JSON.stringify(docs, undefined, 2));
        }, (err) => {
          console.log('Unable to fetch todos', err);
        });

        // fetch data with _id
        db.collection('Users')
          .find({
            name: 'Timothy'
          })
          .toArray()
          .then((docs) => {
            console.log('Todos');
            console.log(JSON.stringify(docs, undefined, 2));
          }, (err) => {
            console.log('Unable to fetch todos', err);
          });

        // data count
        db.collection('Todos')
          .find()
          .count()
          .then((count) => {
            console.log(`Todos count: ${count}`);
          }, (err) => {
            console.log('Unable to fetch todos', err);
          });
*/
          // data count
          db.collection('Users')
            .find()
            .filter({name: 'Timothy'})
            .count()
            .then((count) => {
              console.log(`Users count: ${count}`);
            }, (err) => {
              console.log('Unable to fetch users', err);
            });



  //db.close();
});
