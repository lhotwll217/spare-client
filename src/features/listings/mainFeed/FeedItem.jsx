import {Feed} from "semantic-ui-react";
import {formatDistanceToNow} from "date-fns";
import {useDispatch} from "react-redux";
import {openModal} from "../../../app/common/modals/modalReducer";
export default function FeedItem({item}) {
  const {title, lister, listDetails, created_at} = item;
  const dispatch = useDispatch();
  return (
    <Feed.Event
      onClick={() =>
        dispatch(openModal({modalType: "ListItemPage", modalProps: item}))
      }
    >
      <Feed.Label image={lister.photoURL} content={lister.displayName} />
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
