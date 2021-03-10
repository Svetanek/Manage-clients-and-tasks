const mongoose = require('mongoose');
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/manager-api', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const User = mongoose.model('User', {
  name: {
  type: String,
  required: true,
  trim: true
},
email: {
  type: String,
  required: true,
  trim: true,
  lowercase: true,
  validate(value) {
    if(!validator.isEmail(value)) {
      throw new Error("Invalid Email address")
    }
  }
},
password: {
 type: String,
 required: true,
 trim: true,
 minLength: 7,
 validate(value) {
   if(value.toLowerCase().includes("password")) {
     throw new Error('should not include word "Password"')
   }
 }
},
 age: {
   type: Number,
   default: 0,
   validate(value) {
     if(value < 0) {
       throw new Error('Age must be a positive number')
     }
   }
}
})

// const user = new User({
//   name: 'Marie   ',
//   email: "marie@gmail.com",
//   password: "Pa55word",
//   age: 25
// })
// user.save().then((user) => {console.log(user)}).catch(error => console.log(error));

const Task = mongoose.model('Task', {
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false

  }
})


// const task1 = new Task({
//   description: "read some book",
//   completed: false
// })
// task1.save().then((task) => {console.log(task)}).catch(error => console.log(error));

const Client = mongoose.model('Client', {
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  doB: {
    type: Date
  },
  address: {
    type: String,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    // validator: function(value) {
    //  if(!((/\d{3}-\d{3}-\d{4}/).test(value))) {
    //    throw new Error(`${value} is not a valid phone number!`)
    //  };
    // },


    validate(value) {
      if(!validator.isMobilePhone(value)) {
        throw new Error("Invalid Phone Number")
      }
    }
  },
  email: {
  type: String,
  trim: true,
  lowercase: true,
  validate(value) {
    if(!validator.isEmail(value)) {
      throw new Error("Invalid Email address")
    }
  }

  },
  product: {
    type: String,
    trim: true
  },
  amount: {
    type: Number,
    validate(value) {
      if(value < 0) {
        throw new Error('Age must be a positive number')
      }
    }
  },
  notes: {
    type: String
  }
})

const client3 = new Client({
  firstName: "Steven",
   lastName: "Salt",
    dob: "02/01/2000",
    address: "100 Desert st, SomeTown, NY ",
    phoneNumber: "3470000000",
    email: "someemail@gmail.com",
    product: "Term20",
    amount: 1000000
    })

    client3.save().then((client) => {console.log(client)}).catch(error => console.log(error));
