window.addEventListener('load', iniciarRelogio);

let aceso;

function iniciarRelogio() {

    aceso = true;

    mudarHora();
    let intervalo = setInterval(mudarHora, 1000);
    piscaSeparador();
    let intervaloPiscada = setInterval(piscaSeparador, 500);

}

function mudarHora() {

    let horas = document.querySelector('span[name = horas]');
    let minutos = document.querySelector('span[name = minutos]');
    let segundos = document.querySelector('span[name = segundos]');

    let data = new Date();

    let horaAtual = data.getHours();
    let minutoAtual = data.getMinutes();
    let segundoAtual = data.getSeconds();

    if (horaAtual < 10) {
        horas.innerHTML = "0" + horaAtual;
    } else {
        horas.innerHTML = horaAtual;
    }

    if (minutoAtual < 10) {
        minutos.innerHTML = "0" + minutoAtual;
    } else {
        minutos.innerHTML = minutoAtual;
    }

    if (segundoAtual < 10) {
        segundos.innerHTML = "0" + segundoAtual;
    } else {
        segundos.innerHTML = segundoAtual;
    }

}

function piscaSeparador() {

    let separadores = document.querySelectorAll('span.separador');
    
    if (aceso) {
        for (separador of separadores) {
            separador.style.color = "#190236";
        }
        aceso = false;
    } else {
        for (separador of separadores) {
            separador.style.color = "#7fff00";
        }
        aceso = true;
    }

}