import {
  LISTEN_TO_CURRENT_USER_PROFILE,
  LISTEN_TO_PROFILE_LISTINGS,
} from "./profileConstants";

export function listenToCurrentUserProfile(profile) {
  return {
    type: LISTEN_TO_CURRENT_USER_PROFILE,
    payload: profile,
  };
}

export function listenToProfileListings(listings) {
  return {
    type: LISTEN_TO_PROFILE_LISTINGS,
    payload: listings,
  };
}
