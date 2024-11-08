const cardsArray = [
    'images/ubuntu.png', 'images/zorint.png', 'images/arch.png', 'images/fedora.png',
    'images/mint.png', 'images/garuda.png', 'images/puppy.png', 'images/kali.png',
    'images/ubuntu.png', 'images/zorint.png', 'images/arch.png', 'images/fedora.png',
    'images/mint.png', 'images/garuda.png', 'images/puppy.png', 'images/kali.png'
];

function returnObjectById(id){
    return document.getElementById(id)
}

function createObject(oggetto){
    return document.createElement(oggetto);
}

function shuffling(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

shuffling(cardsArray)

function createCells(){

    const container = returnObjectById("game_label");

    cardsArray.forEach(distro => {
        let divDistroImage =  createObject("div");
        let distroImage = createObject("img");

        distroImage.src = distro;

        divDistroImage.classList.add("card");

        divDistroImage.appendChild(distroImage);
        container.appendChild(divDistroImage);

        divDistroImage.addEventListener("click", () => {
            flipCard(divDistroImage);
        });
    });
}


function flipCard(card){
    if (card.classList.contains("hidden")) {
        card.classList.remove("hidden"); 
        card.classList.add("flipped");
    } else {
        card.classList.add("hidden");
        card.classList.remove("flipped");
    }

    checkMatch();
}

function unFlipCard(){

}

function checkMatch(){
    const match = firstCard.src === secondCard.src;

    if(match){
        firstCard.classList.add("block");
        secondCard.classList.add("block");

        vincitore();
        reset();

    }else{
        setTimeout(unFlipCard, 2000);
    }

    reset();
}


function vincitore(){
    if(count == 8){
        alert("HAI VINTO!")
    }
}

function reset(){
    firstCard, secondCard = null, null;
}


createCells();