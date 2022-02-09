import {Feed, Icon} from "semantic-ui-react";

export default function FeedItem({item}) {
  const {title, lister, listDetails} = item;
  console.log(item);
  return (
    <Feed.Event>
      <Feed.Label
        image='https://ballstatepbs.org/wp-content/uploads/2019/07/generic-female-profile-picture-8.jpg'
        content={lister.displayName}
      />
      <Feed.Content>
        <Feed.Summary>
          {title}
          <Feed.Date>3 days ago</Feed.Date>
        </Feed.Summary>
        <Feed.Extra text>{listDetails}</Feed.Extra>
      </Feed.Content>
    </Feed.Event>
  );
}
