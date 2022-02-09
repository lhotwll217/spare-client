import {Feed} from "semantic-ui-react";
import {formatDistanceToNow} from "date-fns";
export default function FeedItem({item}) {
  const {title, lister, listDetails, created_at} = item;

  return (
    <Feed.Event>
      <Feed.Label
        image='https://ballstatepbs.org/wp-content/uploads/2019/07/generic-female-profile-picture-8.jpg'
        content={lister.displayName}
      />
      <Feed.Content>
        <Feed.Summary>
          {title}
          <Feed.Date>
            {created_at !== undefined &&
              formatDistanceToNow(created_at, {addSuffix: true})}
          </Feed.Date>
        </Feed.Summary>
        <Feed.Extra text>{listDetails}</Feed.Extra>
      </Feed.Content>
    </Feed.Event>
  );
}
