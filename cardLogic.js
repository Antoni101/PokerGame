
const suits = [
    "Heart",
    "Spade",
    "Diamond",
    "Club"
];

const ranks = [
    { name: "2", value: 1, },
    { name: "3", value: 2, },
    { name: "4", value: 3, },
    { name: "5", value: 4, },
    { name: "6", value: 5, },
    { name: "7", value: 6, },
    { name: "8", value: 7, },
    { name: "9", value: 8, },
    { name: "10", value: 9, },
    { name: "J", value: 10, },
    { name: "Q", value: 11, },
    { name: "K", value: 12, },
    { name: "A", value: 13, },
]


let player = {
    hand: [],
    deck: [],
    discards: [],
    upgrades: [],
    selected: [],
    handSize: 0,
    maxHand: 7,
    maxDeck: 0,
    chips: 0
};

function startGame() {
    let startBtn = document.getElementById("startBtn");
    startBtn.style.transform = "scale(0.1)";
    setTimeout(function() {
        startBtn.style.display = "None";
    }, 100);


    setTimeout(function() {
        opacityTransition(true, document.getElementById("game"), 30);
        createDeck();
    }, 300);
}


function createDeck() { /* CREATE STARTER DECK OF RANDOM CARDS */

    let counter = 50; 
    let startDeck = 25; 
    for (let i = 0; i < startDeck; i++) {
        setTimeout(function() {
            player.deck.push(createCard());
            player.maxDeck = player.deck.length;
            updateTxt();
        }, counter);
        counter += 50;
    }

    setTimeout(function() {
        loadHand();
        updateTxt();
    }, counter + 500);
}

function pushCard(newArray) { // MOVE CARD FROM HAND TO SPECIFIC PILE OR ARRAY ex: DISCARD OR PLAY
    for (let i = player.hand.length - 1; i >= 0; i--) {
        if (player.hand[i].active == true) { // IF CARD IS SELECTED
            //console.log(player.hand[i]);
            player.hand[i].active = false;
            newArray.push(moveCard(i, player.hand)); // PUSHES CARD TO NEW ARRAY

            document.getElementById(i).remove();
        }
    }
    updateHand();
    updateTxt();
    console.log(newArray);
}

function moveCard(cardNum, oldArray) { //TAKES CARD AND MOVES FROM CURRENT ARRAY TO NEW ONE    
    let card = oldArray[cardNum];
    let cardIndex = oldArray.indexOf(card); //GET CARD LOCATION OLD ARRAY    
    oldArray.splice(cardIndex, 1); //DELETES 1 CARD AT THAT LOCATION
    return card;
}

function createCard() { /* CREATE RANDOM CARD */
    let randomSuit = Math.floor(Math.random() * suits.length);
    let randomRank = Math.floor(Math.random() * ranks.length);
    let randomCard = {
        suit: suits[randomSuit], //SUITS
        rank: ranks[randomRank].name,  //RANKS
        chipValue: ranks[randomRank].value , //VALUE
        active: false,
        id: null
    };
    return randomCard;
}



function loadHand() {

    let counter = 100;
    for (let i = 0; i < player.maxHand; i++) {
        setTimeout(function() {
            drawCard();
        },counter)
        counter += 100;
    }
}


function drawCard() { /* DRAW CARDS IF SPACE IN HAND / DECK */

    let drawSound = new Audio('audio/drawCard.mp3');

    if ( player.hand.length < player.maxHand && player.deck.length > 0 ) {

        let drawSound = new Audio('audio/drawCard.mp3');
        drawSound.play(); /* PLAY AUDIO WHEN CARD IS ADDED */

        let getCard = player.deck.shift();
        player.hand.push(getCard);   
        console.log(player.hand.length) 
        newCard(player.hand.length - 1);
    }
    else if (player.hand.length >= player.maxHand) {
        console.log("No space in hand");
        popTransition(document.getElementById("handTxt"), 0.2, 150);
    }
    else if (player.deck.length <= 0) {
        console.log("No space in deck");
        popTransition(document.getElementById("deckTxt"), 0.2, 150);
    }
}


function newCard(i) { // HTML CARD DESIGN BASED ON SUIT
    document.getElementById("hand").innerHTML += `
        <div
            class="cards"
            onclick="selectCard(${i})"
            id="${i}">
            <p class="topTxt">${player.hand[i].rank}</p>
            <p id="suit${i}"class="cardSuit"></p>
            <p class="bottomTxt">${player.hand[i].rank}</p>
        </div>
    `;

    let suit = document.getElementById(`suit${i}`);
    let card = document.getElementById(i);

    /* CHANGE CARD CSS BASED ON SUIT */
    card.classList.add(`${player.hand[i].suit}`);

    if (player.hand[i].suit == "Heart") { suit.innerHTML = "♥"; }
    else if (player.hand[i].suit == "Diamond") { suit.innerHTML = "♦"; }
    else if (player.hand[i].suit == "Spade") { suit.innerHTML = "♠"; }
    else if (player.hand[i].suit == "Club") { suit.innerHTML = "♣";}

    updateTxt();
}

function updateHand() {
    let hand = document.getElementById("hand");
    let children = hand.children;
    for (let i = 0; i < children.length; i++) {
        let childrenSuit = children[i].children;
        childrenSuit[1].id = i;
        children[i].id = i;
        children[i].setAttribute("onclick", `selectCard(${i})`);
    }
}

function cardCount() { // RETURNS AMOUNT OF CARDS IN HAND SCREEN NOT IN ARRAY
    let hand = document.getElementById("hand");
    let children = hand.children;
    return children.length;
}

function selectCard(cardNum) { /* SELECTS OR DESELECTS CARD ONCLICK */
    if (player.hand[cardNum].active == true) {
        document.getElementById(`${cardNum}`).style.transform = "";
        player.hand[cardNum].active = false;
    }
    else {
        document.getElementById(`${cardNum}`).style.transform = "t