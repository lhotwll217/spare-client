import {useSelector} from "react-redux";
import LoginForm from "../../../features/auth/LoginForm";
import SignUpForm from "../../../features/auth/SignUpForm";
import ErrorComponent from "../../../features/errors/ErrorComponent";
import ListItemModal from "../../../features/listings/listItem/ListItemModal";
import TestModal from "../../../features/sandbox/TestModal";
import EditFormModal from "../../../features/listings/listForm/EditFormModal";
import MessageModal from "../../../features/messages/MessageModal";
import PhotoModal from "../photos/PhotoModal";

export default function ModalManager() {
  const modalLookup = {
    TestModal,
    LoginForm,
    SignUpForm,
    ErrorComponent,
    ListItemModal,
    EditFormModal,
    MessageModal,
    PhotoModal,
  };
  const currentModal = useSelector((state) => state.modals);
  let renderedModal;
  if (currentModal) {
    const {modalType, modalProps} = currentModal;
    const ModalComponent = modalLookup[modalType];
    renderedModal = <ModalComponent {...modalProps} />;
  }

  return <span>{renderedModal}</span>;
}
