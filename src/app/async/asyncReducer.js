const ASYNC_ACTION_START = "ASYNC_ACTION_START";
const ASYNC_ACTION_FINISH = "ASYNC_ACTION_FINISH";
const ASYNC_ACTION_ERROR = "ASYNC_ACTION_ERROR";
export const INITIALIZE_APP = "INITIALIZE_APP";

export function asyncActionStart() {
  return {
    type: ASYNC_ACTION_START,
  };
}
export function asyncActionFinish() {
  return {
    type: ASYNC_ACTION_FINISH,
  };
}
export function asyncActionError(error) {
  return {
    type: ASYNC_ACTION_ERROR,
    payload: error,
  };
}

const initialState = {
  loading: false,
  error: null,
  initialized: false,
};

export default function asyncReducer(state = initialState, {type, payload}) {
  switch (type) {
    case ASYNC_ACTION_START:
      return {
        ...state,
        loading: true,
      };
    case ASYNC_ACTION_FINISH:
      return {
        ...state,
        loading: false,
      };
    case ASYNC_ACTION_ERROR:
      return {
        ...state,
        error: payload,
      };
    case INITIALIZE_APP:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
}
