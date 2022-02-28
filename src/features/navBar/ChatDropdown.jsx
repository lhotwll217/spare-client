import {onValue} from "firebase/database";
import {useEffect} from "react";
import {Dropdown} from "semantic-ui-react";
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
  useEffect(() => {
    const unsubscribe = onValue(firebaseMessageQuery(), (snapshot) => {
      console.log(firebaseObjectToArray(snapshot.val()));
    });

    return unsubscribe;
  });

  return <Dropdown options={friendOptions} text='Messages'></Dropdown>;
}
