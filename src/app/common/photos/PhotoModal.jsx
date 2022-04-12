import {Image} from "semantic-ui-react";
import ModalWrapper from "../modals/ModalWrapper";

export default function PhotoModal({photo}) {
  return (
    <ModalWrapper marginTop={"-200px"}>
      <Image centered size='medium' src={photo} />
    </ModalWrapper>
  );
}
