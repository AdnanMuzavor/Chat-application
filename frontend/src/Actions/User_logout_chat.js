import {
    USER_LOGOUT_FAIL,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_SUCCESS_CHAT,
    USER_LOGOUT_SUCCESS_MESSAGE,
  } from "../Constants/UserConstants";
  
  const Userlogoutchat = () => async (dispatch) => {
    
    
      
     
      dispatch({ type: USER_LOGOUT_SUCCESS_CHAT });
   
  };
  
  export default Userlogoutchat;