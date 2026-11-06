let cuadrados = document.querySelectorAll(".square");
let colorDisplay = document.querySelector("#colorDisplay");
let mensaje = document.querySelector("#message");
let titulo = document.querySelector("h1");
let botonReset = document.querySelector("#reset");
let botonFacil = document.querySelector("#easy");
let botonDificil = document.querySelector("#hard");

function colorAleatorio() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function generarColores(cantidad) {
    const arreglo = [];
    for (let i = 0; i < cantidad; i++) {
        arreglo.push(colorAleatorio());
    }
    return arreglo;
}

let juego = {
    colores: [],
    colorGanador: "",
    intentos: 0,
    terminado: false,

    nuevoJuego: function (modo) {
        let cantidad = (modo === "facil") ? 3 : 6;
        this.colores = generarColores(cantidad);

        const index = Math.floor(Math.random() * this.colores.length);
        this.colorGanador = this.colores[index];

        this.intentos = 0;
        this.terminado = false;

        mensaje.textContent = "";
        titulo.style.backgroundColor = "steelblue";

        console.log("--- NUEVO JUEGO (" + modo.toUpperCase() + ") ---");
        for (let i = 0; i < this.colores.length; i++) {
            console.log("Cuadrado " + (i + 1) + ": " + this.colores[i]);
        }
        console.log("Adiviná este color: " + this.colorGanador);
    },

    adivinar: function (numero, elementoCuadrado) {
        if (this.terminado) {
            return;
        }

        this.intentos++;
        let colorElegido = this.colores[numero];

        if (colorElegido === this.colorGanador) {
            this.terminado = true;
            mensaje.textContent = "¡Correcto!";
            botonReset.textContent = "Jugar de Nuevo";
            cambiarColores(this.colorGanador);
        } else {
            elementoCuadrado.style.backgroundColor = "#232323";
            mensaje.textContent = "Intentalo nuevamente";
        }
    }
};

function pintarTablero() {
    for (let i = 0; i < cuadrados.length; i++) {
        if (juego.colores[i]) {
            cuadrados[i].style.backgroundColor = juego.colores[i];
            cuadrados[i].style.display = "block";
        } else {
            cuadrados[i].style.display = "none";
        }
    }
    colorDisplay.textContent = juego.colorGanador;
}

function cambiarColores(color) {
    for (let i = 0; i < cuadrados.length; ++i) {
        if (juego.colores[i]) {
            cuadrados[i].style.backgroundColor = color;
            cuadrados[i].style.display = "block";
        }
    }
    titulo.style.backgroundColor = color;
}

for (let i = 0; i < cuadrados.length; ++i) {
    cuadrados[i].addEventListener("click", function() {
        juego.adivinar(i, this);
    });
}

botonFacil.addEventListener("click", function() {
    botonFacil.classList.add("selected");
    botonDificil.classList.remove("selected");
    juego.nuevoJuego("facil");
    pintarTablero();
});

botonDificil.addEventListener("click", function() {
    botonDificil.classList.add("selected");
    botonFacil.classList.remove("selected");
    juego.nuevoJuego("dificil");
    pintarTablero();
});

botonReset.addEventListener("click", function() {
    let modoActual = cuadrados[3].style.display === "none" ? "facil" : "dificil";
    juego.nuevoJuego(modoActual);
    pintarTablero();
});

juego.nuevoJuego("dificil");
pintarTablero();