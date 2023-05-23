import { createContext, useReducer } from "react";
import {
	AUTH_CLEAR,
	AUTH_LOGOUT,
	AUTH_REQUEST,
	AUTH_REQUEST_FINISHED,
	AUTH_SAVE_USER,
} from "../constants/AuthConstants";
import {
	RESUME_CLEAR_DATA,
	RESUME_STORE_COLOR,
	RESUME_STORE_DATA,
	RESUME_STORE_TEMPLATE,
} from "../constants/ResumeConstants";

const initialAppState = {
	user: {},
	resume: {},
};

const reducer = (state, action) => {
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

		case RESUME_STORE_DATA: {
			return {
				...state,
				resumeData: action.payload,
			};
		}
		case RESUME_STORE_TEMPLATE: {
			return {
				...state,
				template: action.payload,
			};
		}

		case RESUME_STORE_COLOR: {
			return {
				...state,
				color: action.payload,
			};
		}

		case RESUME_CLEAR_DATA: {
			return {
				...state,
				template: null,
				resumeData: null
			};
		}
		default:
			return state;
	}
};

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialAppState);

	const storeResumeData = (data) => {
		dispatch({
			type: RESUME_STORE_DATA,
			payload: data,
		});
	};
	const storeResumeTemplate = (data) => {
		dispatch({
			type: RESUME_STORE_TEMPLATE,
			payload: data,
		});
	};
	const storeResumeColor = (data) => {
		dispatch({
			type: RESUME_STORE_COLOR,
			payload: data,
		});
	};

	const storeUser = (user) => {
		if (user.token) {
			window.localStorage.setItem("userToken", user.token);
		}
		dispatch({
			type: AUTH_SAVE_USER,
			payload: user,
		});
	};
	const clearUser = (user) => {
		dispatch({
			type: AUTH_CLEAR,
		});
	};
	const logoutUser = () => {
		if (window.localStorage.getItem("userToken")) {
			window.localStorage.removeItem("userToken");
		}
		dispatch({
			type: AUTH_LOGOUT,
		});
	};

	const authRequest = () => {
		dispatch({
			type: AUTH_REQUEST,
		});
	};
	const authRequestFinished = () => {
		dispatch({
			type: AUTH_REQUEST_FINISHED,
		});
	};

	return (
		<AppContext.Provider
			value={{
				state,
				actions: {
					storeResumeData,
					storeResumeTemplate,
					storeResumeColor,
					storeUser,
					clearUser,
					logoutUser,
					authRequest,
					authRequestFinished,
				},
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
