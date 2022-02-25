import {MapContainer, TileLayer, Marker} from "react-leaflet";

export default function MyMap({height, latLng, maxWidth}) {
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
      {latLng && <Marker position={[latLng.lat, latLng.lng]}></Marker>}
    </MapContainer>
  );
}
