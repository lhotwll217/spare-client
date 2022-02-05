const OPEN_MODAL = "OPEN_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";

export function openModal(payload) {
  return {
    type: OPEN_MODAL,
    payload,
  };
}

export function closeModal(payload) {
  return {
    type: CLOSE_MODAL,
    payload,
  };
}

const initialState = null;

export default function modalReducer(state = initialState, {type, payload}) {
  switch (type) {
    case OPEN_MODAL:
      //Destructure to get Modal definitions from the dispatch
      const {modalType, modalProps} = payload;
      return {modalType, modalProps};
    case CLOSE_MODAL:
      return null;
    default:
      return state;
  }
}