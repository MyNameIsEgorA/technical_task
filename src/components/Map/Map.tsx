import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

import Markers from "./Markers"

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const MapComponent: React.FC = () => {
  const [position, setPosition] = useState<[number, number]>([51.505, -0.09]);

  return (
    <div>
      <MapContainer center={position} zoom={13} style={{ height: '50vh', width: '50vh' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Markers position={[[12, 12], [13, 13]]}/>
      </MapContainer>
      <div>
        Координаты: {position[0]}, {position[1]}
      </div>
    </div>
  );
};

export default MapComponent;