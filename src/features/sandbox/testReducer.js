import {
  asyncActionFinish,
  asyncActionStart,
} from "../../app/async/asyncReducer";
import {delay} from "../../app/common/util/util";

export const INCREMENT_COUNTER = "INCREMENT_COUNTER";
export const DECREMENT_COUNTER = "DECREMENT_COUNTER";

export function increment(amount) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await delay(1000);
    dispatch({type: INCREMENT_COUNTER, payload: amount});
    dispatch(asyncActionFinish());
  };
}
export function decrement(amount) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    await delay(1000);
    dispatch({type: DECREMENT_COUNTER, payload: amount});
    dispatch(asyncActionFinish());
  };
}

const initialState = {
  data: 42,
};

export default function testReducer(state = initialState, {type, payload}) {
  switch (type) {
    case INCREMENT_COUNTER:
      return {
        ...state,
        data: state.data + payload,
      };
    case DECREMENT_COUNTER:
      return {
        ...state,
        data: state.data - payload,
      };
    default:
      return state;
  }
}
