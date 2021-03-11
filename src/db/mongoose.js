const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/manager-api', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })



// const user = new User({
//   name: 'Marie   ',
//   email: "marie@gmail.com",
//   password: "Pa55word",
//   age: 25
// })
// user.save().then((user) => {console.log(user)}).catch(error => console.log(error));



// const task1 = new Task({
//   description: "read some book",
//   completed: false
// })
// task1.save().then((task) => {console.log(task)}).catch(error => console.log(error));



// const client3 = new Client({
//   firstName: "Steven",
//    lastName: "Salt",
//     dob: "02/01/2000",
//     address: "100 Desert st, SomeTown, NY ",
//     phoneNumber: "3470000000",
//     email: "someemail@gmail.com",
//     product: "Term20",
//     amount: 1000000
//     })

//     client3.save().then((client) => {console.log(client)}).catch(error => console.log(error));
