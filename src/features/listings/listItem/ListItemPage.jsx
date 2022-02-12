import {Container, Grid, GridColumn, Segment} from "semantic-ui-react";
import ModalWrapper from "../../../app/common/modals/ModalWrapper";
import MyMap from "../map/MyMap";

import ListItem from "./ListItem";

export default function ListDetailedPage(props) {
  console.log(props.item);
  const latLng = {lat: 41.9318294, lng: -73.907437};
  return (
    <ModalWrapper size='small'>
      {" "}
      <div style={{maxWidth: "300px", margin: "auto"}}>
        {" "}
        <MyMap latLng={latLng} height={"250px"} />
        <ListItem />
      </div>
    </ModalWrapper>
  );
}
