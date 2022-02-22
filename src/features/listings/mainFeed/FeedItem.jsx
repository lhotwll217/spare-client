import {Button, Feed} from "semantic-ui-react";
import {formatDistanceToNow} from "date-fns";
import {useDispatch} from "react-redux";
import {openModal} from "../../../app/common/modals/modalReducer";
export default function FeedItem({item}) {
  const {title, lister, listDetails, created_at} = item;
  const dispatch = useDispatch();

  function feedOnClick() {
    dispatch(openModal({modalType: "ListItemModal", modalProps: {item: item}}));
  }
  return (
    <Feed.Event onClick={() => feedOnClick()} style={{cursor: "pointer"}}>
      <Feed.Label image={lister.photoURL} />
      <Feed.Content>
        <Feed.Summary>
          {title}
          <Feed.Date>
            {created_at !== undefined &&
              formatDistanceToNow(created_at, {addSuffix: true})}
          </Feed.Date>
          <Button
            style={{padding: 5}}
            onClick={() => feedOnClick()}
            floated='right'
            content='VIEW'
            size='tiny'
            color='teal'
          />
        </Feed.Summary>
        <Feed.Extra text>{listDetails}</Feed.Extra>
      </Feed.Content>
    </Feed.Event>
  );
}
