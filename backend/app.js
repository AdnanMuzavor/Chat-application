const express = require("express");
const chats = require("./data/data");
const connection = require("./config/conn");
//Instance of express
const app = express();

//To make server understand json data
app.use(express.json());

//Making app capable of usig .env file
const dotenv = require("dotenv");
const userRouter = require("./routers/userroutes");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");

dotenv.config();

const port = process.env.PORT || 5000;

//Connecting with data abse
// require("./config/conn")
connection();

//Using API routers

//1->User routers
app.use("/api/user/", userRouter);

//If APIs does'nt work or any error these lines will be executed
app.use(notFound);
app.use(errorHandler);

//Making server listen to port number
app.listen(port, () => {
  console.log(`Listening to port number: ${port}`);
});
