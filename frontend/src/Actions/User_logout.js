import {
  USER_LOGOUT_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
} from "../Constants/UserConstants";

const Userlogout = () => async (dispatch) => {
  dispatch({ type: USER_LOGOUT_REQUEST });
  try {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT_SUCCESS,payload:{} });
  } catch (e) {
    console.log(e);
    dispatch({ type: USER_LOGOUT_FAIL });
  }
};

export default Userlogout;
