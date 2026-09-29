import { getBikes, rentBike, returnBike } from './bikeService.js';
import { getRental, addRental, clearRental } from './cart.js';

export function render() {
    renderBikeList();
    renderCart();
}

function renderBikeList() {
    const listElement = document.getElementById('bike-list');
    listElement.innerHTML = '';

    getBikes().forEach(bike => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span><strong>${bike.model}</strong> ($${bike.pricePerHour}/h) <br>
            <span class="status ${bike.available ? 'available' : 'rented'}">
                ${bike.available ? 'Disponible' : 'Alquilada'}
            </span></span>
        `;

        if (bike.available) {
            const btn = document.createElement('button');
            btn.textContent = 'Alquilar';
            btn.onclick = () => handleRent(bike.id);
            li.appendChild(btn);
        }

        listElement.appendChild(li);
    });
}

function renderCart() {
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    cartList.innerHTML = '';

    const rental = getRental();

    if (!rental) {
        cartList.innerHTML = '<li>No tienes bicicletas alquiladas.</li>';
        cartTotal.textContent = '';
        return;
    }

    const li = document.createElement('li');
    li.innerHTML = `<span>${rental.model} - $${rental.pricePerHour}/h</span>`;

    const btn = document.createElement('button');
    btn.textContent = 'Devolver';
    btn.className = 'danger';
    btn.onclick = () => handleReturn(rental.id);
    
    li.appendChild(btn);
    cartList.appendChild(li);
    cartTotal.textContent = `Costo por hora estimado: $${rental.pricePerHour}`;
}

// Funciones intermedias que llaman DIRECTAMENTE a los módulos correspondientes
function handleRent(bikeId) {
    const rentedBike = rentBike(bikeId);
    if (rentedBike) {
        addRental(rentedBike);
        render(); // Actualiza la UI directamente
    }
}

function handleReturn(bikeId) {
    const returnedBike = returnBike(bikeId);
    if (returnedBike) {
        clearRental();
        render(); // Actualiza la UI directamente
    }
}