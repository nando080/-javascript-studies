var dx, dy, px, py, velocidade, elemento, timer;

window.addEventListener('load', inicializar);

function inicializar() {
    dx = dy = px = py = 0;
    velocidade = 10;
    elemento = document.querySelector('#elemento');
    document.addEventListener('keydown', teclaPressionada);
    document.addEventListener('keyup', teclaSolta);
    timer = setInterval(enterFrame, 20);
}

//37 left - 38 up - 39 right - 40 down

function teclaPressionada() {
    var tecla = event.keyCode;
    
    //eixo x
    if (tecla == 37) {
        dx = -1;
    }
    if (tecla == 39) {
        dx = 1;
    }

    //eixo y
    if (tecla == 38) {
        dy = -1;
    }
    if (tecla == 40) {
        dy = 1;
    }
}

function teclaSolta() {
    var tecla = event.keyCode;
    
    //eixo x
    if (tecla == 37) {
        dx = 0;
    }
    if (tecla == 39) {
        dx = 0;
    }

    //eixo y
    if (tecla == 38) {
        dy = 0;
    }
    if (tecla == 40) {
        dy = 0;
    }
}

function enterFrame() {
    px += (dx * velocidade);
    py += (dy * velocidade);
    elemento.style.left = px + "px";
    elemento.style.top = py + "px";
}