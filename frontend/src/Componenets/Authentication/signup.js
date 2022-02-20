import {
    FormControl,
    FormLabel,
    VStack,
    Input,
    InputGroup,
    InputRightElement,
    Button,
  } from "@chakra-ui/react";
  import React, { useImperativeHandle, useState } from "react";
  
  const Signup = () => {
      //States to take care of inputs
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [confirmpassword, setconfirmpassword] = useState("");
    const [pic, setpic] = useState("");
    const [show, setshow] = useState(false);
    //Function to deal with profile photo upload
    const postdetails=(file)=>{
  
    }
    //Function to submit data
    const SubmitHandler=()=>{
  
    }
    return (
      <VStack spacing={"5px"}>
          {/* Any form component can be wrapped inside fromcontrol component */}
        <FormControl id="firstname" isRequired>
            {/* Form control has two things label and input */}
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Enter your name"
            onChange={(e) => setname(e.target.value)}
          ></Input>
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setemail(e.target.value)}
          ></Input>
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>password</FormLabel>
          {/* Input group is used when there are to be more then one things for input */}
          {/* It basically has left and right elements */}
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter your password"
              onChange={(e) => setpassword(e.target.value)}
            ></Input>
            <InputRightElement width={"4.5rem"}>
              <Button
                h="2rem"
                size={"sm"}
                onClick={() => {
                  show === true ? setshow(false) : setshow(true);
                }}
              >
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
  
        <FormControl id="password" isRequired>
          <FormLabel>confirm password</FormLabel>
          {/* Input group is used when there are to be more then one things for input */}
          {/* It basically has left and right elements */}
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter your password"
              onChange={(e) => setconfirmpassword(e.target.value)}
            ></Input>
            <InputRightElement width={"4.5rem"}>
              <Button
                h="2rem"
                size={"sm"}
                onClick={() => {
                  show === true ? setshow(false) : setshow(true);
                }}
              >
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
  
  
        <FormControl id="Pic" isRequired>
          <FormLabel>Upload your picture</FormLabel>
          <Input
            type="file"
            p={1.5}
            accept="image/*"
            placeholder="Upload your pic"
            onChange={(e) =>postdetails(e.target.files[0])}
          ></Input>
        </FormControl>
        <Button
        colorScheme={'blue'}
        width="100%"
        style={{marginTop:15}}
        onClick={()=>SubmitHandler()}
        >Sign up</Button>
      </VStack>
    );
  };
  
  export default Signup;
  