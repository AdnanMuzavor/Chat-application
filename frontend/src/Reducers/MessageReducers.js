import { STATES } from "mongoose";
import {
  GET_ALL_MESSAGES_FAIL,
  GET_ALL_MESSAGES_REQUEST,
  GET_ALL_MESSAGES_SUCCESS,
} from "../Constants/MessagesConstants";

export const MessageReducer = (
  state = { messageloading: false, Messages: [], message: {}, error: "" },
  action
) => {
  switch (action.type) {
    case GET_ALL_MESSAGES_REQUEST:
      return { ...state, messageloading: true };
    case GET_ALL_MESSAGES_SUCCESS:
      return { ...state, messageloading: false, Messages: action.payload };
    case GET_ALL_MESSAGES_FAIL:
      return { ...state, messageloading: true, error: action.payload };
    default:
      return state;
  }
};
