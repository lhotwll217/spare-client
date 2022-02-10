import {Container, Grid, GridColumn} from "semantic-ui-react";
import ModalWrapper from "../../../app/common/modals/ModalWrapper";
import MyMap from "../map/MyMap";

import ListItem from "./ListItem";

export default function ListDetailedPage() {
  const latLng = {lat: 41.9318294, lng: -73.907437};
  return (
    <ModalWrapper>
      {" "}
      <Grid style={{marginTop: "4em"}} centered>
        <GridColumn width={10}>
          <div style={{maxWidth: "300px", margin: "auto"}}>
            {" "}
            <MyMap latLng={latLng} height={"250px"} />
          </div>
        </GridColumn>
      </Grid>
      <Grid centered>
        <GridColumn width={12}>
          <ListItem />
        </GridColumn>
      </Grid>
    </ModalWrapper>
  );
}
