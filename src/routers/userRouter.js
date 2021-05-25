const express = require('express');
const router = express.Router()
const auth = require('../middleware/auth')
const User = require('../models/userModel')

const multer = require('multer')
//to st configuration for destination where all uploads will be stored
//limit 1000000 bytes = 1MB
const upload = multer({
  dest: 'avatars',
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    // if(!file.originalname.endsWith('.pdf')) {
    //   return cb('File must be in PDF format')
    // }
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload the image'))
    }
     cb(undefined, true)
  }
})



router.post('/users', async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({user, token})
  } catch (error) {
    res.status(400).send(error)
  }
})
//  user.save().then(() => {
//    res.status(201).send(user)
//   }).catch((e) => {res.status(400).send(e)})




 //findByCredentials - custom method
 //for securing and not exposing private data instead of writing: res.send({user: user.getPublicProfile(), token}) we can leave short {user, token} and just write that method as ...toJSON()
router.post('/users/login', async (req, res, next) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken()

    res.send({user, token})

  } catch (error) {
res.status(400).send()
  }
})

router.post("/users/logout", auth, async (req, res, next) => {
  try {

    req.user.tokens = req.user.tokens.filter(token => token !== req.token);
    req.user.save();
    res.send("you are logged out")
  } catch (error) {
    res.status(500).send()

  }
})
router.post("/users/logoutAll", auth, async (req, res, next) => {
  try {

    req.user.tokens = [];
    req.user.save();
    res.send("you are logged off")
  } catch (error) {
    res.status(500).send()

  }
})

//users/me has to be above users/:id
 //it will call the third argument when the middleware calls the next() function
router.get('/users/me', auth, async (req, res) => {
  res.send(req.user)
  })


// router.get('/users/:id', async (req, res, next) => {
//   try {
//   // const _id = req.params.id
//     const user = await User.findById(req.params.id);

//     if(!user) {
//    res.status(404).send('user not found')
//     }
//     else res.send(user)
//   } catch (error) {
//     if(error.name === 'CastError') {
//       return res.status(400).send('Invalid id')
//     }
//     next(error)
//   }
//  })

//  router.get('/users', auth, async (req, res, next) => {
//   try {
//     const users = await User.find({})
//     res.send(users)
//   } catch (error) {
//     res.status(500).send()
//   }
//  })



//optional parameters -- to return new updated object
 router.patch('/users/me', auth, async (req, res) => {

   const allowedParametersForUpdates = ["name", "email", "age", "password"]
   const updatesFields = Object.keys(req.body);
   const isValidUpdate = updatesFields.every(item => allowedParametersForUpdates.includes(item))
   if(!isValidUpdate) {
     return res.status(400).send({error: "invalid updates"})
   }
   try {
    // const user = await User.findById(req.params.id);
    // if(!user) {
    //   return res.status(404).send("user not found")
    // }
    updatesFields.forEach(field => req.user[field] = req.body[field])
    await req.user.save()
   res.send(req.user)
   } catch (error) {
   res.status(400).send(error)
   }
 })

 //using mongoose method remove
 router.delete('/users/me', auth,  async (req, res) => {
   try {
    //  const user = await User.findByIdAndDelete(req.user._id);
    //  if(!user) {
    //   return res.status(404).send("user not found")
    // }
    await req.user.remove()
  res.send(req.user)

   } catch (error) {
     res.status(500).send()
   }
 })

  router.post('/users/me/avatar', upload.single('avatar'),  (req, res) => [
    res.send(),
    (error, req, res, next) => {
      res.status(400).send({error: error.message})
    }
  ])



module.exports = router
