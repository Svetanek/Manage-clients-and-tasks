const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
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
  unique: true,
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
},
tokens: [{
  token: {
    type: String,
  required: true
  }
}]
})
//custom instance method
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = await jwt.sign({_id: user._id.toString()}, "thesecretphrase", {expiresIn: "2 weeks"});
   //When the argument is not an array, concat adds it as a whole, while ... tries to iterate it and fails if it can't.
   user.tokens = user.tokens.concat({token})
   // user.tokens = [...user.tokens, ...{token}]
   user.save();
  return token;

}

//custom model method
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({email})
  if(!user) {
    throw new Error('no user exist with that login info')
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch) {
    throw new Error('please check your email and password')
  }
  return user
}

userSchema.pre('save', async function(next) {
  const user = this

  if(user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  console.log(`Just before saving ${user.name}`)
  next()
})
const User = mongoose.model('User', userSchema)

module.exports = User
