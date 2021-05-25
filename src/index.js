const express = require('express');
require('./db/mongoose')
 // to insure that file runs and mongoose connects to db

const userRouter = require('./routers/userRouter')
const taskRouter = require('./routers/taskRouter')
const clientRouter = require('./routers/clientRouter');
const { models } = require('mongoose');

const app = express();
const port = process.env.port || 3000

const multer = require('multer')
//to st configuration for destination where all uploads will be stored
// if(!file.originalname.endsWith('.pdf')) {
//   return cb('File must be in PDF format')
// }

const upload = multer({
  dest: 'images',
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if(!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error('File must be in Word format'))
    }
     cb(undefined, true)
  }
})
//to set endpoint where client will be able to upload his files
app.post('/upload', upload.single('upload'), (req, res) => {

  res.send()
})


//next is called to let know that we are done
// app.use((req, res, next) => {
//   if(req.method === "GET") {
//     res.send("GET requests are temporarily disabled");
//   }
//   else {
//     next()
//   }
// })

// app.use((req, res, next) => {
//     res.status(503).send("the site is under maintenance. Please come back later");
// })



// express parses incoming json data so it will be accessable as an object
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
app.use(clientRouter)




app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})

// const bcrypt = require('bcryptjs')
// const myFunction = async() => {
//   const pass = 'pa55word';
//   //8 => number of rounds
//   //with encryption we get original value back
//   const hashedPass = await bcrypt.hash(pass, 8);
//   const isMatch = await bcrypt.compare( "pa55word", hashedPass)
//   console.log('pass', pass);
//   console.log('HASHED', hashedPass);

// }

// myFunction()

// const jwt = require("jsonwebtoken")

// const myFunc = async () => {
//   const token = jwt.sign({_id: "12345"}, "thesecretphrase", {expiresIn: "2 weeks"});
//   console.log(token)
//   const data = jwt.verify(token, "thesecretphrase");
//   console.log("DATA", data)

// }
// myFunc()


// const Task = require('./models/taskModel');
// const User = require('./models/userModel')
// const refFunc = async () => {
//   // const task = await Task.findById('605d08eae5d9e673e291e1f1');
//   // await task.populate('owner').execPopulate();
//   // console.log(task.owner)
//   const user = await User.findById('605ccec60b346e6aef54ad3b');
//   await user.populate('tasks').execPopulate();
//   console.log(user.tasks)
// }
// refFunc()


//https://mongoosejs.com/docs/queries.html
