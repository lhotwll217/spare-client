import {useDispatch} from "react-redux";
import {Modal, ModalContent, ModalHeader} from "semantic-ui-react";
import {closeModal} from "./modalReducer";

export default function ModalWrapper({onClose, children, size, header}) {
  const dispatch = useDispatch();
  return (
    <Modal
      open={true}
      onClose={() => {
        onClose() || dispatch(closeModal());
      }}
      size={size}
    >
      {header && <ModalHeader>{header}</ModalHeader>}
      <ModalContent>{children}</ModalContent>
    </Modal>
  );
}
