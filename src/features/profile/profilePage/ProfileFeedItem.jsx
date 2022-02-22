import {Button, Feed} from "semantic-ui-react";
import {formatDistanceToNow} from "date-fns";
import {useDispatch} from "react-redux";
import {openModal} from "../../../app/common/modals/modalReducer";
import {deleteListing} from "../../../app/firebase/firestoreService";
export default function ProfileFeedItem({item}) {
  const {title, lister, listDetails, created_at, id} = item;
  const dispatch = useDispatch();

  function feedOnClick() {
    dispatch(openModal({modalType: "ListItemModal", modalProps: {item: item}}));
  }

  function openEditModal() {
    dispatch(openModal({modalType: "EditFormModal", modalProps: {item: item}}));
  }
  return (
    <Feed.Event>
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
            onClick={async () => {
              try {
                await deleteListing(id);
              } catch (error) {
                console.log(error);
              }
            }}
            floated='right'
            content='DELETE'
            size='tiny'
            color='red'
          />
          <Button
            onClick={() => openEditModal()}
            content='EDIT'
            style={{padding: 5}}
            floated='right'
            size='tiny'
          />
          <Button
            onClick={() => feedOnClick()}
            style={{padding: 5}}
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
