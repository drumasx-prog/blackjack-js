/**
 * CAPA 2: VISTA (UI)
 * Solo se encarga de manipular el DOM. Recibe datos y los pinta.
 */
class Interfaz {
    constructor() {
        // Cachear referencias del DOM (mejor rendimiento)
        this.lblJugadorCartas = document.querySelector('#jugador-cartas');
        this.lblJugadorPuntos = document.querySelector('#jugador-puntos');
        this.lblDealerCartas = document.querySelector('#dealer-cartas');
        this.lblDealerPuntos = document.querySelector('#dealer-puntos');
        this.msgDisplay = document.querySelector('#mensaje');
        this.btnPedir = document.querySelector('#btn-pedir');
        this.btnPlantarse = document.querySelector('#btn-plantarse');
        this.btnNuevo = document.querySelector('#btn-nuevo');
    }

    actualizarMesa(manoJugador, manoDealer, juegoTerminado) {
        // 1. Renderizar cartas del JUGADOR (Con divs bonitos)
        this.lblJugadorCartas.innerHTML = ''; // Limpiamos lo anterior
        manoJugador.cartas.forEach(carta => {
            this.lblJugadorCartas.innerHTML += `<div class="carta">${carta}</div>`;
        });
        
        this.lblJugadorPuntos.innerText = manoJugador.calcularPuntaje();
        
        // 2. Renderizar cartas del DEALER
        this.lblDealerCartas.innerHTML = '';
        manoDealer.cartas.forEach(carta => {
            this.lblDealerCartas.innerHTML += `<div class="carta">${carta}</div>`;
        });

        // ... (El resto de la lógica de botones sigue igual) ...
        if (juegoTerminado) {
            this.lblDealerPuntos.innerText = manoDealer.calcularPuntaje();
            this.btnPedir.disabled = true;
            this.btnPlantarse.disabled = true;
            this.btnNuevo.style.display = 'inline-block';
        } else {
            this.lblDealerPuntos.innerText = "?";
            this.btnPedir.disabled = false;
            this.btnPlantarse.disabled = false;
            this.btnNuevo.style.display = 'none';
            this.msgDisplay.innerText = "";
        }
    }

    mostrarMensaje(texto) {
        this.msgDisplay.innerText = texto;
    }
}