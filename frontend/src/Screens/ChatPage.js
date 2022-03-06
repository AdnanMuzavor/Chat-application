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
    console.log(UserInfo);
  }, []);
  return (
    <>
      {/* <div style={{ width: "100%" }}>
        <SideDrawer />
        <Box
          d="flex"
          justifyContent={"space-between"}
          w="100%"
          h="91.5vh"
          p="10px"
        >
          <MyChats />

          <ChatBox />
        </Box>
      </div> */}
      <div className="">
        <div className="row">
          {/*A side drawer to be rendered only if user is logged in */}
          <div className="col-md-12 col-lg-12 col-12">
            <SideDrawer />
          </div>
        </div>
        <div className="row">
          {/* My chats component to be rendered only if user is logged in*/}
          <div className="col-md-4 col-lg-4 col-12">
            <MyChats />
          </div>
          {/*A side drawer to be rendered only if user is logged in */}
          <div className="col-md-8 col-lg-8 col-12">
            <ChatBox />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatpage;
