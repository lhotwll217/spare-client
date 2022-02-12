import {useDispatch} from "react-redux";
import {Modal, ModalContent, ModalHeader} from "semantic-ui-react";
import {closeModal} from "./modalReducer";

export default function ModalWrapper({
  onClose,
  children,
  marginTop = 0,
  size,
  header,
  width = "90%",
}) {
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
    <Modal
      style={{width: width, marginTop: marginTop}}
      open={true}
      onClose={modalClose}
      size='small'
    >
      {header && <ModalHeader>{header}</ModalHeader>}
      <ModalContent>{children}</ModalContent>
    </Modal>
  );
}
