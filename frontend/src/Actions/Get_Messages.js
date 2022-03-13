import axios from "axios";
import {
  GET_ALL_MESSAGES_FAIL,
  GET_ALL_MESSAGES_REQUEST,
  GET_ALL_MESSAGES_SUCCESS,
} from "../Constants/MessagesConstants";

export const GetMessages = (UserInfo, chatId) => async (dispatch) => {
  dispatch({ type: GET_ALL_MESSAGES_REQUEST });
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${UserInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/message/${chatId}`, config);
    dispatch({type:GET_ALL_MESSAGES_SUCCESS,payload:data})
  } catch (e) {
    dispatch({ type: GET_ALL_MESSAGES_FAIL, payload: e });
  }
};
