const express = require('express');
const router = new express.Router()
const Task = require('../models/taskModel')

router.post('/tasks', async (req, res) => {
  try {
    const task = new Task(req.body)
  await task.save()
  res.status(201).send(task)
  } catch (error) {
    res.status(400).send(error)
  }
  // task.save().then(() => {
  //   res.status(201).send(task)
  //  }).catch((e) => {res.status(400).send(e)})

 })

 router.get('/tasks/:id', async (req, res, next) => {
  try {
  // const _id = req.params.id
    const task = await Task.findById(req.params.id);
    console.log(task)
    if(!task) {
   res.status(404).send('task not found')
    }
    else res.send(task)
  } catch (error) {
    if(error.name === 'CastError') {
      return res.status(400).send('Invalid id')
    }
    next(error)
    // res.status(500).send()
  }
 })

 router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.send(tasks)
  } catch (error) {
    res.status(500).send()
  }
 })

 router.patch('/tasks/:id', async (req, res, next) => {
  const allowedParametersForUpdates = ["description", "completed"]
  const updatesFields = Object.keys(req.body);
  const isValidUpdate = updatesFields.every(item => allowedParametersForUpdates.includes(item))
  if(!isValidUpdate) {
    return res.status(400).send({error: "invalid updates"})
  }
  try {
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
    const task = await Task.findById(req.paramss.id)
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

router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if(!task) {
     return res.status(404).send("task not found")
   }
 res.send(task)

  } catch (error) {
    res.status(500).send()
  }
})

module.exports = router
