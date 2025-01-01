
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
    maxDeck: 25,
    chips: 0
};

let drawSound;

function updateHand() {
    let hand = document.getElementById("hand");
    let children = hand.children;
    for (let i = 0; i < children.length; i++) {
        children[i].id = i;
        children[i].setAttribute("onclick", `selectCard(${i})`);
    }
}

function pushHand(newArray, newPile) { // MOVE CARD FROM HAND TO SPECIFIC PILE OR ARRAY ex: DISCARD OR PLAY
    for (let i = player.hand.length - 1; i >= 0; i--) {
        if (player.hand[i].active == true) { // IF CARD IS SELECTED
            //console.log(player.hand[i]);
            player.hand[i].active = false;
            newArray.push(moveCard(i, player.hand)); // PUSHES CARD TO NEW ARRAY

            let card = document.getElementById(i);

            document.getElementById(`${newPile}`).appendChild(card);
            card.classList.add(`${newPile}` + "card");
            card.style.top = `${newArray.length}0px`;
            card.style.transform = "translate(0, 0)";
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

function createDeck() { /* CREATE STARTER DECK OF RANDOM CARDS */
    for (let i = 0; i < player.maxDeck; i++) {
        player.deck.push(createCard());
    }
    updateTxt();
    drawSound = document.getElementById("myAudio"); 
}

function addCards() { /* ADDING CARDS TO HAND IF THERE IS SPACE */
    if (player.hand.length >= player.maxHand) {
        console.log("No space in hand");
    }
    else {
        let timerCounter = 200;
        for (let i = player.hand.length; i < player.maxHand; i++) {
            if (player.deck.length > 0) {
                setTimeout(function() {
                    let getCard = player.deck.shift();
                    player.hand.push(getCard);    
                    newCard(i);
                }, timerCounter);  
                timerCounter += 350;
            }
            else {
                console.log("No cards left in deck");
            }
        }
    }

    console.log("Cards left in deck: " + player.deck.length);
}

function newCard(i) { // HTML CARD DESIGN BASED ON SUIT
    document.getElementById("hand").innerHTML += `
        <div
            class="cards"
            onclick="selectCard(${i})"
            id="${i}">
            ${player.hand[i].rank}
        </div>
    `;

    let card = document.getElementById(i);

    if (player.hand[i].suit == "Heart") { /* CHANGE CARD CSS BASED ON SUIT */
        card.style.color = "Red";  card.style.border = "4px solid Red"; card.innerHTML += "♥️";
    }
    else if (player.hand[i].suit == "Diamond") {
        card.style.color = "CornflowerBlue"; card.style.border = "4px solid CornflowerBlue"; card.innerHTML += "🔷";
    }
    else if (player.hand[i].suit == "Spade") {
        card.style.color = "SaddleBrown"; card.style.border = "4px solid SaddleBrown"; card.innerHTML += "♠️";
    }
    else if (player.hand[i].suit == "Club") {
        card.style.color = "DarkSlateGrey"; card.style.border = "4px solid DarkSlateGrey";card.innerHTML += "♣️";
    }

    drawSound.play(); /* PLAY AUDIO WHEN CARD IS ADDED */
    updateTxt();
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
        document.getElementById(`${cardNum}`).style.transform = "translate(0, -30px)";
        player.hand[cardNum].active = true;
    }
}

function updateTxt() { /* UPDATE TEXT VALUES ON THE PAGE FOR USER TO SEE */

    document.getElementById("deckTxt").innerHTML = "Deck: " + player.deck.length + "/" + player.maxDeck;
    document.getElementById("chipTxt").innerHTML = "Chips: " + player.chips;
    document.getElementById("discardTxt").innerHTML = "Discarded: " + player.discards.length;

}
