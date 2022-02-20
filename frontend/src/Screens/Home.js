import { Container, Box, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import React from "react";
import Login from "../Componenets/Authentication/login";
import Signup from "../Componenets/Authentication/signup";
import Chatlist from "./Chatlist";
import Chatpage from "./ChatPage";

const Homepage = () => {
  return (
    <>
      <Container maxW="xl" centerContent>
        <Box
          bg={"#ffff"}
          justifyContent="center"
          padding={3}
          d="flex"
          w="100%"
          m="40px 0 15px 0"
          borderRadius={"lg"}
          borderWidth="1px"
        >
          <Text fontSize="3xl" fontFamily="word-sans">
            Talk-to-tive
          </Text>
        </Box>
          <div className="container">
          <Tabs variant={'soft-rounded'}>
            <TabList mb='1em'>
              <Tab width="50%">Login</Tab>
              <Tab width="50%">Sign-up</Tab>
            
            </TabList>

            <TabPanels>
              <TabPanel>
                <Login/>
              </TabPanel>
              <TabPanel>
                <Signup/>
              </TabPanel>
             
            </TabPanels>
          </Tabs>
          </div>
      </Container>
    </>
  );
};

export default Homepage;
