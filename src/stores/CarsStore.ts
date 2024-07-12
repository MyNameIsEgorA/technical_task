import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import { Car, CarOnMap } from '../types/Car';

class CarStore {
    cars: Car[] = [];
    loading: boolean = true;
    error: any = null;
    sortOrder: 'asc' | 'desc' | null = null;
    sortBy: 'year' | 'price' | null = null;
    carsOnMap: CarOnMap[] = [];

    constructor() {
        makeAutoObservable(this);
        this.fetchCars();
    }

    fetchCars = async () => {
        try {
            const response = await axios.get('https://test.tspb.su/test-task/vehicles');
            runInAction(() => {
                this.cars = response.data;
                this.loading = false;
                this.setCarsOnMap();
                console.log(JSON.stringify(this.carsOnMap))
            });
        } catch (error) {
            runInAction(() => {
                this.error = error;
                this.loading = false;
            });
        }
    };

    setCarsOnMap = (): void => {
        let newCarsOnMap: CarOnMap[] = []
        for (let car of this.cars) {
            newCarsOnMap.push({
                name: car.name,
                coords: {
                    longitude: car.longitude,
                    latitude: car.latitude
                }
            })
        }
        this.carsOnMap = newCarsOnMap;
    }

    getCarById = (id: number): Car | undefined => {
        return this.cars.find(car => car.id === id);
    }

    handleSaveCar = (updatedCar: Car) => {
        const updatedData = this.cars.map(car => 
            car.id === updatedCar.id ? updatedCar : car
        );
        this.cars = updatedData;
    };

    sortData = (by: 'year' | 'price') => {
        const sortedData = [...this.cars].sort((a, b) => {
            if (by === 'year') {
                return this.sortOrder === 'asc' ? a.year - b.year : b.year - a.year;
            } else {
                return this.sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
            }
        });
        this.cars = sortedData;
    };

    toggleSortOrder = (by: 'year' | 'price') => {
        if (this.sortBy === by) {
            this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortBy = by;
            this.sortOrder = 'asc';
        }
        this.sortData(by);
    };
}

export const carStore = new CarStore();