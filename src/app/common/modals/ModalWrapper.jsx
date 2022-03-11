import {useDispatch} from "react-redux";
import {Button, Modal, ModalContent, ModalHeader} from "semantic-ui-react";
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
      <Button content='x' className='modal-btn' floated='right' color='red' />
      {header && <ModalHeader>{header}</ModalHeader>}
      <ModalContent>{children}</ModalContent>
    </Modal>
  );
}
