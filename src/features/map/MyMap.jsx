import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";

export default function MyMap() {
  return (
    <MapContainer
      style={{height: "400px"}}
      center={[42.2173, -73.8646]}
      zoom={10}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={[42.2173, -73.8646]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
