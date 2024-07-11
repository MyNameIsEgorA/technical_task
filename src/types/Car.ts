export interface Car {
    id: number,
    name: string,
    model: string,
    year: number,
    color: string,
    price: number,
    latitude: number, 
    longitude: number,
}

export interface CarOnMap {
    name: string;
    coords: {
        latitude: number,
        longitude: number,
    };
}