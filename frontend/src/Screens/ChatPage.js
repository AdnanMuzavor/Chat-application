import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { ChatState } from "../Context/ContextProvider";
import SideDrawer from "../Componenets/ChatComponents/SideDrawer";
import MyChats from "../Componenets/ChatComponents/MyChats";
import ChatBox from "../Componenets/ChatComponents/ChatBox";
import { Box } from "@chakra-ui/react";
const Chatpage = () => {
  //To take care of all chat messages
  // const [chats, setchats] = useState([]);
  // const fetchchat = async () => {
  //   const { data } = await axios.get("/api/chats");
  //   setchats(data);
  //   console.log(data);
  // };
  // useEffect(() => {
  //   fetchchat();
  // }, []);

  //Entire state is in ChatState named variable so getting it hee
  const { user } = ChatState; //this user is that valeu which is passed as value to providefr
  return (
    <>
      <div style={{ width: "100%" }}>
        {/*A side drawer to be rendered only if user is logged in */}
        {user && <SideDrawer />}
        <SideDrawer/>
        <Box
        d="flex"
        justifyContent={"space-between"}
        w="100%"
        h="91.5vh"
        p="10px"
        >
          {/* My chats component to be rendered only if user is logged in*/}
          {user && <MyChats />}
          <MyChats/>
          {/* Chat box component to be rendered only if user is logged in*/}
          {user && <ChatBox />}
          <ChatBox/>
        </Box>
      </div>
    </>
  );
};

export default Chatpage;
