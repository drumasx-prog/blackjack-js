/**
 * CAPA 3: CONTROLADOR (Game Loop)
 * Conecta la lógica con la vista.
 */

const dormir = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class BlackjackGame {
    constructor() {
        this.mazo = new Mazo();
        this.jugador = new Mano();
        this.dealer = new Mano();
        this.ui = new Interfaz();
        this.conectarEventos();
    }

    conectarEventos() {
        this.ui.btnPedir.addEventListener('click', () => this.pedirCartaJugador());
        // OJO AQUÍ: Llamamos a plantarse() sin paréntesis extra
        this.ui.btnPlantarse.addEventListener('click', () => this.plantarse()); 
        this.ui.btnNuevo.addEventListener('click', () => this.nuevoJuego());
    }

    // ... (nuevoJuego y pedirCartaJugador siguen igual) ...
    nuevoJuego() {
        this.mazo.resetear();
        this.jugador = new Mano();
        this.dealer = new Mano();
        
        this.jugador.agregarCarta(this.mazo.sacarCarta());
        this.jugador.agregarCarta(this.mazo.sacarCarta());
        this.dealer.agregarCarta(this.mazo.sacarCarta());

        this.ui.actualizarMesa(this.jugador, this.dealer, false);
    }

    pedirCartaJugador() {
        this.jugador.agregarCarta(this.mazo.sacarCarta());
        this.ui.actualizarMesa(this.jugador, this.dealer, false);
        
        if (this.jugador.calcularPuntaje() > 21) {
            this.ui.mostrarMensaje("Te pasaste. Pierdes ❌");
            this.ui.actualizarMesa(this.jugador, this.dealer, true);
        }
    }

    // --- AQUÍ ESTÁ EL CAMBIO IMPORTANTE ---
    // Agregamos 'async' para poder usar esperas dentro
    async plantarse() {
        // Deshabilitamos botones inmediatamente para que el usuario no toque nada
        this.ui.btnPedir.disabled = true;
        this.ui.btnPlantarse.disabled = true;

        // Bucle con PAUSAS (Suspenso)
        while (this.dealer.calcularPuntaje() < 17) {
            await dormir(1000); // Espera 1 segundo (1000 ms)
            
            this.dealer.agregarCarta(this.mazo.sacarCarta());
            this.ui.actualizarMesa(this.jugador, this.dealer, false); // Actualiza visualmente cada carta
            
            // Forzamos deshabilitar botones de nuevo porque actualizarMesa los reactiva si el juego no terminó
            this.ui.btnPedir.disabled = true;
            this.ui.btnPlantarse.disabled = true;
        }

        // Una última pausa dramática antes del veredicto
        await dormir(500); 
        this.finalizarJuego();
    }

    finalizarJuego() {
        // Esta función se llama al final del 'await'
        const pJugador = this.jugador.calcularPuntaje();
        const pDealer = this.dealer.calcularPuntaje();
        let mensaje = "";

        // Verificamos primero si el jugador se pasó (por si acaso)
        if (pJugador > 21) {
             mensaje = "Te pasaste. Pierdes ❌";
        } else if (pDealer > 21) {
            mensaje = "Dealer se pasó. ¡Ganaste! 🏆";
        } else if (pJugador > pDealer) {
            mensaje = "¡Ganaste! 🏆";
        } else if (pJugador < pDealer) {
            mensaje = "La casa gana. ❌";
        } else {
            mensaje = "Empate 🤝";
        }

        this.ui.mostrarMensaje(mensaje);
        // Pasamos 'true' para indicar que terminó y mostrar puntos del dealer
        this.ui.actualizarMesa(this.jugador, this.dealer, true); 
    }
}