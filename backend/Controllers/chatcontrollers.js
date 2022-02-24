const asyncHandler = require("express-async-handler");
const Chat = require("../Models/Chatmodel");
const User = require("../Models/userModel");

//access chat fn means to create chat with a user
const accesschat = asyncHandler(async (req, res) => {
        //User will send user-if with whomk he wants to create a chat
        const {userid}=req.body;
         if(!userid){
             res.status(400)
             console.log("User id not sent");
             return;
         }

        //If chat with this user already exists, return;

        //With help of and query we are finding if both
        //i.e curr user id and user id of user with whom we want to have new chat is present(both are present)
        var ischat=await Chat.find({isGroupChat:false,
        $and:[
            {users:{$elemMatch:{$eq:req.user._id}}},
            {users:{$elemMatch:{$eq:userid}}}
        ]
        }).populate("users","-password").populate("latestMessage") //means populate/replace user id with entire user info except password
        console.log(ischat)
        //populating sender field in message
        ischat=await User.populate(ischat,{
            path:"latestMessage.sender", //as we have already populated latestMessage with all message details, we can get sender from there
            select:"name pic email" //taking only these three details of sender
        })
        console.log("chat existed:")
        console.log(ischat)
    if(ischat.length>0){
        res.send(ischat[0]);
    }
    else{
        //creating a new chat
        var chatdata={
            chatName:"sender",
            isGroupChat:false,
            users:[req.user._id,userid]
        }
        try {
            //creatin g new chat
            const newchat=await Chat.create(chatdata);
            const fullchat=await Chat.findOne({_id:newchat._id}).populate("users","-password")
            res.status(200).send(fullchat)
            
        } catch (e) {
            console.log(e)
        }
    }
});

module.exports = { accesschat };
