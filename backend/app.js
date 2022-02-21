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

dotenv.config();

const port = process.env.PORT || 5000;

//Connecting with data abse
// require("./config/conn")
connection();

//Using API routers

//1->User routers
app.use("/api/user/",userRouter);
//Making server listen to port number
app.listen(port, () => {
  console.log(`Listening to port number: ${port}`);
});
