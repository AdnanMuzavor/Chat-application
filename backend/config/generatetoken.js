const jwt=require("jsonwebtoken");

const generatetoken=async(userid)=>{
    //Generating a token
    const token=await jwt.sign({userid},process.env.SECRET_KEY,{
        expiresIn:"30d"
    });
    return token
}

module.exports=generatetoken;