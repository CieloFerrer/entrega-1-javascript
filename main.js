//variables y constantes
const precioGalletaFrutilla = 20
const precioGalletaVainilla = 15
const precioGalletaChocolate = 35
const variedadesGalletas = ["frutilla", "vainilla", "chocolate"];

let nombre = "";
let precioTotal = 0;
let deseaContinuar = true; 

//funciones
//para tener nombre del cliente
function nombreCliente () {
    nombre = prompt ("¡Buen día! Por favor escribí tu nombre.");
    while (nombre === null || nombre.trim () === "") {
        nombre = prompt ("No has ingresado un nombre. Por favor, ingresá tu nombre.");
    }
    alert ("¡Bienvenido, " + nombre + "!");
    console.log("Presupuesto para " + nombre);
}

//para elegir variedad de galletas
function procesarVariedad() {
    let variedad; 
    let cantidad;
    let precioUnitario;
    let entradaValida = false;

    do {
        variedad = prompt("¿Qué variedad de galletitas buscás " + nombre + "? Tenemos disponibles los siguientes sabores: " + variedadesGalletas.join(", ") + ". Por favor escribí el nombre del sabor.");
        variedad = variedad?.toLowerCase();
        if (variedadesGalletas.includes(variedad)) {
            entradaValida = true;
            if (variedad === "frutilla") {
                precioUnitario = precioGalletaFrutilla;
            } else if (variedad === "vainilla") {
                precioUnitario = precioGalletaVainilla;
            } else if (variedad === "chocolate") {
                precioUnitario = precioGalletaChocolate;
            }

            cantidad = parseInt(prompt("¿Cuántas galletitas de " + variedad + " querés comprar?"));
            if (!isNaN(cantidad) && cantidad > 0) {
                let subtotal = cantidad * precioUnitario;
                precioTotal += subtotal;
                alert("Agregaste " + cantidad + " galletitas de " + variedad + " . Subtotal: $" + subtotal);
                console.log("Subtotal de " + cantidad + " galletas de " + variedad + ": $" + subtotal);
            } else {
                alert("Cantidad no válida. Por favor, escribí la cantidad nuevamente.");
            }
        } else {
            alert("Variedad no disponible. Por favor elegí entre: " + variedadesGalletas.join(", "));
        }
    } while (!entradaValida);
}

// para mostrar el total del presupuesto
function verResultadoFinal() {
    alert("Gracias por tu tiempo, " + nombre + ". El presupuesto total es de: $" + precioTotal);
    console.log("Total: $" + precioTotal);
}

nombreCliente();
while (deseaContinuar) {
    procesarVariedad();
    deseaContinuar = confirm("¿Querés agregar otra variedad de galletitas?");
}
verResultadoFinal();