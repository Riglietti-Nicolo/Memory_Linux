const cardsArray = [
    'images/ubuntu.png', 'images/zorint.png', 'images/arch.png', 'images/fedora.png',
    'images/mint.png', 'images/garuda.png', 'images/puppy.png', 'images/kali.png',
    'images/ubuntu.png', 'images/zorint.png', 'images/arch.png', 'images/fedora.png',
    'images/mint.png', 'images/garuda.png', 'images/puppy.png', 'images/kali.png'
];

let firstCard = null;
let secondCard = null;
let isFlipping = false;
let count = 0;

const numPoints = 200; 
const pointsContainer = document.querySelector('.points-container');

for (let i = 0; i < numPoints; i++) {
    const point = document.createElement('div');
    point.classList.add('point');
    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight;
    point.style.left = `${randomX}px`;
    point.style.top = `${randomY}px`;
    pointsContainer.appendChild(point);
}

function returnObjectById(id) {
    return document.getElementById(id);
}

function createObject(oggetto) {
    return document.createElement(oggetto);
}

// algoritmo di Fisher-Yates
function shuffling(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

shuffling(cardsArray);

function createCells() {
    const container = returnObjectById("game_label");

    cardsArray.forEach(distro => {
        let divDistroImage = createObject("div");
        let distroImage = createObject("img");

        distroImage.src = distro;
        divDistroImage.classList.add("card", "hidden"); 
        divDistroImage.appendChild(distroImage);
        container.appendChild(divDistroImage);

        divDistroImage.addEventListener("click", () => {
            assegnazione(divDistroImage);
        });
    });
}

function assegnazione(card) {
    if (isFlipping || card === firstCard || card.classList.contains("block")) {
        return;
    }

    flipCard(card); 

    if (firstCard === null) {
        firstCard = card;
    } else if (secondCard === null) {
        secondCard = card;
        isFlipping = true; 
        checkMatch(); 
    }
}

function flipCard(card) {
    card.classList.toggle("hidden");
    card.classList.toggle("flipped");
}

function unFlipCard() {
    flipCard(firstCard);
    flipCard(secondCard);
    reset(); 
}

function checkMatch() {
    const img1 = firstCard.querySelector("img").src;
    const img2 = secondCard.querySelector("img").src;

    if (img1 === img2) {
        firstCard.classList.add("block");
        secondCard.classList.add("block");
        count++; 
        if (count === 8) {
            setTimeout(vincitore, 2000);ù
        }
        reset();
    } else {
        setTimeout(unFlipCard, 1000);
    }
}

function vincitore() {
    const label = document.getElementsByClassName("time_label")[0];
    alert(`HAI VINTO! il tuo tempo: ${label.innerText}`);
    clearInterval(timerInterval);
    location.reload();
    count = 0
}

function reset() {
    firstCard = null;
    secondCard = null;
    isFlipping = false;
}

createCells();


document.addEventListener("DOMContentLoaded", () => {
    let startTime = Date.now(); 
    let timerInterval = null;

    const label = document.getElementsByClassName("time_label")[0];
    
    label.innerText = "00:00";

    function updateTimer() {
        const elapsedTime = Date.now() - startTime; 
        const totalSeconds = Math.floor(elapsedTime / 1000); 
        const minutes = Math.floor(totalSeconds / 60); 
        const seconds = totalSeconds % 60; 

        const Minutes = String(minutes).padStart(2, "0");
        const Seconds = String(seconds).padStart(2, "0");

        label.innerText = `${Minutes}:${Seconds}`; 
    }

    timerInterval = setInterval(updateTimer, 1000);
});