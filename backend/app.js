const express = require("express");
const chats = require("./data/data");

//Instance of express
const app = express();

//Making app capable of usig .env file
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 5000;

//Basic Home page
app.get("/", (req, res) => {
  res.send("Hello from chat application");
});

//Sending dummy chats from API
app.get("/api/chats", (req, res) => {
  res.send(chats);
});

//What does req do?
//Finding it out
app.get("/api/chat/:id", (req, res) => {
  console.log(req);
  const singlechat = chats.find((e) => e._id === req.params.id);
  res.send(singlechat);
});
//Making server listen to port number
app.listen(port, () => {
  console.log(`Listening to port number: ${port}`);
});
