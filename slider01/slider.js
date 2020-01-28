const numberOfImages = 5;
let images;
let slider;
let counter;
let timer;

window.addEventListener('load', initializer);

function initializer() {
    images = [];
    slider = document.querySelector("#slider");
    counter = 0;
    imageLoader();
    fillSlider();
    timer = setInterval(fillSlider, 5000);
}

function imageLoader() {
    for (let index = 0; index < numberOfImages; index ++) {
        let img = new Image();
        img.src = `img/img${index + 1}.jpg`;
        images.push(img);
    }
}

function fillSlider() {
    slider.style.backgroundImage = "url(" + images[counter].src + ")";
    if (counter == (numberOfImages - 1)) {
        counter = 0;
    } else {
        counter ++;
    }
}