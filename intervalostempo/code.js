let dv1 = document.getElementById('dv1');
let dv2 = document.getElementById('dv2');

window.addEventListener('load', iniciar);

let contador = 0;
let tempoVariavel;

function iniciar() {
    //let tempoUnico = setTimeout(mudarCor, 3000);
    tempoVariavel = setInterval(mudarCor, 1000);
}

function mudarCor() {

    let target = document.getElementById('dv2')

    let r = Math.floor(Math.random() * 250);
    let g = Math.floor(Math.random() * 250);
    let b = Math.floor(Math.random() * 250);
    let rgb = `rgb(${r},${g},${b})`;

    target.style.backgroundColor = rgb;

    contador++;

    if (contador == 5) {
        clearInterval(tempoVariavel);
    }

}