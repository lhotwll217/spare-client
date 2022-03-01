import {
  Item,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemImage,
  ItemMeta,
} from "semantic-ui-react";
import ModalWrapper from "../../app/common/modals/ModalWrapper";

export default function MessageModal({message}) {
  return (
    <ModalWrapper>
      <Item>
        <ItemImage
          size='tiny'
          src='https://react.semantic-ui.com/images/wireframe/image.png'
        />
        <ItemContent>
          <ItemMeta content='sentBy' />
          <ItemHeader content='message.listing.title' />
          <ItemDescription content='message.text' />
          <ItemMeta content='sent time ago' />
        </ItemContent>
      </Item>
    </ModalWrapper>
  );
}
