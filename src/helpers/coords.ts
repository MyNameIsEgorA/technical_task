export const getMiddleCoords = (positions: {lat: number, lon:number}[]): {lat: number, lon: number} => {
    let middleLat = 0;
    let middleLon = 0;

    for (let position of positions) {
        middleLat += position.lat
        middleLon += position.lon
    }

    return ({
        lat: middleLat / positions.length,
        lon: middleLon / positions.length
    })
}