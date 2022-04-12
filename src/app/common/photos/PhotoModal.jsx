import {Image} from "semantic-ui-react";
import ModalWrapper from "../modals/ModalWrapper";

export default function PhotoModal({photo}) {
  return (
    <ModalWrapper>
      <Image size='medium' src={photo} />
    </ModalWrapper>
  );
}
