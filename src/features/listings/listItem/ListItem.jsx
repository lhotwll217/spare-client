import {Header, Item, ItemContent, Segment} from "semantic-ui-react";
import {format} from "date-fns";

export default function ListItem({item}) {
  return (
    <Segment>
      <Item.Group>
        <ItemContent>
          <Header as='h3' content={item.title} />
        </ItemContent>
        <ItemContent>
          <Header as='h5' content={item.location.address} />
        </ItemContent>
      </Item.Group>
      <Item.Group>
        <ItemContent>
          <Header sub={true} content='List Details' />
        </ItemContent>
        <ItemContent>{item.listDetails}</ItemContent>
        <Item.Image
          size={"tiny"}
          src='https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg'
        />
      </Item.Group>
      <Item.Group>
        <ItemContent>
          <Header sub={true} content='Looking for...' />
        </ItemContent>
        <ItemContent>{item.tradeDetails}</ItemContent>
      </Item.Group>
      <Item.Group>
        <ItemContent>
          <Header sub={true} content='Time window...' />
        </ItemContent>
        <ItemContent>
          {format(item.availStart, "LLLL do")} -{" "}
          {format(item.availEnd, "LLLL do")}
        </ItemContent>
      </Item.Group>
    </Segment>
  );
}
