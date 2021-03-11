const express = require('express');
require('./db/mongoose')
 // to insure that file runs and mongoose connects to db

const userRouter = require('./routers/userRouter')
const taskRouter = require('./routers/taskRouter')
const clientRouter = require('./routers/clientRouter')

const app = express();
const port = process.env.port || 3000

// express parses incoming json data so it will be accessable as an object
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
app.use(clientRouter)




app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})

//https://mongoosejs.com/docs/queries.html
