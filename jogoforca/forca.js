const numberOfImages = 8;
const maxErrorNumber = 5;
let hangman;
let hangmanImages;
let errorCounter;
let hitCouter;
let words;
let descriptions;
let wordTip;
let hangWord;
let hangWordCharacters;
let hangWordContainner;
let characterInput;
let btnTest;
let errorContainer;
let gameStatus;
let victory;
let btnRestart;

window.addEventListener('load', initializer);

function initializer() {
    hangman = window.document.getElementById("imgforca");
    hangmanImages = [];
    errorCounter = [];
    hitCouter = [];
    words = ["penteadeira", "accessivel", "velhaca", "tempo", "dissimulado"];
    descriptions = [
        "Mesa pequena ou cômoda, colocada no quarto de dormir, com gavetas e espelho, normalmente usada para que alguém se consiga pentear ou se maquiar.",
        "A que se consegue ter acesso com facilidade; que se consegue chegar; diz-se do lugar.",
        "Que se utiliza de esperteza para prejudicar outrem; traiçoeira, ardilosa: classe política velhaca.",
        "Certo intervalo definido a partir do que nele acontece; época",
        "Pessoa que oculta seus reais sentimentos ou intenções; fingido, falso, hipócrita."
    ];
    wordTip = document.getElementById("dica");
    hangWordContainner = document.getElementById("acertos");
    characterInput = document.getElementById("letra");
    btnTest = document.getElementById("btntestar");
    errorContainer = document.querySelector("#erros");
    gameStatus = document.querySelector("#msgstatus");
    victory = false;
    btnRestart = null;

    btnTest.addEventListener('click', testCharacter);
    document.addEventListener('keydown', keyPressed);

    preloadImages();
    loadWordAndDescription();
    updateHangmanImage();
    updateStatus();
    cleanInput();
    showErrors()
}

function preloadImages() {
    for (let index = 0; index < numberOfImages; index++) {
        let img = new Image();
        img.src = `img/fc${index}.jpg`;
        hangmanImages.push(img);
    }
}

function loadWordAndDescription() {
    let aleatory = Math.floor(Math.random() * words.length);
    wordTip.innerHTML = `<p>${descriptions[aleatory]}</p>`;
    hangWord = words[aleatory];
    hangWordCharacters = hangWord.match(/\w/ig);
    chargeWord();
}

function chargeWord() {
    hangWordContainner.innerHTML = "";
    let wordTable = document.createElement("table");
    let wordTableBody = document.createElement("tbody");
    let wordTableLine = document.createElement("tr");
    if (hitCouter.length == 0) {

        for (let i = 0; i < hangWordCharacters.length; i++) {
            let wordTableColumn = document.createElement("td");
            let wordTableColumnCurrentText = document.createTextNode("");
            wordTableColumn.appendChild(wordTableColumnCurrentText);
            wordTableLine.appendChild(wordTableColumn);
        }
        wordTableBody.appendChild(wordTableLine);

    } else {

        for (let i = 0; i < hangWordCharacters.length; i++) {
            let wordTableColumn = document.createElement("td");
            let wordTableColumnCurrentText
            for (let index of hitCouter) {
                if (index == i) {
                    wordTableColumnCurrentText = document.createTextNode(hangWordCharacters[index]);
                } else {
                    wordTableColumnCurrentText = document.createTextNode("");
                }
                wordTableColumn.appendChild(wordTableColumnCurrentText);
                wordTableLine.appendChild(wordTableColumn);
            }
        }
        wordTableBody.appendChild(wordTableLine);

    }
    wordTable.appendChild(wordTableBody);
    hangWordContainner.appendChild(wordTable);
}

function testCharacter() {
    let charTest = characterInput.value;
    if (charTest == null || charTest == "") {
        window.alert('insira um valor válido');
        cleanInput();
    } else {
        let isError = true;
        for (let i = 0; i < hangWordCharacters.length; i++) {
            if (charTest == hangWordCharacters[i]) {
                hitCouter.push(i);
                isError = false;
            }
        }
        chargeWord();
        if (isError) {
            
            if (errorCounter.length <= 0) {
                errorCounter.push(charTest);
            } else if (!checkRepeatError(charTest)) {
                errorCounter.push(charTest);
            } else {
                window.alert('Este caractere já foi testado.')
            }
            showErrors();
            updateHangmanImage();
            updateStatus();
            if (errorCounter.length >= maxErrorNumber) {
                toLose();
            }
        } else {
            if (hitCouter.length == hangWordCharacters.length) {
                toWin();
            }
        }
        cleanInput();
    }
}

function cleanInput() {
    characterInput.value = "";
    characterInput.focus();
}

function showErrors() {
    errorContainer.innerHTML = "";
    errorContainer.innerHTML = `<p class="info erros">${errorCounter.join()}</p>`;
}

function updateHangmanImage() {
    if (hitCouter.length == 0 && errorCounter == 0) {
        hangman.innerHTML = "<img src=\"img/fc0.jpg\">";
    } else {
        if (victory) {
            hangman.innerHTML = `<img src="img/fc7.jpg">`;
        } else {
            hangman.innerHTML = `<img src="${hangmanImages[errorCounter.length + 1].src}">`;
        }
    }
}

function updateStatus() {
    gameStatus.innerHTML = "";
    if (errorCounter.length <= 0) {
        gameStatus.innerHTML = `<p class="info status">Erros: 0 - Chances restantes: ${maxErrorNumber}.</p>`;
    } else {
        gameStatus.innerHTML = `<p class="info status">Erros: ${errorCounter.length} - Chances restantes: ${maxErrorNumber - (errorCounter.length)}.</p>`;
    }
}

function toLose() {
    gameStatus.innerHTML += "<p class=\"fatalerror\">Você perdeu!</p>";
    callRestart();
}

function callRestart() {
    btnRestart = document.createElement("input");
    btnRestart.setAttribute("type", "button");
    btnRestart.setAttribute("id", "restartbtn");
    btnRestart.setAttribute("value", "jogar novamente");

    errorContainer.appendChild(btnRestart);
    btnRestart.addEventListener('click', restart);

    btnTest.removeEventListener('click', testCharacter);
    document.removeEventListener('keydown', keyPressed);

}

function restart() {
    errorContainer.removeChild(btnRestart);
    initializer()
}

function toWin() {
    gameStatus.innerHTML += "<p class=\"victory\">Você venceu!</p>";
    victory = true;
    updateHangmanImage();
    callRestart();
}

function checkRepeatError(test) {
    let isRepeat = false;
    for (error of errorCounter) {
        if (test == error) {
            isRepeat = true;
        }
    }
    return isRepeat;
}

function keyPressed() {
    let kp = event.keyCode;
    if (kp == 13) {
        testCharacter();
    }
}