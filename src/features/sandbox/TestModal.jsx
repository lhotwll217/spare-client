import ModalWrapper from "../../app/common/modals/ModalWrapper";

export default function TestModal({data}) {
  return (
    <ModalWrapper size='mini' header='Test Modal'>
      <div> THe data is: {data}</div>
    </ModalWrapper>
  );
}
