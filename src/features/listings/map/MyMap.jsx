import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import {useDispatch} from "react-redux";
import {Button} from "semantic-ui-react";
import {openModal} from "../../../app/common/modals/modalReducer";

export default function MyMap({height, listings, latLng, maxWidth}) {
  const dispatch = useDispatch();
  return (
    <MapContainer
      style={{
        height: height,
        borderRadius: "10px",
        maxWidth: maxWidth,
      }}
      center={latLng ? [latLng.lat, latLng.lng] : [42.2173, -73.8646]}
      zoom={9}
      scrollWheelZoom={false}
      zIndex={0}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {latLng && (
        <Marker position={[latLng.lat, latLng.lng]}>
          <Popup>Okay!</Popup>
        </Marker>
      )}
      {/* If listings props are coming from the the the main feed, then map the multiples */}
      {listings &&
        listings.map((item) => {
          const {lat, lng} = item.location.latLng;

          if (lat !== undefined) {
            return (
              <Marker key={item.id} position={[lat, lng]}>
                <Popup>
                  {item.title}
                  <br />
                  <Button
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
          } else {
            return null;
          }
        })}
    </MapContainer>
  );
}
