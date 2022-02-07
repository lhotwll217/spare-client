import {FETCH_LISTINGS} from "./listingsConstants";

const initialState = {listings: []};

export default function listingsReducer(state = initialState, {type, payload}) {
  switch (type) {
    case FETCH_LISTINGS:
      return {
        ...state,
        listings: [...state.listings, payload],
      };
    default:
      return state;
  }
}
