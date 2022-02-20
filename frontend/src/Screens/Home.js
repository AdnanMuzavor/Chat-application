import React from "react";
import Chatlist from "./Chatlist";
import Chatpage from "./ChatPage";

const Homepage = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          {/* chat list component */}
          <Chatlist />
          {/*Chat component */}
          <Chatpage />
        </div>
      </div>
    </>
  );
};

export default Homepage;
