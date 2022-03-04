import {onValue} from "firebase/database";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {Dropdown, DropdownItem, DropdownMenu} from "semantic-ui-react";
import {
  firebaseMessageQuery,
  firebaseObjectToArray,
} from "../../app/firebase/firebaseService";
import {openModal} from "../../app/common/modals/modalReducer";

export default function ChatDropdown() {
  const dispatch = useDispatch();
  const {messages} = useSelector((state) => state.messages);

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
    <Dropdown pointing='top right' icon='mail'>
      <DropdownMenu>
        {messages?.length > 0 ? (
          messages?.map((message) => {
            return (
              <DropdownItem
                key={message.id}
                image={message.sentBy.photoURL}
                label={message.listing.title}
                description={`Sent by ${message.sentBy.displayName}`}
                onClick={() =>
                  dispatch(
                    openModal({
                      modalType: "MessageModal",
                      modalProps: {message: message},
                    })
                  )
                }
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
