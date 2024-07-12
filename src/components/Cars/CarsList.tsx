import React from 'react';
import { observer } from 'mobx-react';
import { carStore } from '../../stores/CarsStore';
import CarItem from './CarItem';
import SortButtons from './SortButtons';
import MapComponent from '../Map/Map';
import './CarsList.css';


const CarsList: React.FC = observer(() => {
    const { cars, loading, error, sortOrder, sortBy, toggleSortOrder, handleSaveCar } = carStore;

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container">
            <MapComponent />
            <h1>Data from Server</h1>
            <SortButtons sortBy={sortBy} sortOrder={sortOrder} toggleSortOrder={toggleSortOrder} />
            <ul>
                {cars.map(car => (
                    <CarItem id={car.id} key={car.id} onSave={handleSaveCar} />
                ))}
            </ul>
        </div>
    );
});

export default CarsList;