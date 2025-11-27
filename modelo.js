/**
 * CAPA 1: MODELO DE DATOS
 * Lógica pura. No sabe nada del HTML ni de botones.
 */

class Mazo {
    constructor() {
        this.cartas = [];
        this.resetear();
    }

    resetear() {
        const palos = ['C', 'D', 'P', 'T'];
        const valores = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        this.cartas = [];
        
        for (let palo of palos) {
            for (let valor of valores) {
                this.cartas.push(valor); // Simplificado para este ejemplo
            }
        }
        this.barajar();
    }

    barajar() {
        // Algoritmo Fisher-Yates
        for (let i = this.cartas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cartas[i], this.cartas[j]] = [this.cartas[j], this.cartas[i]];
        }
    }

    sacarCarta() {
        return this.cartas.pop();
    }
}

class Mano {
    constructor() {
        this.cartas = [];
    }

    agregarCarta(carta) {
        this.cartas.push(carta);
    }

    calcularPuntaje() {
        let puntos = 0;
        let ases = 0;
        for (let carta of this.cartas) {
            // Lógica de valor
            if (['J', 'Q', 'K'].includes(carta)) puntos += 10;
            else if (carta === 'A') { puntos += 11; ases++; }
            else puntos += parseInt(carta);
        }
        // Ajuste de Ases
        while (puntos > 21 && ases > 0) {
            puntos -= 10;
            ases--;
        }
        return puntos;
    }
}



