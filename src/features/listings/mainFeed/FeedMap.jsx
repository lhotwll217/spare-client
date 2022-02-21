import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {Button} from "semantic-ui-react";
import {openModal} from "../../../app/common/modals/modalReducer";

export default function FeedMap({height, listings, latLng, maxWidth}) {
  const dispatch = useDispatch();
  const {currentUserProfile} = useSelector((state) => state.profile);
  console.log(currentUserProfile);
  let lat, lng;
  if (currentUserProfile) {
    lat = currentUserProfile.location.latLng.lat;
    lng = currentUserProfile.location.latLng.lng;
  }

  return (
    <MapContainer
      style={{
        height: 350,
        borderRadius: "10px",
      }}
      center={lat && lng ? [lat, lng] : [42.2173, -73.8646]}
      zoom={8}
      scrollWheelZoom={true}
      zIndex={0}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      {listings &&
        listings.map((item) => {
          const {lat, lng} = item.location.latLng;

          if (lat !== undefined) {
            return (
              <Marker key={item.id} position={[lat, lng]}>
                <Popup>
                  <strong>{item.title}</strong>

                  <br />
                  <Button
                    style={{padding: 5, maxWidth: "70%", margin: "auto"}}
                    fluid
                    color='teal'
                    content='VIEW'
                    size='tiny'
                    onClick={() =>
                      dispatch(
                        openModal({
                          modalType: "ListItemPage",
                          modalProps: {item: item},
                        })
                      )
                    }
                  />
                </Popup>
              </Marker>
            );
          }
        })}
    </MapContainer>
  );
}
