import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { ChatState } from "../Context/ContextProvider";
import SideDrawer from "../Componenets/ChatComponents/SideDrawer";
import MyChats from "../Componenets/ChatComponents/MyChats";
import ChatBox from "../Componenets/ChatComponents/ChatBox";
import { Box } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const Chatpage = () => {
  //Getting dispatch
  const dispatch = useDispatch();
  //Getting user data
  const UserDetails = useSelector((state) => state.UserDetails);
  const { loading: userloading, error, UserInfo } = UserDetails;

  const history = useHistory();
  useEffect(() => {
    if (!UserInfo) {
      history.push("/");
    }
    console.log(UserInfo)
  }, []);
  return (
    <>
      <div style={{ width: "100%" }}>
        {/*A side drawer to be rendered only if user is logged in */}
        {/* { <SideDrawer />} */}
        <SideDrawer />
        <Box
          d="flex"
          justifyContent={"space-between"}
          w="100%"
          h="91.5vh"
          p="10px"
        >
          {/* My chats component to be rendered only if user is logged in*/}
          {/* {UserInfo && <MyChats />} */}
          <MyChats />
          {/* Chat box component to be rendered only if user is logged in*/}
          {/* {UserInfo && <ChatBox />} */}
          <ChatBox />
        </Box>
      </div>
    </>
  );
};

export default Chatpage;
