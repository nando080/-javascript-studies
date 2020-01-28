const numberOfImages = 5;
let images;
let counter;
let slider;
let btnNext;
let btnPrev;
let animation;
let timeToChange;
let progressBarIn;
let progressValue;
let timeLimit;

window.addEventListener('load', initializer);

function initializer() {
    images = [];
    counter = 0;
    btnNext = window.document.querySelector("#btn2");
    btnPrev = window.document.querySelector("#btn1");
    slider = window.document.querySelector("#slider");
    timeToChange = 0;
    progressBarIn = window.document.querySelector("#progressionbarin");
    progressValue = 0;
    timeLimit = 600;
    loadImages();
    chargeImage();
    toAnimate();
    btnNext.addEventListener('click', function () { chargeImage(1); });
    btnPrev.addEventListener('click', function () { chargeImage(-1); });
}

function loadImages() {
    for (let index = 0; index < numberOfImages; index++) {
        let img = new Image();
        img.src = `img/img${index + 1}.jpg`
        images.push(img);
    }
}

function chargeImage(direction = 1) {

    if (direction == -1) {
        if (counter == 0) {
            counter = numberOfImages - 1;
        } else {
            counter--;
        }
    }
    if (direction == 1) {
        if (counter == (numberOfImages - 1)) {
            counter = 0;
        } else {
            counter++;
        }
    }
    slider.style.backgroundImage = `url("${images[counter].src}")`;
    progressValue = 0;

}

function toAnimate() {
    timeToChange++;

    if (timeToChange != 0 && (timeToChange % (timeLimit / 100) == 0)) {
        progressValue++;
    }
   
    progressBarIn.style.width = progressValue + "%";

    if (timeToChange >= timeLimit) {
        timeToChange = 0;
        chargeImage();
    }
    animation = requestAnimationFrame(toAnimate);
}