import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";

export default function MyMap({height, listings, latLng}) {
  console.log(listings);
  return (
    <MapContainer
      style={{
        height: height,
        borderRadius: "10px",
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
                <Popup>{item.title}</Popup>
              </Marker>
            );
          } else {
            return null;
          }
        })}
    </MapContainer>
  );
}
