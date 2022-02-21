import {
  LISTEN_TO_CURRENT_USER_PROFILE,
  LISTEN_TO_PROFILE_LISTINGS,
  PROFILE_LOG_OUT,
} from "./profileConstants";

const initialState = {
  currentUserProfile: null,
  listings: [],
};

export default function profileReducer(state = initialState, {type, payload}) {
  switch (type) {
    case LISTEN_TO_CURRENT_USER_PROFILE:
      return {
        ...state,
        currentUserProfile: payload,
      };
    case LISTEN_TO_PROFILE_LISTINGS:
      return {
        ...state,
        listings: payload,
      };
    case PROFILE_LOG_OUT:
      return {
        ...state,
        currentUserProfile: null,
      };
    default:
      return {...state};
  }
}
