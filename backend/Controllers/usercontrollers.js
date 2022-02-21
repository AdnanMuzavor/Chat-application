const asyncHandler = require("express-async-handler");
const res = require("express/lib/response");
const generatetoken = require("../config/generatetoken");
const User = require("../Models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  //Destructing things which it'll be taking from body
  const { name, email, password, pic } = req.body;

  //Thwing errors if any fields are missing
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  //Checking if user exists in database
  const finduser = await User.findOne({ email: email });
  if (finduser) {
    res.status(400);
    throw new Error("User already exists");
  } else {
    //Creating a new user
    const newUser = await User.create({
      name,
      email,
      password,
      pic,
    });

    //  If user is created return it's data
    if (newUser) {
      res
        .status(201)
        .json({
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          pic: newUser.pic,
          token:generatetoken(newUser._id)
        });
        //Else throw errorr
    } else {
        res.status(400);
        throw new Error("Could not create a user")
    }
  }
});
const loginUser=asyncHandler((req,res)=>{

})
module.exports={registerUser,loginUser};
