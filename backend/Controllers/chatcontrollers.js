const asyncHandler = require("express-async-handler");
const { populate } = require("../Models/Chatmodel");
const Chat = require("../Models/Chatmodel");
const User = require("../Models/userModel");
//SINGLE CHAT RELATED FUNCTIONS

//access chat fn means to create chat with a user
const accesschat = asyncHandler(async (req, res) => {
  //User will send user-if with whomk he wants to create a chat
  const { userid } = req.body;
  if (!userid) {
    res.status(400);
    console.log("User id not sent");
    return;
  }

  //If chat with this user already exists, return;

  //With help of and query we are finding if both
  //i.e curr user id and user id of user with whom we want to have new chat is present(both are present)
  var ischat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userid } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage"); //means populate/replace user id with entire user info except password
  console.log(ischat);
  //populating sender field in message
  ischat = await User.populate(ischat, {
    path: "latestMessage.sender", //as we have already populated latestMessage with all message details, we can get sender from there
    select: "name pic email", //taking only these three details of sender
  });

  console.log(ischat);
  if (ischat.length > 0) {
    console.log("chat existed:");
    res.send(ischat[0]);
  } else {
    console.log("chat didn't existed:");
    //creating a new chat
    var chatdata = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userid],
      //  groupAdmin:req.user._id,  cancelled as it's a personal chat,not group
    };
    try {
      //creatin g new chat
      const newchat = await Chat.create(chatdata);
      //Finding that chat and populating user's field i.e filling ids wuith user details
      const fullchat = await Chat.findOne({ _id: newchat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).send(fullchat);
    } catch (e) {
      console.log(e);
    }
  }
});

//Function to fetch chats(chat established by user/or/by sender with user)
const fetchchats = asyncHandler(async (req, res) => {
  try {
    //Go through entire database,return chat of which user is part of
    //Then filter those chat as per userid of user with which curr user(given by req.user) is chatting with
    console.log("inside fetch-all-chats");
    //All chats including user
    const allchats = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password") //populating users field
      .populate("groupAdmin", "-password") //populating admin's field
      .populate("latestMessage") //populating message field
      .sort({ updatedAt: -1 }); //sorting from latest to old

    //populating sender inside message field too
    const finalres = await User.populate(allchats, {
      path: "latestMessage.sender",
      select: "name pic email",
    });
    res.send(finalres);
  } catch (e) {
    console.log(e);
    res.status(400).send({ Message: "Could not create a chat" });
  }
});

//GROUP CHAT RELATED FUNCTIONS
const creategroupchat = asyncHandler(async (req, res) => {
  //we'll be sending user list and group name
  //If these fields don't exist we should give an error
  if (!req.body.name || !req.body.users) {
    return res.status(400).send({ message: "Plaase enter all the fields" });
  }

  //Array will be in string format (stringified)
  var users = JSON.parse(req.body.users);
  //users + we should be adding curfrently logged in user as well
  users.push(req.user._id);
  console.log(users);
  try {
    //Creating a new group,
    //Populating required fields
    const newgroup = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const currgroupchat = await Chat.findOne({ _id: newgroup._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).send(currgroupchat);
  } catch (e) {
    console.log(e);
  }
});
module.exports = { accesschat, fetchchats, creategroupchat };
