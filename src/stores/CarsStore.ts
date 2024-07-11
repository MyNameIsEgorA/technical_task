import { action, observable, makeObservable, runInAction } from 'mobx';
import axios from 'axios';
import { Car } from '../types/Car';

class CarStore {
    @observable data: Car[] = [];
    @observable loading: boolean = true;
    @observable error: any = null;
    @observable sortOrder: 'asc' | 'desc' | null = null;
    @observable sortBy: 'year' | 'price' | null = null;

    constructor() {
        makeObservable(this);
        this.fetchCars();
    }

    @action
    fetchCars = async () => {
        try {
            const response = await axios.get('https://test.tspb.su/test-task/vehicles');
            runInAction(() => {
                this.data = response.data;
                this.loading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.error = error;
                this.loading = false;
            });
        }
    };

    @action
    handleSaveCar = (updatedCar: Car) => {
        const updatedData = this.data.map(car => 
            car.id === updatedCar.id ? updatedCar : car
        );
        this.data = updatedData;
    };

    @action
    sortData = (by: 'year' | 'price') => {
        const sortedData = [...this.data].sort((a, b) => {
            if (by === 'year') {
                return this.sortOrder === 'asc' ? a.year - b.year : b.year - a.year;
            } else {
                return this.sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
            }
        });
        this.data = sortedData;
    };

    @action
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

export default new CarStore();