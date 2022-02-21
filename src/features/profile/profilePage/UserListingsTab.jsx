import {Feed, Header, Segment} from "semantic-ui-react";
import FeedItem from "../../listings/mainFeed/FeedItem";

export default function UserListingsTab({listings}) {
  return (
    <Segment>
      <Header subheader content='Listings' />
      <Feed>
        {listings &&
          listings.map((item) => {
            return <FeedItem key={item.id} item={item} />;
          })}
      </Feed>
    </Segment>
  );
}
