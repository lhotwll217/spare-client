import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {Message} from "semantic-ui-react";
import {asyncActionError} from "../../app/async/asyncReducer";
import {closeModal} from "../../app/common/modals/modalReducer";
import ModalWrapper from "../../app/common/modals/ModalWrapper";

export default function ErrorComponent() {
  const {error} = useSelector((state) => state.async);
  const dispatch = useDispatch();
  function errorOnClose() {
    dispatch(closeModal());
    dispatch(asyncActionError(null));
  }

  return (
    <ModalWrapper onClose={errorOnClose} header='Error!'>
      <Message>{error.message}</Message>
    </ModalWrapper>
  );
}
