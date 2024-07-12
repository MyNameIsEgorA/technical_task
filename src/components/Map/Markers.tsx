import React, { useState } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import { CarOnMap } from '../../types/Car';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { useGeolocated } from 'react-geolocated';

const Markers: React.FC<{ cars: CarOnMap[] }> = ({ cars }) => {
  const [selectedCar, setSelectedCar] = useState<CarOnMap | null>(null);
  const [routingControl, setRoutingControl] = useState<any>(null);
  const map = useMap();

  const { coords: userCoords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  const handleMarkerClick = (car: CarOnMap) => {
    if (selectedCar === car) {
      if (routingControl) {
        map.removeControl(routingControl);
        setRoutingControl(null);
      }
      setSelectedCar(null);
    } else {
      setSelectedCar(car);
      if (userCoords) {
        const userPosition = L.latLng(userCoords.latitude, userCoords.longitude);
        const carPosition = L.latLng(car.coords.latitude, car.coords.longitude);

        if (routingControl) {
          map.removeControl(routingControl);
        }

        const newRoutingControl = (L as any).Routing.control({
          waypoints: [userPosition, carPosition],
          routeWhileDragging: false,
        }).addTo(map);

        setRoutingControl(newRoutingControl);
      }
    }
  };

  return (
    <>
      {cars.map((car, index) => (
        <Marker
          position={[car.coords.latitude, car.coords.longitude]}
          key={index}
          eventHandlers={{
            click: () => handleMarkerClick(car),
          }}
        >
          <Popup>{car.name}</Popup>
        </Marker>
      ))}
    </>
  );
};

export default Markers;