import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

import Markers from "./Markers"
import { carStore } from '../../stores/CarsStore';
import { CarOnMap } from '../../types/Car';
import { getMiddleCoords } from '../../helpers/coords';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const MapComponent: React.FC = () => {
  const coords: CarOnMap[] = carStore.carsOnMap
  const center = getMiddleCoords(
    coords.map(
      (coord) => {
        return {
          lat: coord.coords.latitude,
          lon: coord.coords.longitude
        }
      }
    ))

  return (
    <div>
      <MapContainer center={[center.lat, center.lon]} zoom={13} style={{ height: '90vh', width: '90vw' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Markers cars={coords}/>
      </MapContainer>
    </div>
  );
};

export default MapComponent;