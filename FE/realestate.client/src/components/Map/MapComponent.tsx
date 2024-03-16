import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const MapComponent = ({ prop }: any) => {
  const position = [51.505, -0.09];
  return (
    <MapContainer
      style={{ width: "100%", height: "270" }}
      center={{ lat: prop?.latitude, lng: prop?.longitude }}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        // icon={
        //   new L.Icon({
        //     iconUrl: MarkerIcon.src,
        //     iconRetinaUrl: MarkerIcon.src,
        //     iconSize: [25, 41],
        //     iconAnchor: [12.5, 41],
        //     popupAnchor: [0, -41],
        //     shadowUrl: MarkerShadow.src,
        //     shadowSize: [41, 41],
        //   })
        // }
        position={[51.505, -0.09]}
      >
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
