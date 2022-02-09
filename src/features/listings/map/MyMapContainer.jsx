import {Grid} from "semantic-ui-react";
import MyMap from "./MyMap";
export default function MyMapContainer({listings}) {
  return (
    <Grid.Column style={{marginTop: "80px", marginBottom: "20px"}} width={10}>
      <MyMap listings={listings} height={"400px"} />
    </Grid.Column>
  );
}
