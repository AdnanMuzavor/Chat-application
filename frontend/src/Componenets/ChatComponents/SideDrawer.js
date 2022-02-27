import {
  Tooltip,
  Box,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  Avatar,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import ProfileModal from "../SmallComponents/ProfileModal";
// import {ChatState} from "../../Context/ContextProvider";

const SideDrawer = () => {
  //Getting user state
  // const {user}=ChatState();
  //For searching user
  const [search, setsearch] = useState("");
  //To keep API result returned by /search api
  const [searchresult, setsearchresult] = useState([]);
  //Loading while our api gets thr result for us
  const [loading, setloading] = useState(false);
  //On clicking user chat will be loaded
  const [loadingchat, setLoadingchat] = useState();
  return (
    <>
      <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="#ffff"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        {/* First component in flex box */}
        <Tooltip label="Search for users" hasArrow placement="bottom-end">
          <Button variant="ghost">
            <i className="fas fa-search"></i>
            <Text d={{ base: "none", md: "flex" }} p="3">
              Search User
            </Text>
          </Button>
        </Tooltip>
        {/* Second component in flex box */}
        <Text fontSize="2xl" fontFamily="Work sans">
          Chatsapp
        </Text>
        {/* third component in flex box */}
        <div>
          <Menu>
            <MenuButton p="1">
              <BellIcon fontSize="2xl" m="1"></BellIcon>
            </MenuButton>
            <MenuList></MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon></ChevronDownIcon>}
            >
               <Avatar size="sm" cursor="pointer" name={"name"}></Avatar>

            </MenuButton>
            <MenuList>
              <ProfileModal>
              {/* <MenuItem>My profile</MenuItem> */}
              </ProfileModal>
              <MenuDivider></MenuDivider>
              <MenuItem>Log out</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
    </>
  );
};

export default SideDrawer;
