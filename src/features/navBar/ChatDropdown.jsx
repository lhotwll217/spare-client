import {useEffect} from "react";
import {Dropdown} from "semantic-ui-react";
import {
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
  useEffect(() => {
    const unsubscribe = getMessages();

    return unsubscribe;
  });
  getMessages();
  return <Dropdown options={friendOptions} text='Messages'></Dropdown>;
}
