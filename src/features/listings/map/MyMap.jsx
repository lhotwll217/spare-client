import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";

export default function MyMap({height, listings}) {
  console.log(listings);
  return (
    <MapContainer
      style={{
        height: height,
        borderRadius: "10px",
      }}
      center={[42.2173, -73.8646]}
      zoom={9}
      scrollWheelZoom={false}
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
                  A pretty CSS3 popup. <br /> Easily customizable.
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
