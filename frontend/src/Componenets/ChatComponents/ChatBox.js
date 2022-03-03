import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Search_loading from "../Loadingcomponents/search_results_loading";
const ChatBox = () => {
  //Getting dispatch
  const dispatch = useDispatch();
  //Getting state of user
  const UserDetails = useSelector((state) => state.UserDetails);
  const { loading: userloading, UserInfo, error:usererror } = UserDetails;

  //Getting state of chat
  const ChatDetails = useSelector((state) => state.ChatDetails);
  const { loading, error, CurrChat } = ChatDetails;
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
  return loading ? (
    <Search_loading />
  ) : (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-lg-8 col-12">Chat here</div>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
