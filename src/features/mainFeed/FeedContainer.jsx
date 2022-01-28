import {Feed, Grid} from "semantic-ui-react";
import FeedItem from "./FeedItem";

export default function FeedContainer() {
  return (
    <Grid centered>
      <Grid.Column width={10}>
        <Feed>
          <FeedItem />
          <FeedItem />
          <FeedItem />
          <FeedItem />
          <FeedItem />
        </Feed>
      </Grid.Column>
    </Grid>
  );
}
