import {onValue} from "firebase/database";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {Dropdown, DropdownItem, DropdownMenu} from "semantic-ui-react";
import {
  firebaseMessageQuery,
  firebaseObjectToArray,
} from "../../app/firebase/firebaseService";

export default function ChatDropdown() {
  const dispatch = useDispatch();
  const {messages} = useSelector((state) => state.messages);

  console.log(messages);

  useEffect(() => {
    const unsubscribe = onValue(firebaseMessageQuery(), (snapshot) => {
      dispatch({
        type: "LISTEN_TO_MESSAGES",
        payload: firebaseObjectToArray(snapshot.val()),
      });
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <Dropdown text='Messages'>
      <DropdownMenu>
        {messages?.length > 0 ? (
          messages?.map((e) => {
            return (
              <DropdownItem
                image={e.sentBy.photoURL}
                label={e.listing.title}
                description={`Sent by ${e.sentBy.displayName}`}
              />
            );
          })
        ) : (
          <DropdownItem content='No Messages' />
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
