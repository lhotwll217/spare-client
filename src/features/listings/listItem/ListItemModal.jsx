import ModalWrapper from "../../../app/common/modals/ModalWrapper";
import MyMap from "../map/MyMap";

import ListItem from "./ListItem";

export default function ListItemModal(props) {
  return (
    <ModalWrapper size='small' width={"70%"} marginTop={40}>
      {" "}
      <div style={{margin: "auto"}}>
        {" "}
        <MyMap latLng={props.item.location.latLng} height={"250px"} />
        <ListItem item={props.item} />
      </div>
    </ModalWrapper>
  );
}
