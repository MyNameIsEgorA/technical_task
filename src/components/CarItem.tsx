import React, { useState } from 'react';
import { Car } from '../types/Car';
import ChangeCarButtons from './ChangeCarButtons';

interface CarItemProps {
    car: Car;
    onSave: (updatedCar: Car) => void;
}

const CarItem: React.FC<CarItemProps> = ({ car, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedCar, setEditedCar] = useState<Car>(car);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEditedCar({
            ...editedCar,
            [name]: value
        });
    };

    const handleSave = () => {
        onSave(editedCar);
        setIsEditing(false);
    };

    return (
        <li>
            {isEditing ? (
                <>
                    <input name="name" value={editedCar.name} onChange={handleInputChange} />
                    <input name="model" value={editedCar.model} onChange={handleInputChange} />
                </>
            ) : (
                <>
                    <h3 className="car-name">{car.name}</h3>
                    <h5 className="car-model">{car.model}</h5>
                </>
            )}
            {isEditing ? (
                <input name="price" value={editedCar.price} onChange={handleInputChange} />
            ) : (
                <div className="car-price">price: {car.price}</div>
            )}
            <div className="car-year">year: {car.year}</div>
            <div className="car-color">color: {car.color}</div>
            <ChangeCarButtons handleSave={handleSave} isEditing={isEditing} setIsEditing={setIsEditing}/>
        </li>
    );
};

export default CarItem;