const LISTEN_TO_MESSAGES = "LISTEN_TO_MESSAGES";

const initialState = {
  messages: [],
};

export function messagesReducer(state = initialState, {type, payload}) {
  switch (type) {
    case LISTEN_TO_MESSAGES:
      return {
        ...state,
        messages: payload,
      };
    default:
      return state;
  }
}
