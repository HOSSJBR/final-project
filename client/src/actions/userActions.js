import {
  AUTH_CLEAR,
  AUTH_LOGOUT,
  AUTH_REQUEST,
  AUTH_REQUEST_FINISHED,
  AUTH_SAVE_USER,
} from "../constants/AuthConstants";

export const storeUser = (user) => {
  if (user.token) {
    window.localStorage.setItem("userToken", user.token);
  }
  return {
    type: AUTH_SAVE_USER,
    payload: user,
  };
};
export const clearUser = (user) => {
  return {
    type: AUTH_CLEAR,
  };
};
export const logoutUser = () => {
  if (window.localStorage.getItem("userToken")) {
    window.localStorage.removeItem("userToken");
  }
  return {
    type: AUTH_LOGOUT,
  };
};

export const authRequest = () => {
  return {
    type: AUTH_REQUEST,
  };
};
export const authRequestFinished = () => {
  return {
    type: AUTH_REQUEST_FINISHED,
  };
};
