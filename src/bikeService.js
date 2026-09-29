// Datos iniciales en memoria
let bikes = [
    { id: 1, model: "Montaña Pro", pricePerHour: 10, available: true },
    { id: 2, model: "Urbana City", pricePerHour: 7, available: true },
    { id: 3, model: "Eléctrica Eco", pricePerHour: 15, available: true }
];

export function getBikes() {
    return bikes;
}

export function rentBike(id) {
    const bike = bikes.find(b => b.id === id);
    if (bike && bike.available) {
        bike.available = false;
        return bike;
    }
    return null;
}

export function returnBike(id) {
    const bike = bikes.find(b => b.id === id);
    if (bike && !bike.available) {
        bike.available = true;
        return bike;
    }
    return null;
}