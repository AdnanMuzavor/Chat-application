import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddnewUserToGrp } from "../../Actions/Add_New_User";
import { LeaveGroup } from "../../Actions/Current_Chat";
import {GetMessages} from "../../Actions/Get_Messages";
import { RemoveUserFmGrp } from "../../Actions/Remove_User_from_group";
import { RenameGroup } from "../../Actions/Update_Grp_Chat_name";
import Search_loading from "../Loadingcomponents/search_results_loading";
import ProfileModal from "../SmallComponents/ProfileModal";
import SearchResultMiniCard from "../SmallComponents/SearchResultMiniCard";
const ChatBox = () => {
  const toast = useToast();

  //Getting dispatch
  const dispatch = useDispatch();

  //Getting state of user
  const UserDetails = useSelector((state) => state.UserDetails);
  const { loading: userloading, UserInfo, error: usererror } = UserDetails;

  //Current message which user types
  const [message, setmessage] = useState("");

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
      const { data } = await axios.get("/api/chat/", config);
      console.log("data of chat");
      console.log(data);
    } catch (e) {}
  };
  //Calling fetch chat usimg useeffect
  useEffect(() => {
    fetchChat();
    //Fetching messages of chat as soon as chat loads
    dispatch(GetMessages(UserInfo,CurrChat._id))
  }, []);

  //For toggling model
  const [modal, setmodal] = useState(false);

  //For searching user
  const [search, setsearch] = useState("");

  //To keep API result returned by /search api
  const [searchresult, setsearchresult] = useState([]);

  //While search is loading
  const [searchloading, setsearchloading] = useState(false);

  //New group name
  const [newgrpname, setnewgrpname] = useState("");

  //Search handling functions
  const SearchHandler = async (e, search) => {
    // alert("search aclled")
    e.preventDefault();

    if (!search) {
      toast({
        title: "Please enter something in search",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    try {
      setsearchloading(true);
      //sending token
      const config = {
        headers: {
          Authorization: `Bearer ${UserInfo.token}`,
        },
      };
      console.log(config);
      //Getting search users
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      console.log(data);
      //Setting serach result array
      setsearchresult(data);
      console.log(data);
      setsearchloading(false);
      console.log(config);
    } catch (e) {
      console.log(e);
      toast({
        title: "Error occured(search)",
        description: "Fail to load serach result",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
  };

  //Add new user into group
  const UpdateName = async (e) => {
    e.preventDefault();

    const chatId = CurrChat._id;
    const chatName = newgrpname;

    dispatch(RenameGroup(UserInfo, chatId, chatName));

    setnewgrpname("");
  };

  //Add new user into group
  const AddnewUser = async (newUserId) => {
    const chatId = CurrChat._id;

    dispatch(AddnewUserToGrp(UserInfo, newUserId, chatId));
  };

  //Function to remove user from group
  const RemoveUser = async (userId) => {
    // CurrChat.filter((e)=>e._id===userId)
    const chatId = CurrChat._id;
    const config = {
      headers: {
        Authorization: `Bearer ${UserInfo.token}`,
      },
    };

    const { data } = await axios.put(
      "/api/chat/groupremove",
      { chatId, userId },
      config
    );
    console.log(data);

    //If admin is leaving group
    dispatch(RemoveUserFmGrp(data));
    if (userId === UserInfo._id) {
      dispatch(LeaveGroup());
    }
  };





  //REDUX PART FOR HANDLING MESSAGES
   const MessageDetails=useSelector((state)=>state.MessageDetails);
   const {messageloading,Messages,error:messageerror}=MessageDetails;

  //Remove user from group handler
  return chatloading ? (
    <Search_loading />
  ) : CurrChat.chatName ? (
    <>
      {/* Modal for cretaing group chat */}
      <div className="row center">
        <div
          className={`modal2 col-md-3 col-lg-3 col-10 ${
            modal ? "vis" : "nonvis"
          }`}
        >
          <div className="closeicon" onClick={(e) => setmodal(!modal)}>
            X
          </div>
          <div className="modalbody">
            {/*Displaying chat name based of chat type */}
            <h1>
              {CurrChat.isGroupChat
                ? CurrChat.chatName
                : CurrChat.users[1].name}
            </h1>
            {/* Searching users directly with help of API */}

            {/* List of users selected */}
            <div className="selected d-flex justify-content-center">
              <div className="row">
                {/*If group chat displaying users */}
                {CurrChat.isGroupChat
                  ? CurrChat.users.map((e) => {
                      return e._id !== UserInfo._id ? (
                        <>
                          <div
                            className="users2 col-md-6 col-lg-6 col-6"
                            key={e._id}
                          >
                            <h6>{e.name.toUpperCase()}</h6>
                            <h1
                              className="closeicon2"
                              onClick={(et) => {
                                RemoveUser(e._id);
                              }}
                            >
                              X
                            </h1>
                          </div>
                        </>
                      ) : null;
                    })
                  : null}
              </div>
            </div>

            {CurrChat.isGroupChat ? (
              <>
                <div className="inputs">
                  {/*Update group chat section */}
                  {/* Taking new group chat  name */}
                  <div className="newnamewrap">
                    <input
                      type="text"
                      placeholder="Enter group  name"
                      className="groupname"
                      value={newgrpname}
                      onChange={(e) => setnewgrpname(e.target.value)}
                    />
                    <button onClick={UpdateName}>update</button>
                  </div>
                  {/* Searching users directly with help of API */}
                  <input
                    type="text"
                    placeholder="Enter Users"
                    className="users"
                    onChange={(e) => {
                      setsearch(e.target.value);
                      SearchHandler(e, e.target.value);
                    }}
                  />
                </div>
                {search !== "" ? (
                  <div className="container">
                    <h5 className="text-center mb-4">Search Results</h5>
                    {searchresult.length >= 1 ? (
                      <div className="row d-flex justify-content-center">
                        {searchloading ? (
                          <Search_loading />
                        ) : (
                          searchresult.map((e) => {
                            return e._id !== UserInfo._id &&
                              !CurrChat.users.find(
                                (ele) => ele._id === e._id
                              ) ? (
                              <>
                                <SearchResultMiniCard
                                  key={e._id}
                                  name={e.name}
                                  pic={e.pic}
                                  Add={() => AddnewUser(e._id)}
                                />
                              </>
                            ) : null;
                          })
                        )}
                      </div>
                    ) : null}
                  </div>
                ) : null}

                <button
                  className="exit "
                  onClick={() => RemoveUser(UserInfo._id)}
                >
                  Exit Group
                </button>
              </>
            ) : (
              <>
                <div className="name">
                  <div className="modal-body mx-auto">
                    <img
                      src={CurrChat.users[1].pic}
                      className="rounded-circle profile"
                      alt="Avatar"
                    />
                    <h4 className="text-center mt-2 mb-2">
                      {" "}
                      {CurrChat.users[1].email}
                    </h4>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* The main chat box */}
      <div className={`container chatmainbox ${chatloading ? "center" : ""}`}>
        {chatloading ? (
          <Search_loading />
        ) : (
          <div className="row chatwrap">
            {CurrChat.chatName ? (
              <>
                <div className="chattext">
                  <h2>
                    {CurrChat
                      ? !CurrChat.isGroupChat
                        ? CurrChat.users[1].name
                        : CurrChat.chatName
                      : "Sender's name"}
                  </h2>
                  <div className="iconwrap" onClick={() => setmodal(!modal)}>
                    <i class="fa fa-eye" aria-hidden="true"></i>
                  </div>
                </div>
                <div className="col-md-12 col-lg-12 col-12 ">
                  <div className="messagebox"></div>
                  <div className="textbox">
                    <input
                      type="text"
                      name="message"
                      onChange={(e) => setmessage(e.target.value)}
                      placeholder="Enter Your Message"
                    ></input>
                    <button className="sendbtn">send</button>
                  </div>
                </div>
              </>
            ) : (
              <h1>Select chat from group chats</h1>
            )}
          </div>
        )}
      </div>
    </>
  ) : (
    <h1>No chat is being selected</h1>
  );
};

export default ChatBox;
