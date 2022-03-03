import axios from "axios";
import {
  SET_CURRENT_CHAT_FAIL,
  SET_CURRENT_CHAT_REQUEST,
  SET_CURRENT_CHAT_SUCCESS,
} from "../Constants/ChatConstants";

export const setCurrChatVal = (userid, UserInfo) => async (dispatch) => {
  dispatch({ type: SET_CURRENT_CHAT_REQUEST });
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${UserInfo.token}`,
      },
    };
    console.log("config is: ");
    console.log(config);
    const { data } = await axios.post("/api/chat/", { userid }, config);
    if (data) {
      dispatch({ type: SET_CURRENT_CHAT_SUCCESS, payload: data });
    } else {
      dispatch({
        type: SET_CURRENT_CHAT_FAIL,
        payload: "Fail to create chat with user",
      });
    }
  } catch (e) {
    console.log(e);
  }
};
