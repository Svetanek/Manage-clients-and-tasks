const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth')
const Task = require('../models/taskModel');
const User = require('../models/userModel');

router.post('/tasks',auth, async (req, res) => {
  try {
    // const task = new Task(req.body)
    const task = new Task({...req.body, owner: req.user._id})
  await task.save()
  res.status(201).send(task)
  } catch (error) {
    res.status(400).send(error)
  }
  // task.save().then(() => {
  //   res.status(201).send(task)
  //  }).catch((e) => {res.status(400).send(e)})

 })
 router.get('/tasks', auth, async (req, res) => {
  try {
    // const tasks = await Task.find({}); //without auth
    // const tasks = await Task.find({owner: req.user._id}) //with auth
    await req.user.populate('tasks').execPopulate();

    res.send(req.user.tasks)
  } catch (error) {
    res.status(500).send()
  }
 })

 router.get('/tasks/:id', auth, async (req, res, next) => {
  try {
    const _id = req.params.id
    // const task = await Task.findById(req.params.id);
    const task = await Task.findOne({_id, owner: req.user._id})

    if(!task) {
   res.status(404).send('task not found')
    }
    else res.send(task)
  } catch (error) {
    if(error.name === 'CastError') {
      return res.status(400).send('Invalid task id')
    }
    // next(error)
    res.status(500).send('500 error')
  }
 })



 router.patch('/tasks/:id', auth, async (req, res, next) => {
  const allowedParametersForUpdates = ["description", "completed"]
  const updatesFields = Object.keys(req.body);
  const isValidUpdate = updatesFields.every(item => allowedParametersForUpdates.includes(item))
  if(!isValidUpdate) {
    return res.status(400).send({error: "invalid updates"})
  }
  try {
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
    // const task = await Task.findById(req.paramss.id)
    const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
    if(!task) {
      return res.status(404).send("task not found")
    }
    updatesFields.forEach(field => task[field] = req.body[field])
    await task.save()
  res.send(task)
  } catch (error) {
  res.status(400).send(error)
  }
})

router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    // const task = await Task.findByIdAndDelete(req.params.id);
    const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})
    if(!task) {
     return res.status(404).send("task not found")
   }
 res.send(task)

  } catch (error) {
    res.status(500).send()
  }
})

module.exports = router
