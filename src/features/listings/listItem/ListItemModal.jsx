import {useState} from "react";
import {Button, Image} from "semantic-ui-react";
import ModalWrapper from "../../../app/common/modals/ModalWrapper";
import MyMap from "../map/MyMap";
import ListItemCard from "./ListItemCard";

export default function ListItemModal(props) {
  const [viewPhoto, setViewPhoto] = useState([]);
  return (
    <ModalWrapper size='small' width={"70%"} marginTop={40}>
      {" "}
      <div style={{margin: "auto"}}>
        {" "}
        {viewPhoto.length < 1 ? (
          <MyMap latLng={props.item.location.latLng} height={"250px"} />
        ) : (
          <>
            <Image style={{maxHeight: 250}} src={viewPhoto} />
            <Button
              onClick={() => setViewPhoto([])}
              content='View Map'
              color='teal'
              size='tiny'
              fluid
              style={{padding: 5, margin: "auto", maxWidth: 80}}
            />
          </>
        )}
        <ListItemCard setViewPhoto={setViewPhoto} item={props.item} />
      </div>
    </ModalWrapper>
  );
}
