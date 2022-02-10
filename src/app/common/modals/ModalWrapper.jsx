import {useDispatch} from "react-redux";
import {Modal, ModalContent, ModalHeader} from "semantic-ui-react";
import {closeModal} from "./modalReducer";

export default function ModalWrapper({onClose, children, size, header}) {
  const dispatch = useDispatch();
  console.log(onClose);

  function modalClose() {
    if (onClose !== undefined) {
      onClose();
    } else {
      console.log("hitDispatch");
      dispatch(closeModal());
    }
  }

  return (
    <Modal open={true} onClose={modalClose} size={size}>
      {header && <ModalHeader>{header}</ModalHeader>}
      <ModalContent>{children}</ModalContent>
    </Modal>
  );
}
