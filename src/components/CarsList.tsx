import axios from 'axios';
import { useEffect, useState } from 'react';
import { Car } from '../types/Car';
import './CarsList.css';
import CarItem from './CarItem';
import SortButtons from './SortButtons';
import MapComponent from './Map/Map';

const CarsList = () => {
    const [data, setData] = useState<Car[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
    const [sortBy, setSortBy] = useState<'year' | 'price' | null>(null);

    useEffect(() => {
        axios.get('https://test.tspb.su/test-task/vehicles')
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleSaveCar = (updatedCar: Car) => {
        const updatedData = data.map(car => 
            car.id === updatedCar.id ? updatedCar : car
        );
        setData(updatedData);
    };

    const sortData = (by: 'year' | 'price') => {
        const sortedData = [...data].sort((a, b) => {
            if (by === 'year') {
                return sortOrder === 'asc' ? a.year - b.year : b.year - a.year;
            } else {
                return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
            }
        });
        setData(sortedData);
    };

    const toggleSortOrder = (by: 'year' | 'price') => {
        if (sortBy === by) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(by);
            setSortOrder('asc');
        }
        sortData(by);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container">
            <MapComponent/>
            <h1>Data from Server</h1>
            <SortButtons sortBy={sortBy} sortOrder={sortOrder} toggleSortOrder={toggleSortOrder}/>
            <ul>
                {data.map(item => (
                    <CarItem car={item} key={item.id} onSave={handleSaveCar} />
                ))}
            </ul>
        </div>
    );
};

export default CarsList;