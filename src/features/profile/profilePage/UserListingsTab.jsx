import {Feed, Header} from "semantic-ui-react";

import ProfileFeedItem from "./ProfileFeedItem";

export default function UserListingsTab({listings}) {
  return (
    <>
      <Header subheader content='Listings' />
      <Feed>
        {listings &&
          listings.map((item) => {
            return <ProfileFeedItem key={item.id} item={item} />;
          })}
      </Feed>
    </>
  );
}
