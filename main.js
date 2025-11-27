// --- ARCHIVO: main.js ---

// Solo instanciamos y arrancamos.
// Como hemos cargado los otros scripts antes en el HTML, 
// el navegador ya sabe qué es "BlackjackGame".

console.log("Iniciando sistema..."); // Un log de ingeniería para verificar carga
const juego = new BlackjackGame();
juego.nuevoJuego();