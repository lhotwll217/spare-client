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

const initialState = {
  data: 42,
};

export default function testReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return {
        ...state,
        data: state.data + 1,
      };
    case DECREMENT_COUNTER:
      return {
        ...state,
        data: state.data - 1,
      };
    default:
      return state;
  }
}
