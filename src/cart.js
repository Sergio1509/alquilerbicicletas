import { getBikes } from './bikeService.js';

let currentRental = null; // Solo permitiremos alquilar una bicicleta a la vez para simplificar

export function getRental() {
    return currentRental;
}

export function addRental(bike) {
    if (!currentRental) {
        currentRental = bike;
        return true;
    }
    return false; // Ya hay un alquiler activo
}

export function clearRental() {
    const returnedBike = currentRental;
    currentRental = null;
    return returnedBike;
}