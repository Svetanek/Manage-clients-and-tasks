const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

//looking for the user with the certaint token in the tokens array
const auth = async (req, res, next) => {
try {
const token = req.header("Authorization").replace('Bearer ', '')
const decoded = jwt.verify(token, "thesecretphrase");
const user = await User.findOne({_id: decoded._id, 'tokens.token': token})

if(!user) {
  throw new Error()
}
req.token = token;
req.user = user;
next();

} catch (e) {
  res.status(401).send({error: "Please authenticate"})
}
}

module.exports = auth
