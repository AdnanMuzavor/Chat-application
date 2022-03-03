import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Search_loading from "../Loadingcomponents/search_results_loading";
import ChatListCard from "../SmallComponents/ChatListCard";
const MyChats = () => {
  //Getting dispatch
  const dispatch = useDispatch();
  //Getting state of user
  const UserDetails = useSelector((state) => state.UserDetails);
  const { loading: userloading, UserInfo, error: usererror } = UserDetails;

  //Getting state of chat
  const ChatDetails = useSelector((state) => state.ChatDetails);
  const { loading, error, CurrChat } = ChatDetails;
  //Function for fethcing chat of current user

  //Getting chatList saved in state
  const [ChatList, setChatList] = useState([]);

  //Loading of chats
  const [chatloading, setchatloading] = useState(false);

  //This function fetched all chats of logged in user
  const fetchChat = async () => {
    setchatloading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${UserInfo.token}`,
        },
      };
      const { data } = await axios.get("/api/user/", config);
      console.log("data of chat");
      console.log(data);
      setChatList(data);
      setchatloading(false);
    } catch (e) {
      setchatloading(false);
    }
  };
  //Calling fetch chat usimg useeffect
  useEffect(() => {
    fetchChat();
  }, []);
  return loading ? (
    chatloading ? (
      <Search_loading />
    ) : (
      <Search_loading />
    )
  ) : (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-lg-4 col-12">
            {ChatList.map((e) => {
              return (
                <ChatListCard
                  key={e._id}
                  name={e.name}
                  email={e.email}
                  pic={e.pic}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyChats;
