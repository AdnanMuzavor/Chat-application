const express = require("express");
const {accesschat, fetchchats, creategroupchat} = require("../Controllers/chatcontrollers");
const { protect } = require("../middleware/authmiddleware");
const chatrouter = express.Router();

//All are given protect middleware so as to ensure that user is logged in

//For creating a chat
chatrouter.route("/").post(protect,accesschat);
//For fecthing all chats of a user
chatrouter.route("/").get(protect,fetchchats);
//Router for making a group
chatrouter.route("/group").post(protect,creategroupchat);
//Router to rename a group
chatrouter.route("/rename").put(protect);
//Router to add member to group
chatrouter.route("/groupadd").put(protect);
//Router to delete from group
chatrouter.route("/groupremove").put(protect);

module.exports = chatrouter;
