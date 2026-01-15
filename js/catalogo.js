// Carrito compartido
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    actualizarContador();
});

// Escuchar cambios en localStorage desde otras páginas
window.addEventListener('storage', function(event) {
    if (event.key === 'cart') {
        cart = JSON.parse(event.newValue) || [];
        actualizarContador();
    }
});

// Función para actualizar el contador del carrito
function actualizarContador() {
    const cartCountElements = document.querySelectorAll('#cartCount');
    const totalItems = cart.length;
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

// Función para agregar productos al carrito (llamada desde frenos.html)
function agregarAlCarrito(name, price) {
    const productoExistente = cart.find(item => item.name === name);

    if (productoExistente) {
        productoExistente.quantity++;
    } else {
        cart.push({
            name: name,
            price: parseFloat(price),
            quantity: 1
        });
    }

    // Guardar en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Actualizar contador
    actualizarContador();
    
    // Mostrar notificación
    mostrarNotificacion(`${name} agregado al carrito`);
}

// Función para mostrar notificación
function mostrarNotificacion(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce';
    notification.innerHTML = `<i class="fas fa-check mr-2"></i>${message}`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Hacer accesible desde HTML
window.agregarAlCarrito = agregarAlCarrito;
window.actualizarContador = actualizarContador;
