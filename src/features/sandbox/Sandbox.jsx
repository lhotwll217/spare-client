import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {Button} from "semantic-ui-react";
import MyPlaceInput from "../../app/common/form/MyPlaceInput";
import {openModal} from "../../app/common/modals/modalReducer";
import {DECREMENT_COUNTER, INCREMENT_COUNTER} from "./testReducer";

export default function Sandbox() {
  let {data} = useSelector((state) => state.test);
  const dispatch = useDispatch();
  return (
    <div style={{marginTop: "5em"}}>
      <h1>What's up people!!!</h1>
      <h3>The data is {data}</h3>
      <Button
        onClick={() => dispatch({type: INCREMENT_COUNTER})}
        content='Increment'
      />
      <Button
        onClick={() => dispatch({type: DECREMENT_COUNTER})}
        content='Decrement'
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
