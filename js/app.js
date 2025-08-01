//1 Definición de productos como objetos
//2 Obtener referencias a elementos del DOM
//3 Función para manejar el ingreso del nombre
//4 Función para agregar producto al carrito
//5 Funciones para finalizar o vaciar


//Definición de productos como objetos
const PRODUCTOS = [
    {id: "frutilla", nombre: "Galleta de Frutilla", precio: 20},
    {id: "vainilla", nombre: "Galleta de Vainilla", precio: 15},
    {id: "chocolate", nombre: "Galleta de Chocolate", precio: 35}
];

//Variables globales
let nombreClienteActual = "";
let carrito = [];

//Obtener referencias a elementos del DOM
const inputNombre = document.getElementById("input-nombre");
const btnSaludar = document.getElementById("btn-saludar");
const saludoClienteSpan = document.getElementById("saludo-cliente");
const seccionNombre = document.getElementById("seccion-nombre");
const seccionPedido = document.getElementById("seccion-pedido");
const seccionCarrito = document.getElementById("seccion-carrito");

const selectVariedad = document.getElementById("select-variedad");
const inputCantidad = document.getElementById("input-cantidad");
const btnAgregar = document.getElementById("btn-agregar");

const listaCarrito = document.getElementById("lista-carrito");
const totalPresupuestoSpan = document.getElementById("total-presupuesto");
const btnFinalizarCompra = document.getElementById("btn-finalizar-compra");
const btnVaciarCarrito = document.getElementById("btn-vaciar-carrito");

//Funciones

//Función para inicializar o cargar el estado del carrito desde localStorage
function cargarCarritoDesdeStorage() {
    const carritoGuardado = localStorage.getItem("carritoGalletas");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarVistaCarrito();
    }
    //Cargar nombre del cliente
    const nombreGuardado = localStorage.getItem("nombreCliente");
    if (nombreGuardado) {
        nombreClienteActual = nombreGuardado;
        saludoClienteSpan.textContent = `¡Bienvenido/a de nuevo, ${nombreClienteActual}!`;
        seccionNombre.style.display = 'none';
        seccionPedido.style.display = 'block';
        seccionCarrito.style.display = 'block';
        cargarVariedadesEnSelect();
    } else {
        seccionNombre.style.display = 'block';
    }
}

//Función para guardar el carrito en localStorage
function guardarCarritoEnStorage() {
    localStorage.setItem("carritoGalletas", JSON.stringify(carrito));
}

//Función para guardar el nombre del cliente en localStorage
function guardarNombreClienteEnStorage() {
    localStorage.setItem("nombreCliente", nombreClienteActual);
}

//Función para ingreso del nombre
function manejarIngresoNombre() {
    const nombreIngresado = inputNombre.value.trim();

    if (nombreIngresado === "") {
        alert("Por favor, ingresa tu nombre para continuar.");
        return;
    }

    nombreClienteActual = nombreIngresado;
    guardarNombreClienteEnStorage();
    saludoClienteSpan.textContent = `¡Bienvenido/a, ${nombreClienteActual}!`;

    //Ocultar la sección de ingreso de nombre / mostrar pedido y carrito
    seccionNombre.style.display = 'none';
    seccionPedido.style.display = 'block';
    seccionCarrito.style.display = 'block';

    cargarVariedadesEnSelect();
    actualizarVistaCarrito();
}

//Función para cargar variedades
function cargarVariedadesEnSelect() {
    PRODUCTOS.forEach(producto => {
        const option = document.createElement("option");
        option.value = producto.id;
        option.textContent = `${producto.nombre} ($${producto.precio})`;
        selectVariedad.appendChild(option);
    });
}

//Función para agregar producto
function agregarProductoAlCarrito() {
    const idVariedadSeleccionada = selectVariedad.value;
    const cantidadSeleccionada = parseInt(inputCantidad.value);

    //Validaciones
    if (idVariedadSeleccionada === "") {
        alert("Por favor, seleccioná una variedad de galletita.");
        return;
    }
    if (isNaN(cantidadSeleccionada) || cantidadSeleccionada <= 0) {
        alert("Por favor, ingresá una cantidad válida. ¡Gracias!");
        inputCantidad.value = 1;
        return;
    }

    const productoSeleccionado = PRODUCTOS.find(p => p.id === idVariedadSeleccionada);

    if (productoSeleccionado) {
        //Actualizar cantidad de un mismo producto
        const itemExistente = carrito.find(item => item.id === productoSeleccionado.id);

        if (itemExistente) {
            itemExistente.cantidad += cantidadSeleccionada;
        } else {
            carrito.push({
                id: productoSeleccionado.id,
                nombre: productoSeleccionado.nombre,
                precio: productoSeleccionado.precio,
                cantidad: cantidadSeleccionada
            });
        }
        guardarCarritoEnStorage();
        actualizarVistaCarrito();
        alert(`Agregaste ${cantidadSeleccionada} de ${productoSeleccionado.nombre} al carrito.`);
        selectVariedad.value = "";
        inputCantidad.value = 1;
    } else {
        alert("Error: Variedad de galletita no encontrada. Intentá de nuevo.");
    }
}

//Función para actualizar carrito y total en el DOM
function actualizarVistaCarrito() {
    listaCarrito.innerHTML = "";
    let totalCalculado = 0;

    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<li>Tu carrito está vacío.</li>";
    } else {
        carrito.forEach(item => {
            const li = document.createElement("li");
            const subtotalItem = item.precio * item.cantidad;
            li.textContent = `${item.nombre} x ${item.cantidad} = $${subtotalItem.toFixed(2)}`;

            //Botón para eliminar item
            const btnEliminarItem = document.createElement("button");
            btnEliminarItem.textContent = "X";
            btnEliminarItem.classList.add("btn-eliminar-item");
            btnEliminarItem.onclick = () => eliminarItemDelCarrito(item.id);
            li.appendChild(btnEliminarItem);

            listaCarrito.appendChild(li);
            totalCalculado += subtotalItem;
        });
    }
    totalPresupuestoSpan.textContent = totalCalculado.toFixed(2);
}

//Función para eliminar un ítem específico del carrito
function eliminarItemDelCarrito(idProducto) {
    carrito = carrito.filter(item => item.id !== idProducto);
    guardarCarritoEnStorage();
    actualizarVistaCarrito();
    alert("Producto eliminado del carrito.");
}

//Función para vaciar completamente el carrito
function vaciarCarrito() {
    if (confirm("¿Estás seguro de que queres vaciar todo el carrito?")) {
        carrito = [];
        guardarCarritoEnStorage();
        actualizarVistaCarrito();
        alert("El carrito está vacío.");
    }
}

//Funciones para finalizar o vaciar
function finalizarCompra() {
    if (carrito.length === 0) {
        alert(`Hola ${nombreClienteActual}, tu carrito está vacío. Agregá algunos productos antes de finalizar.`);
        return;
    }
    alert(`¡Gracias por tu compra, ${nombreClienteActual}! Tu total es: $${totalPresupuestoSpan.textContent}.\nEsperamos verte de nuevo.`);
    console.log(`Compra finalizada para ${nombreClienteActual}. Total: $${totalPresupuestoSpan.textContent}`);
    vaciarCarrito();
}

//Asignación de Event Listeners

//Cuando la página carga, intentar cargar el carrito y nombre
document.addEventListener("DOMContentLoaded", cargarCarritoDesdeStorage);

//Evento para ingresar nombre
btnSaludar.addEventListener("click", manejarIngresoNombre);
inputNombre.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        manejarIngresoNombre();
    }
});

//Evento para agregar al carrito
btnAgregar.addEventListener("click", agregarProductoAlCarrito);
inputCantidad.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        agregarProductoAlCarrito();
    }
});

//Eventos para finalizar y vaciar
btnFinalizarCompra.addEventListener("click", finalizarCompra);
btnVaciarCarrito.addEventListener("click", vaciarCarrito);