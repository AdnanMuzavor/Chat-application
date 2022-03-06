const {
  SET_CURRENT_CHAT_REQUEST,
  SET_CURRENT_CHAT_SUCCESS,
  SET_CURRENT_CHAT_FAIL,
  SET_SELECTED_CHAT_REQUEST,
  SET_SELECTED_CHAT_SUCCESS,
} = require("../Constants/ChatConstants");

export const ChatReducers = (
  state = { loading: false, error: "", CurrChat: {}, SelectedChat: {} },
  action
) => {
  switch (action.type) {
    case SET_CURRENT_CHAT_REQUEST:
      return { ...state, chatloading: true };
    case SET_CURRENT_CHAT_SUCCESS:
      return { ...state, chatloading: false, CurrChat: action.payload };
    case SET_CURRENT_CHAT_FAIL:
      return { ...state, chatloading: false, CurrChat: {}, error: action.payload };
    // case SET_SELECTED_CHAT_REQUEST:
    //   return { ...state, selectedchatload: true };
    // case SET_SELECTED_CHAT_SUCCESS:
    //   return {
    //     ...state,
    //     selectedchatload: false,
    //     SelectedChat: action.payload,
    //   };
    default:
      return state;
  }
};
