const express = require('express');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

class Jugador {
    constructor(nombre, posicion) {
        this.id = uuidv4();
        this.nombre = nombre;
        this.posicion = posicion;
    }
}

class FormacionFutbolSala {
    constructor(alineacion) {
        this.alineacion = alineacion;
        this.jugadores = [];
    }

    agregarJugador(jugador) {
        this.jugadores.push(jugador);
    }

    mostrarFormacion() {
        let formacionStr = `Formación de Fútbol Sala: ${this.alineacion}\n`;
        this.jugadores.forEach((jugador, index) => {
            formacionStr += `${jugador.posicion}: ${jugador.nombre}\n`;
        });
        return formacionStr;
    }
}

function generarAlineacionAleatoria(alineacion) {
    let alineacionAleatoria = alineacion.split('-').sort(() => Math.random() - 0.5);
    return alineacionAleatoria.join('-');
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
    const alineacion = req.body.alineacion;
    const formacion = new FormacionFutbolSala(alineacion);

    const posicionIndices = { '1': 'Portero', '2': 'Defensa', '3': 'Centrocampista', '4': 'Delantero' };
    for (let posicion in posicionIndices) {
        const cantidad = parseInt(alineacion[posicion - 1]);
        for (let i = 1; i <= cantidad; i++) {
            const nombre = req.body[`nombre_${posicionIndices[posicion]}_${i}`];
            const jugador = new Jugador(nombre, posicionIndices[posicion]);
            formacion.agregarJugador(jugador);
        }
    }

    const opcion = req.body.aleatorio;
    if (opcion === 's') {
        const alineacionAleatoria = generarAlineacionAleatoria(alineacion);
        formacion.alineacion = alineacionAleatoria;
    }

    res.send(formacion.mostrarFormacion());
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
