// const mongodb = require("mongodb")
// const {MongoClient, ObjectID} = require("mongodb")
// const connectionURL = "mongodb://127.0.0.1:27017";
// const databaseName = "task-manager";

// const id = new ObjectID
// const time = id.getTimestamp();

// console.log(time)
// console.log(id.id.length)
// console.log(id.toHexString().length)

// // callback function is called when connect to mongodb.Db. Connection is not async. It is syncronous and takes time to set up connection
// MongoClient.connect(connectionURL,  {useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
//   if (error) {
//     return console.log("unable to connect to DB")
//   }

// const db = client.db(databaseName)

// db.collection('users').findOne({name: "John"}, (error, user) => {
//   if(error) {
//         return console.log('Unable to find user')
//       }
//       else console.log(user)
// })

// db.collection('users').findOne({_id: new ObjectID("60445842c7401e7010795524")}, (error, user) => {
//   if(error) {
//         return console.log('Unable to find user')
//       }
//     console.log(user)
// })

//returns cursor that has methods like toArray, count...
// db.collection('users').find({age: 36}).toArray((error, users) => console.log(users) )
// db.collection('tasks').find({completed: false}).count((error, count) => console.log(count) )


// db.collection('users').updateOne({_id: new ObjectID("604801318991b28908dd8510")}, { $inc:
//  { age: 1}
// }).then(result => console.log(result)).catch(error => console.log(error))

// db.collection('tasks').updateMany({completed: false}, { $set:
//   { completed: true}
//  }).then(result => console.log(result)).catch(error => console.log(error))

//  db.collection('tasks').deleteOne({description: "complete the node course"}).then(result => console.log(result)).catch(error => console.log(error))




// const promise = async db.collection('users').updateOne({_id: new ObjectID("604801318991b28908dd8510")}, { $set:
//   { name: 'Mike'}})
//   try {
//     await console.log(promise)
//   } catch (error) {
//     console.log(error)
//   }


// db.collection('users').insertOne({name: 'Lana', age: 20}
// , (error, result) => {
//   if(error) {
//     return console.log('Unable to insert new user')
//   }
//   console.log(result.ops)
// })

// db.collection('users').insertMany([{name: "John", age: 36}, {name: "Andrew", age: 30}],
// (error, result) => {
//   if(error) {
//         return console.log('Unable to insert new users')
//       }
//       console.log(result.ops)
// })

// db.collection('tasks').insertMany([{description: "update personal profile", completed: false}, {description: "complete the node course", completed: false}, {description: "refresh algos", completed: false}],
// (error, result) => {
//   if(error) {
//         return console.log('Unable to insert new tasks')
//       }
//       console.log(result.ops)
// })


// db.collection('clients').insertMany([{firstName: "Alex", lastName: "Weiss", dob: "01/01/2000", address: "21 Flower street Orange town, NY", product: "WL", amount: "250,000"},  {firstName: "Zack", lastName: "Smith", dob: "02/01/2000", address: "10 Corner st, SomeTown, NY ", product: "Term20", amount: "1,000,000"}] , () => {
//   if(error) {
//     return console.log('Unable to insert new clients')
//   }
//   console.log(result.ops)

// })


// })

