import {
  LISTEN_TO_CURRENT_USER_PROFILE,
  LISTEN_TO_PROFILE_LISTINGS,
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
    default:
      return {...state};
  }
}
