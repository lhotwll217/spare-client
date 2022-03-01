import {
  Button,
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemImage,
  ItemMeta,
} from "semantic-ui-react";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import {formatDistanceToNow} from "date-fns";

export default function MessageModal({message}) {
  return (
    <ModalWrapper>
      <ItemGroup>
        <Item>
          <ItemImage circular size='tiny' src={message.sentBy.photoURL} />

          <ItemContent>
            <ItemHeader content={message.listing.title} />
            <ItemDescription content={message.text} />
            <ItemMeta
              content={`Sent by ${
                message.sentBy.displayName
              } ${formatDistanceToNow(message.date, {addSuffix: true})}`}
            />
            <Button content='Reply' size='small' color='teal' />
          </ItemContent>
        </Item>
      </ItemGroup>
    </ModalWrapper>
  );
}
