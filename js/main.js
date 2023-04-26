// Grab a couple of things
const section = document.querySelector('section');
const playerLivesCount = document.querySelector('span');
let playerLives = 7;
const miau = new Audio('./sounds/miau.mp3');
const defeatSound = new Audio('./sounds/defeat.mp3');
const winSound = new Audio('./sounds/win.mp3');

// Link text
playerLivesCount.textContent = playerLives;

// Generate the data object
const getData = () => [
    { imgSrc: './img/kat1.jpg', name: 'kat1' },
    { imgSrc: './img/kat2.jpg', name: 'kat2' },
    { imgSrc: './img/kat3.jpg', name: 'kat3' },
    { imgSrc: './img/kat4.jpg', name: 'kat4' },
    { imgSrc: './img/kat5.jpg', name: 'kat5' },
    { imgSrc: './img/kat6.jpg', name: 'kat6' },
    { imgSrc: './img/kat7.jpg', name: 'kat7' },
    { imgSrc: './img/kat8.jpg', name: 'kat8' },
    { imgSrc: './img/kat1.jpg', name: 'kat1' },
    { imgSrc: './img/kat2.jpg', name: 'kat2' },
    { imgSrc: './img/kat3.jpg', name: 'kat3' },
    { imgSrc: './img/kat4.jpg', name: 'kat4' },
    { imgSrc: './img/kat5.jpg', name: 'kat5' },
    { imgSrc: './img/kat6.jpg', name: 'kat6' },
    { imgSrc: './img/kat7.jpg', name: 'kat7' },
    { imgSrc: './img/kat8.jpg', name: 'kat8' },
];

// Randomize
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
};

// Card Generator Function
const cardGenerator = () => {
    const cardData = randomize();
    // Generate the HTML
    cardData.forEach((item) => {
        const card = document.createElement('div');
        const face = document.createElement('img');
        const back = document.createElement('div');
        card.classList.add('card');
        face.classList.add('face');
        back.classList.add('back');
        // Attach the info to the cards
        face.src = item.imgSrc;
        card.setAttribute('name', item.name);
        // Attach the cards to the section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener('click', (e) => {
            card.classList.toggle('toggleCard');
            checkCards(e);
            miau.play();
        });
    });
};
// Check Cards 
const checkCards = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.add('flipped');
    const flippedCards = document.querySelectorAll('.flipped');
    const toggleCard = document.querySelectorAll('.toggleCard');
    // Logic
    if (flippedCards.length === 2) {
        if (flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')) {
            flippedCards.forEach((card) => {
                card.classList.remove('flipped');
                card.style.pointerEvents = 'none';
            });
        } else {
            flippedCards.forEach((card) => {
                card.classList.remove('flipped');
                setTimeout(() => card.classList.remove('toggleCard'), 1000);
            });
            playerLives--;
            playerLivesCount.textContent = playerLives;
            if (playerLives === 0) {
                setTimeout(() => {
                    defeatSound.play();
                    restart('Я нассу в твои цветы!!');
                }, 950);
            }
        }
    }
    // Run a check to see if we won the game
    if (toggleCard.length === 16) {
        setTimeout(() => {
            winSound.play();
            restart('Теперь можешь погладить нам пузико!!');
        }, 950);
    }
};

// Restart
const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll('.face');
    let cards = document.querySelectorAll('.card');
    section.style.pointerEvents = 'none';
    cardData.forEach((item, index) => {
        cards[index].classList.remove('toggleCard');
        // Randomize
        setTimeout(() => {
            cards[index].style.pointerEvents = 'all';
            faces[index].src = item.imgSrc;
            cards[index].setAttribute('name', item.name);
            section.style.pointerEvents = 'all';
        }, 1000);
    });
    playerLives = 7;
    playerLivesCount.textContent = playerLives;
    setTimeout(() => window.alert(text), 100);
};

cardGenerator();
