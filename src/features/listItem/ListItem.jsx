import {
  Header,
  Item,
  ItemContent,
  ItemDescription,
  ItemExtra,
  ItemHeader,
  ItemMeta,
  Segment,
  SegmentGroup,
} from "semantic-ui-react";

export default function ListItem() {
  return (
    <Segment>
      <Item.Group>
        <ItemContent>
          <Header as='h3' content='What' />
        </ItemContent>
        <ItemContent>
          <Header as='h5' content='Nearest Town' />
        </ItemContent>
      </Item.Group>
      <Item.Group>
        <ItemContent>
          <Header sub={true} content='List Details' />
        </ItemContent>
        <ItemContent>
          Details for the item and maybe even a picture?
        </ItemContent>
        <Item.Image
          size={"tiny"}
          src='https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg'
        />
      </Item.Group>
      <Item.Group>
        <ItemContent>
          <Header sub={true} content='Looking for...' />
        </ItemContent>
        <ItemContent>
          Details for the item and maybe even a picture?
        </ItemContent>
      </Item.Group>
      <Item.Group>
        <ItemContent>
          <Header sub={true} content='Time window...' />
        </ItemContent>
        <ItemContent textAlign='center'>Oct 27th - Nov, 8th</ItemContent>
      </Item.Group>
    </Segment>
  );
}
