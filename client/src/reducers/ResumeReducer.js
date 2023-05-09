import {
  RESUME_CLEAR_DATA,
  RESUME_STORE_COLOR,
  RESUME_STORE_DATA,
  RESUME_STORE_TEMPLATE,
} from "../constants/ResumeConstants";

export const ResumeReducer = (state = { template: "" }, action) => {
  switch (action.type) {
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
      return {};
    }
    default:
      return state;
  }
};
