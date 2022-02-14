import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {
  Button,
  Grid,
  GridColumn,
  Image,
  Input,
  Label,
  Segment,
} from "semantic-ui-react";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const {currentUserProfile} = useSelector((state) => state.profile);
  const {loading} = useSelector((state) => state.async);
  return (
    <Grid style={{marginTop: "30px"}} centered>
      <GridColumn width={12}>
        <Image
          src='https://ballstatepbs.org/wp-content/uploads/2019/07/generic-female-profile-picture-8.jpg'
          circular
          bordered
          centered
        />
        <Button
          style={{margin: "auto", padding: 5, borderRadius: 2, maxWidth: 100}}
          color='green'
          content='Upload Photo'
          size='tiny'
          fluid
        />
        <Segment>
          <Label content='Display Name' />
          <Input fluid />
          <Label content='Location' />
          <Input fluid />
        </Segment>
      </GridColumn>
    </Grid>
  );
}
