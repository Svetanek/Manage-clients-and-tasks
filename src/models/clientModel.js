const mongoose = require('mongoose');
const validator = require('validator')


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


module.exports = Client
