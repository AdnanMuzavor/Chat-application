const {
  SET_CURRENT_CHAT_REQUEST,
  SET_CURRENT_CHAT_SUCCESS,
  SET_CURRENT_CHAT_FAIL,
} = require("../Constants/ChatConstants");

export const ChatReducers = (
  state = { loading: false, error: "", CurrChat: {} },
  action
) => {
  switch (action.type) {
    case SET_CURRENT_CHAT_REQUEST:
      return { ...state, loading: true };
    case SET_CURRENT_CHAT_SUCCESS:
      return { ...state, loading: false, CurrChat: action.payload };
    case SET_CURRENT_CHAT_FAIL:
      return { ...state, loading: false, CurrChat: {}, error: action.payload };
    default:
      return state;
  }
};
