let dx, px, velocidade, animacao, elemento, ativo;

window.addEventListener('load', inicializar);

function inicializar() {
    dx = 1;
    px = 0;
    velocidade = 5;
    ativo = false;
    animacao = null;
    elemento = document.querySelector('#elemento');
    elemento.addEventListener('click', verificar);
}

function verificar() {
    if (!ativo) {
        game();
        ativo = true;
    } else {
        cancelGame();
        ativo = false;
    }
}

function game() {
    if (px == 400) {
        dx = -1;
    }
    if (px == 0) {
        dx = 1;
    }
    px += dx * velocidade;
    elemento.style.left = px + "px";
    animacao = requestAnimationFrame(game);
}

function cancelGame() {
    cancelAnimationFrame(animacao);
}