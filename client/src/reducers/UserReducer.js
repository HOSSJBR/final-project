import {
  AUTH_CLEAR,
  AUTH_LOGOUT,
  AUTH_REQUEST,
  AUTH_REQUEST_FINISHED,
  AUTH_SAVE_USER,
} from "../constants/AuthConstants";

export const UserReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case AUTH_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case AUTH_REQUEST_FINISHED: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case AUTH_SAVE_USER: {
      return {
        ...state,
        user: action.payload,
        userToken: action.payload.token,
        isAuth: true,
        isLoading: false,
      };
    }
    case AUTH_CLEAR:
    case AUTH_LOGOUT: {
      return {
        user: null,
        userToken: null,
        isAuth: false,
        isLoading: false,
      };
    }

    default:
      return state;
  }
};
