const color = [
    "rgb(240, 14, 128)",
    "rgb(52, 152, 219)",
    "rgb(46, 204, 113)",
    "rgb(241, 196, 15)",
    "rgb(155, 89, 182)",
    "rgb(230, 126, 34)"
]

let square = document.querySelectorAll(".square");

for(let i = 0; i < color.length ; ++i ){
    console.log("cuadrado " + (i + 1) + ":" + color[i]); 
}
let colorganador = color[1]
console.log("Adivina este color: " + colorganador);

function elegirColor () {
    for(let i = 0; i < color.length ; i++ ){
    let indice = Math.floor(Math.random() * colores.length);
    return console.log (colores[indice]);

    elegirColor()
    

}
}

square[i].style.backgroundColor = color[i];