let px;
let py;

window.addEventListener('load', inicializar);

document.addEventListener('keydown', movimentar);

function inicializar() {
    px = 0;
    py = 0;
}

//37 left - 38 up - 39 right - 40 down

function movimentar() {

    let elemento = document.querySelector('div#elemento');
    let tecla = event.keyCode;

    //eixo x
    if (tecla == 37) {
        px -= 10;
        elemento.style.left = px + "px";
    }

    if (tecla == 39) {
        px += 10;
        elemento.style.left = px + "px";
    }

    //eixo y
    if (tecla == 38) {
        py -= 10;
        elemento.style.top = py + "px";
    }

    if (tecla == 40) {
        py += 10;
        elemento.style.top = py + "px";
    }

}