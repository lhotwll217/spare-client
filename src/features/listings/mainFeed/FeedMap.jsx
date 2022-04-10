import {useState} from "react";
import {useEffect} from "react";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {Button} from "semantic-ui-react";
import {openModal} from "../../../app/common/modals/modalReducer";
import MarkerClusterGroup from "react-leaflet-markercluster";
import randomColor from "randomcolor";
import {divIcon} from "leaflet";
import {renderToStaticMarkup} from "react-dom/server";

export default function FeedMap({height, listings, maxWidth}) {
  const dispatch = useDispatch();
  const {currentUserProfile} = useSelector((state) => state.profile);
  const [latLng, setLatLng] = useState(null);

  useEffect(() => {
    // console.log("useEffect top & latLng is:", latLng);
    if (currentUserProfile?.location) {
      setLatLng(currentUserProfile.location.latLng);
      // console.log(latLng);
    } else {
      setLatLng(null);
    }
    // console.log("useEffect bottom & latLng is:", latLng);
  }, [currentUserProfile, latLng]);

  useEffect(() => {
    // console.log(latLng);
  }, [latLng]);
  //6

  return (
    <div>
      <MapContainer
        className='marketcluster-map'
        style={{
          height: 350,
          borderRadius: "10px",
        }}
        center={latLng ? [latLng.lat, latLng.lng] : [39.8283, -98.5795]}
        zoom={latLng ? 8 : 3}
        scrollWheelZoom={false}
        zIndex={0}
        key={latLng ? latLng.lat : "key"}
        tap={false}
      >
        console.log(L)
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <MarkerClusterGroup maxClusterRadius={15}>
          {listings &&
            listings.map((item) => {
              const {lat, lng} = item.location.latLng;

              if (lat !== undefined) {
                let color = randomColor();
                const iconMarkup = renderToStaticMarkup(
                  <i style={{backgroundColor: color}} className='pin1' />
                );
                const customMarkerIcon = divIcon({
                  html: iconMarkup,
                });
                return (
                  <Marker
                    key={item.id}
                    position={[lat, lng]}
                    icon={customMarkerIcon}
                  >
                    <Popup>
                      <strong style={{margin: "auto"}}>{item.title}</strong>

                      <br />
                      <Button
                        style={{
                          padding: 5,
                          maxWidth: "70%",
                          minWidth: "80px",
                          margin: "auto",
                        }}
                        fluid
                        color='teal'
                        content='VIEW'
                        size='tiny'
                        onClick={() =>
                          dispatch(
                            openModal({
                              modalType: "ListItemModal",
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
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}
