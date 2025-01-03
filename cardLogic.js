
const suits = [
    "Heart", "Spade", "Diamond", "Club"
];

const ranks = [
    { name: "2", value: 2, }, { name: "3", value: 3, },
    { name: "4", value: 4, }, { name: "5", value: 5, },
    { name: "6", value: 6, }, { name: "7", value: 7, },
    { name: "8", value: 8, }, { name: "9", value: 9, },
    { name: "10", value: 10, }, { name: "J", value: 11, },
    { name: "Q", value: 12, }, { name: "K", value: 13, },
    { name: "A", value: 14, },
]


let player = {
    hand: [], deck: [], discards: [], upgrades: [],
    handSize: 0, maxHand: 7, maxDeck: 0, chips: 0
};

let canPlay = true; // DEFAULT AUDIO ENABLED

function startGame() {
    let startBtn = document.getElementById("startBtn");
    let game = document.getElementById("game");

    startBtn.style.transform = "scale(0.1)"; // BUTTON POP OUT
    setTimeout(function() {
        startBtn.style.display = "None";
    }, 100);


    setTimeout(function() { /* CREATES DECK AFTER .3 seconds */
        opacityTransition(true, game, 30);
        createDeck();
    }, 300);
}


function createDeck() { /* CREATE STARTER DECK OF RANDOM CARDS */

    let counter = 50; 
    let startDeck = 35; 
    for (let i = 0; i < startDeck; i++) {
        setTimeout(function() {
            player.deck.push(createCard());
            player.maxDeck = player.deck.length;
            playSound("drawCard");
            updateTxt();
        }, counter);
        counter += 50;
    }

    setTimeout(function() {
        loadHand();
        updateTxt();
    }, counter + 500);
}

function discardSelected() {
    for (let i = player.hand.length - 1; i >= 0; i--) {
        if (player.hand[i].active == true) { // IF CARD IS SELECTED
            discardCard(player.hand[i]);
        }
    }
}

function discardCard(card) {

    card.id.style.opacity = 0.0;
    setTimeout(function() {
        card.active = false;
        card.id.remove();
        moveCard(card, player.hand, player.discards);
    }, 500)

    updateHand();
    updateTxt();
}

function moveCard(card, oldArray, newArray) { //TAKES CARD AND MOVES FROM CURRENT ARRAY TO NEW ONE    
    let cardIndex = oldArray.indexOf(card); //GET CARD LOCATION OLD ARRAY    
    oldArray.splice(cardIndex, 1); //DELETES 1 CARD AT THAT LOCATION
    newArray.push(card); // PUSH CARD TO NEW ARRAY
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



function loadHand() { /* LOADS THE CARDS ON THE PAGE */

    let counter = 100;
    for (let i = 0; i < player.maxHand; i++) {
        setTimeout(function() {
            drawCard();
        },counter)
        counter += 100;
    }
}


function drawCard() { /* DRAW CARDS IF SPACE IN HAND / DECK */

    if ( player.hand.length < player.maxHand && player.deck.length > 0 ) {

        playSound("drawCard");

        let getCard = player.deck.shift();
        player.hand.push(getCard);   
        //console.log(player.hand.length) 
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
    updateHand();
}

function updateHand() { /* FIXES THE CARD IDS EVERY TIME THE HAND IS MODIFIED */
    let hand = document.getElementById("hand");
    let children = hand.children;
    for (let i = 0; i < children.length; i++) {
        let childrenSuit = children[i].children;
        childrenSuit[1].id = i;
        children[i].id = i;
        children[i].setAttribute("onclick", `selectCard(${i})`);
        player.hand[i].id = document.getElementById(i);
    }
}

function cardCount() { // RETURNS AMOUNT OF CARDS IN HAND SCREEN NOT IN ARRAY
    let hand = document.getElementById("hand");
    let children = hand.children;
    return children.length;
}

function selectCard(cardNum) { /* SELECTS OR DESELECTS CARD ONCLICK */

    playSound("selectCard");

    let count = getActiveCount();

    if (player.hand[cardNum].active == true) {
        document.getElementById(`${cardNum}`).style.transform = "";
        player.hand[cardNum].active = false;
    }
    else {
        if (count < 5) {
            document.getElementById(`${cardNum}`).style.transform = "translate(0, -80px)";
            player.hand[cardNum].active = true;
        }
    }
}

function getActiveCount() {  /* JUST CHECKS HOW MANY CARDS ARE SELECTED */
    let activeCards = 0;
    for (i = 0; i < player.hand.length; i++) {
        if (player.hand[i].active == true) {
            activeCards += 1;
        }
    }
    return activeCards;
}

