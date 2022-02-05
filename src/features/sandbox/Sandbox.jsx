import {useState} from "react";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {Button} from "semantic-ui-react";

import {openModal} from "../../app/common/modals/modalReducer";
import {decrement, increment} from "./testReducer";

export default function Sandbox() {
  let {data} = useSelector((state) => state.test);
  const dispatch = useDispatch();
  let {loading} = useSelector((state) => state.async);
  //This allows us to target loading indicators by making a handler that sets the state to the name of the button to include in the logic of the loading prop
  const [target, setTarget] = useState(null);

  return (
    <div style={{marginTop: "5em"}}>
      <h1>What's up people!!!</h1>
      <h3>The data is {data}</h3>
      <Button
        name='increment'
        onClick={(e) => {
          dispatch(increment(10));
          setTarget(e.target.name);
        }}
        content='Increment'
        loading={loading && target === "increment"}
      />
      <Button
        name='decrement'
        content='Decrement'
        onClick={(e) => {
          dispatch(decrement(10));
          setTarget(e.target.name);
        }}
        loading={loading && target === "decrement"}
      />
      <Button
        onClick={() =>
          dispatch(openModal({modalType: "TestModal", modalProps: {data}}))
        }
        content='OPen Modal'
      />
    </div>
  );
}
