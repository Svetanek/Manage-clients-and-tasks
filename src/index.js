const express = require('express');
require('./db/mongoose')
 // to insure that file runs and mongoose connects to db

const userRouter = require('./routers/userRouter')
const taskRouter = require('./routers/taskRouter')
const clientRouter = require('./routers/clientRouter')

const app = express();
const port = process.env.port || 3000

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

const jwt = require("jsonwebtoken")

const myFunc = async () => {
  const token = jwt.sign({_id: "12345"}, "thesecretphrase", {expiresIn: "2 weeks"});
  console.log(token)
  const data = jwt.verify(token, "thesecretphrase");
  console.log("DATA", data)

}
myFunc()


//https://mongoosejs.com/docs/queries.html
