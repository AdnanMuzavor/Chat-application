import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
const Chatpage = () => {
  //To take care of all chat messages
  const [chats, setchats] = useState([]);
  const fetchchat = async () => {
    const { data } = await axios.get("/api/chats");
    setchats(data);
    console.log(data);
  };
  useEffect(() => {
    fetchchat();
  }, []);
  return (
    <>
      <div className="col-md-6 col-lg-6 col-12">
        <div className="container">
          {chats.map((e) => {
            return <div key={e._id}>{e.chatName}</div>;
          })}
        </div>
      </div>
    </>
  );
};

export default Chatpage;
