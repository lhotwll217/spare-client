import {onValue} from "firebase/database";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {Dropdown, DropdownItem, DropdownMenu} from "semantic-ui-react";
import {
  firebaseMessageQuery,
  firebaseObjectToArray,
  getMessages,
  listenToMessages,
} from "../../app/firebase/firebaseService";
const friendOptions = [
  {
    key: "Jenny Hess",
    text: "Jenny Hess",
    value: "Jenny Hess",
    image: {
      avatar: true,
      src: "https://react.semantic-ui.com/images/avatar/small/jenny.jpg",
    },
  },
  {
    key: "Elliot Fu",
    text: "Elliot Fu",
    value: "Elliot Fu",
    image: {
      avatar: true,
      src: "https://react.semantic-ui.com/images/avatar/small/elliot.jpg",
    },
  },
  {
    key: "Stevie Feliciano",
    text: "Stevie Feliciano",
    value: "Stevie Feliciano",
    image: {
      avatar: true,
      src: "https://react.semantic-ui.com/images/avatar/small/stevie.jpg",
    },
  },
];
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
        {messages?.map((e) => {
          return (
            <DropdownItem
              image={e.sentBy.photoURL}
              label={e.listing.title}
              description={`Sent by ${e.sentBy.displayName}`}
            />
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
}
