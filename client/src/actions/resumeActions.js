import {
  RESUME_STORE_COLOR,
  RESUME_STORE_DATA,
  RESUME_STORE_TEMPLATE,
} from "../constants/ResumeConstants";

export const storeResumeData = (data) => {
  return {
    type: RESUME_STORE_DATA,
    payload: data,
  };
};
export const storeResumeTemplate = (data) => {
  return {
    type: RESUME_STORE_TEMPLATE,
    payload: data,
  };
};
export const storeResumeColor = (data) => {
  return {
    type: RESUME_STORE_COLOR,
    payload: data,
  };
};
