let containerBtns;
let primeiraJogada = true;
let tabuleiro;
let jogadas;
let jogando = false;
let jogador;
let vencedor;
let selDificuldade;
let dificuldade;
let statusJogo;
let vitoriasJog1 = 0;
let vitoriasJog2 = 0;
let pontosJog1;
let pontosJog2;

window.addEventListener("load", function () {
    iniciarElementosHtml();
    iniciarBotaoJogar();
});


//---> inicializar - inicio
function iniciarBotaoJogar() {
    containerBtns.innerHTML = "";
    let btnJogar = document.createElement("input");
    btnJogar.setAttribute("type", "button");
    btnJogar.setAttribute("class", "startbutton");
    btnJogar.setAttribute("value", (primeiraJogada ? "jogar" : "jogar novamente"));
    containerBtns.appendChild(btnJogar);
    btnJogar.addEventListener("click", function () {
        iniciarJogo();
        limparContainer();
    });
}

function limparContainer() {
    containerBtns.innerHTML = "";
}

function iniciarElementosHtml() {
    containerBtns = document.getElementById("cointainerbotoes");
    selDificuldade = document.getElementById("nivel");
    statusJogo = document.getElementById("statusjogo");
    pontosJog1 = document.getElementById("pontosjg1");
    pontosJog2 = document.getElementById("pontosjg2");
}

function iniciarJogo() {
    tabuleiro = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    let tabIndex = 1;
    for (let i = 0; i < tabuleiro.length; i++) {
        for (let j = 0; j < tabuleiro[i].length; j++) {
            tabuleiro[i][j] = document.getElementById(`p${tabIndex}`);
            tabuleiro[i][j].innerHTML = "";
            tabIndex++;
        }
    }

    jogadas = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    dificuldade = selDificuldade.value;

    jogando = true;

    vencedor = 0;

    primeiraJogada = false;

    jogadorAleatorio();
    atualizarTabuleiro();
    atualizarStatus();
    habilitarClickes();
}
//---> inicializar - fim


//---> tabuleiro - inicio
function habilitarClickes() {
    tabuleiro[0][0].addEventListener("click", function () { jogar(1); });
    tabuleiro[0][1].addEventListener("click", function () { jogar(2); });
    tabuleiro[0][2].addEventListener("click", function () { jogar(3); });
    tabuleiro[1][0].addEventListener("click", function () { jogar(4); });
    tabuleiro[1][1].addEventListener("click", function () { jogar(5); });
    tabuleiro[1][2].addEventListener("click", function () { jogar(6); });
    tabuleiro[2][0].addEventListener("click", function () { jogar(7); });
    tabuleiro[2][1].addEventListener("click", function () { jogar(8); });
    tabuleiro[2][2].addEventListener("click", function () { jogar(9); });
}

function atualizarTabuleiro() {
    let espacosVazios = false;
    for (let i = 0; i < tabuleiro.length; i++) {
        for (let j = 0; j < tabuleiro[i].length; j++) {
            if (jogadas[i][j] == 0) {
                tabuleiro[i][j].style.cursor = "pointer";
            } else if (jogadas[i][j] == 1) {
                tabuleiro[i][j].style.cursor = "default";
                tabuleiro[i][j].innerHTML = "X";
            } else if (jogadas[i][j] == 2) {
                tabuleiro[i][j].style.cursor = "default";
                tabuleiro[i][j].innerHTML = "O";
            }

            if (jogadas[i][j] == 0) {
                espacosVazios = true;
            }
        }
    }
    jogando = espacosVazios;
    if (vencedor != 0) {
        atualizarPlacar();
        iniciarBotaoJogar();
    }
}
//---> tabuleiro - fim


//--> verificar vitoria - inicio
function verificarVitoria() {
    let vit = false;
    //linhas
    for (let l = 0; l < jogadas.length; l++) {
        if ((jogadas[l][0] == jogadas[l][1]) && (jogadas[l][0] == jogadas[l][2]) && (jogadas[l][0] != 0)) {
            vit = true;
            if (jogadas[l][0] == 1) {
                vencedor = 1;
            } else {
                vencedor = 2;
            }
            jogando = false;
        }
    }
    //colunas
    for (let c = 0; c < jogadas.length; c++) {
        if ((jogadas[0][c] == jogadas[1][c]) && (jogadas[0][c] == jogadas[2][c]) && (jogadas[0][c] != 0)) {
            vit = true;
            if (jogadas[0][c] == 1) {
                vencedor = 1;
            } else {
                vencedor = 2;
            }
            jogando = false;
        }
    }
    //diagonais
    if ((jogadas[0][0] == jogadas[0][0]) && (jogadas[0][0] == jogadas[0][0]) && (jogadas[0][0] != 0)) {
        vit = true;
        if (jogadas[0][0] == 1) {
            vencedor = 1;
        } else {
            vencedor = 2;
        }
        jogando = false;
    }
    if ((jogadas[0][2] == jogadas[1][1]) && (jogadas[0][2] == jogadas[2][0]) && (jogadas[0][2] != 0)) {
        vit = true;
        if (jogadas[0][2] == 1) {
            vencedor = 1;
        } else {
            vencedor = 2;
        }
        jogando = false;
    }
    
    return vit;
}
//--> verificar vitoria - fim


//--> atualizar status - inicio
function atualizarStatus() {
    if (vencedor != 0) {
        if (vencedor == 1) {
            if (dificuldade < 3) {
                statusjogo.innerHTML = "vitória do jogador!";
            } else {
                statusjogo.innerHTML = "vitória do jogador#1!";
            }
        }
        if (vencedor == 2) {
            if (dificuldade < 3) {
                statusjogo.innerHTML = "vitória do CPU!";
            } else {
                statusjogo.innerHTML = "vitória do jogador#2!";
            }
        }
    } else {
        if (!jogando) {
            statusjogo.innerHTML = "o jogo terminou empatado";
        } else {
            if (jogador) {
                if (dificuldade < 3) {
                    statusjogo.innerHTML = "vez do jogador";
                } else {
                    statusjogo.innerHTML = "vez do jogador#1";
                }
            } else {
                    if (dificuldade < 3) {
                        statusjogo.innerHTML = "vez do CPU";
                    } else {
                        statusjogo.innerHTML = "vez do jogador#2";
                    }
            }
        }
    }
}

function atualizarPlacar() {
    if (!jogando && vencedor != 0) {
        if (vencedor == 1) {
            vitoriasJog1++;
            pontosJog1.innerHTML = vitoriasJog1;
        } else {
            vitoriasJog2++;
            pontosJog2.innerHTML = vitoriasJog2;
        }
        vencedor = 0;
    }
}
//--> atualizar status - fim


//---> mecanicas jogo - inicio

function jogadorAleatorio() {
    let jogAleatorio = Math.round(Math.random());
    if (jogAleatorio == 1) {
        jogador = true;
    } else {
        jogador = false;
    }
    console.log(jogAleatorio);
    if (!jogador) {
        jogadaCPU();
    }
}

function jogar(num) {
    switch (num) {
        case 1:
            if (jogando && jogador) {
                if (jogadas[0][0] == 0) {
                    jogadas[0][0] = 1;
                }
            }
            break;
        case 2:
            if (jogando && jogador) {
                if (jogadas[0][1] == 0) {
                    jogadas[0][1] = 1;
                }
            }
            break;
        case 3:
            if (jogando && jogador) {
                if (jogadas[0][2] == 0) {
                    jogadas[0][2] = 1;
                }
            }
            break;
        case 4:
            if (jogando && jogador) {
                if (jogadas[1][0] == 0) {
                    jogadas[1][0] = 1;
                }
            }
            break;
        case 5:
            if (jogando && jogador) {
                if (jogadas[1][1] == 0) {
                    jogadas[1][1] = 1;
                }
            }
            break;
        case 6:
            if (jogando && jogador) {
                if (jogadas[1][2] == 0) {
                    jogadas[1][2] = 1;
                }
            }
            break;
        case 7:
            if (jogando && jogador) {
                if (jogadas[2][0] == 0) {
                    jogadas[2][0] = 1;
                }
            }
            break;
        case 8:
            if (jogando && jogador) {
                if (jogadas[2][1] == 0) {
                    jogadas[2][1] = 1;
                }
            }
            break;
        case 9:
            if (jogando && jogador) {
                if (jogadas[2][2] == 0) {
                    jogadas[2][2] = 1;
                }
            }
            break;
    }
    jogador = false;
    verificarVitoria();
    atualizarTabuleiro();
    atualizarStatus();
    jogadaCPU();
}

function jogadaCPU() {
    if (dificuldade = 1 && jogando) {
        let timer = setTimeout(cpuDificuldade1, 1000);
    }
}

function cpuDificuldade1() {
    if (jogando && !jogador) {
        let l, c;
        do {
            l = Math.round(Math.random() * 2);
            c = Math.round(Math.random() * 2);
        } while (jogadas[l][c] != 0);
        jogadas[l][c] = 2;
        jogador = true;
        verificarVitoria();
        atualizarStatus();
        atualizarTabuleiro();
    }
}

//---> mecanicas jogo - fim

