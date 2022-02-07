import {FETCH_LISTINGS} from "./listingsConstants";

export function listenToListings(payload) {
  return {
    type: FETCH_LISTINGS,
    payload: payload,
  };
}
