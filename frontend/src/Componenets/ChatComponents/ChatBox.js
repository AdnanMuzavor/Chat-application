import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Search_loading from "../Loadingcomponents/search_results_loading";
const ChatBox = () => {
  //Getting dispatch
  const dispatch = useDispatch();
  //Getting state of user
  const UserDetails = useSelector((state) => state.UserDetails);
  const { loading: userloading, UserInfo, error:usererror } = UserDetails;
 //Current message which user types
 const [message,setmessage]=useState("");
  //Getting state of chat
  const ChatDetails = useSelector((state) => state.ChatDetails);
  const { chatloading, error, CurrChat } = ChatDetails;
  //Function for fethcing chat of current user
  //This function fetched all chats of logged in user
  const fetchChat = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${UserInfo.token}`,
        },
      };
      const { data } = await axios.get("/api/user/", config);
      console.log("data of chat")
      console.log(data);
    } catch (e) {}
  };
  //Calling fetch chat usimg useeffect
  useEffect(() => {
    fetchChat();
  }, []);
  return  (
    <>
      <div className={`container chatmainbox ${chatloading?"center":""}`}>
       {chatloading?<Search_loading/>:<div className="row chatwrap">
        <div className="chattext">
          <h2>{CurrChat?CurrChat.users[1].name:"Sender's name"}</h2>
          <div className="iconwrap">
          <i class="fa fa-eye" aria-hidden="true"></i>
            </div>
          </div>
          <div className="col-md-12 col-lg-12 col-12 ">
            <div className="messagebox"></div>
            <div className="textbox">
              <input
              type="text"
              name="message"
              onChange={(e)=>setmessage(e.target.value)}
              placeholder="Enter Your Message"
              ></input>
              <button className="sendbtn">
                send
                </button>
              </div>
          </div>
        </div>}
        
      </div>
    </>
  );
};

export default ChatBox;
