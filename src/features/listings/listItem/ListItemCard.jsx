import {Header, Item, ItemContent, Segment} from "semantic-ui-react";
import {format} from "date-fns";

export default function ListItemCard({item, setViewPhoto}) {
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

        {item.pictures &&
          item.pictures.map((pic) => {
            return (
              <Item.Image
                onClick={() => setViewPhoto(pic)}
                key={pic}
                size='tiny
            '
                src={pic}
              />
            );
          })}
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
