import {Grid} from "semantic-ui-react";
import MyMap from "./MyMap";
export default function MyMapContainer() {
  return (
    <Grid style={{marginTop: "80px", marginBottom: "20px"}} centered>
      <Grid.Column width={10}>
        <MyMap height={"400px"} />
      </Grid.Column>
    </Grid>
  );
}
