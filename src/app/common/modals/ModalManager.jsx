import {useSelector} from "react-redux";
import LoginForm from "../../../features/auth/LoginForm";
import SignUpForm from "../../../features/auth/SignUpForm";
import ErrorComponent from "../../../features/errors/ErrorComponent";
import TestModal from "../../../features/sandbox/TestModal";

export default function ModalManager() {
  const modalLookup = {
    TestModal,
    LoginForm,
    SignUpForm,
    ErrorComponent,
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
