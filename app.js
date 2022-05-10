require('dotenv').config();
require('express-async-errors');
const express = require('express');
const cors = require('cors');

const app = express();
// db module
const connectDB= require('./db/connect')
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const eventRouter=require('./routes/event')  
const authRouter=require('./routes/auth')
const userRouter=require('./routes/user')
app.use(express.json());
app.use(cors());
// extra packages

// routes
//Routers for event tasks,authorization , user management tasks
app.use('/api/v1/users',userRouter)
app.use('/api/v1/events',eventRouter)
app.use('/api/v1/',authRouter)
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
      await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();