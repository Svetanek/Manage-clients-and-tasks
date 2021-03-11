const express = require('express');
const router = express.Router()
const User = require('../models/userModel')

router.post('/users', async (req, res) => {
  const user = new User(req.body)
  try {
    console.log("BODY", req.body)

    await user.save()
    res.status(201).send(user)
  } catch (error) {
    res.status(400).send(error)
  }
//  user.save().then(() => {
//    res.status(201).send(user)
//   }).catch((e) => {res.status(400).send(e)})

})

router.get('/users/:id', async (req, res, next) => {
  try {
  // const _id = req.params.id
    const user = await User.findById(req.params.id);

    if(!user) {
   res.status(404).send('user not found')
    }
    else res.send(user)
  } catch (error) {
    if(error.name === 'CastError') {
      return res.status(400).send('Invalid id')
    }
    next(error)
    // res.status(500).send()
  }
 })

 router.get('/users', async (req, res) => {
  try {
    const users = await User.find({})
    res.send(users)
  } catch (error) {
    res.status(500).send()
  }
 })

//optional parameters -- to return new updated object
 router.patch('/users/:id', async (req, res, next) => {
   const allowedParametersForUpdates = ["name", "email", "age", "password"]
   const updates = Object.keys(req.body);
   const isValidUpdate = updates.every(item => allowedParametersForUpdates.includes(item))
   if(!isValidUpdate) {
     return res.status(400).send({error: "invalid updates"})
   }
   try {
     const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
     if(!user) {
       return res.status(404).send("user not found")
     }
   res.send(user)
   } catch (error) {
   res.status(400).send(error)
   }
 })

 router.delete('/users/:id', async (req, res) => {
   try {
     const user = await User.findByIdAndDelete(req.params.id);
     if(!user) {
      return res.status(404).send("user not found")
    }
  res.send(user)

   } catch (error) {
     res.status(500).send()
   }
 })

module.exports = router
