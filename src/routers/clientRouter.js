const express = require('express');
const router = new express.Router();
const Client = require('../models/clientModel')

router.post('/clients',async (req, res) => {
  try {
    const client = new Client(req.body)
  await client.save()
  res.status(201).send(client)
  } catch (error) {
    res.status(400).send(error)
  }
 })

 router.get('/clients/:id', async (req, res, next) => {
  try {
  // const _id = req.params.id
    const client = await Client.findById(req.params.id);
    console.log(client)
    if(!client) {
   res.status(404).send('client not found')
    }
    else res.send(client)
  } catch (error) {
    if(error.name === 'CastError') {
      return res.status(400).send('Invalid id')
    }
    next(error)
    // res.status(500).send()
  }
 })

 router.get('/clients', async (req, res) => {
  try {
    const clients = await Client.find({})
    res.send(clients)
  } catch (error) {
    res.status(500).send()
  }
 })

 router.patch('/clients/:id', async (req, res, next) => {
  const allowedParametersForUpdates = ["firstName", "lastName", "address", "phoneNumber", "email", "doB", "product", "amount"]
  const updates = Object.keys(req.body);
  const isValidUpdate = updates.every(item => allowedParametersForUpdates.includes(item))
  if(!isValidUpdate) {
    return res.status(400).send({error: "invalid updates"})
  }
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
    if(!client) {
      return res.status(404).send("client not found")
    }
  res.send(client)
  } catch (error) {
  res.status(400).send(error)
  }
})

router.delete('/clients/:id', async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if(!client) {
     return res.status(404).send("client not found")
   }
 res.send(client)

  } catch (error) {
    res.status(500).send()
  }
})


module.exports = router
