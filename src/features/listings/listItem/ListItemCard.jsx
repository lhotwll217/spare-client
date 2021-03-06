import {
  Button,
  Header,
  Image,
  Item,
  ItemContent,
  Segment,
} from "semantic-ui-react";
import {format} from "date-fns";
import {useSelector} from "react-redux";
import {useState} from "react";

import ListItemMessageForm from "./ListItemMessageForm";

export default function ListItemCard({item, setViewPhoto}) {
  const {currentUser} = useSelector((state) => state.auth);
  const [message, setMessage] = useState(false);
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
              <Image
                style={{
                  margin: "5px",
                  borderRadius: "5px",
                  height: "60px",
                  objectFit: "cover",
                }}
                onClick={() => setViewPhoto(pic)}
                key={pic}
                size='tiny'
                src={pic}
                inline={true}
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

      {message && (
        <>
          <ListItemMessageForm setMessage={setMessage} item={item} />
        </>
      )}
      {item.lister.uid !== currentUser?.uid && !message && (
        <Button content='Message' onClick={() => setMessage(true)} />
      )}
    </Segment>
  );
}
