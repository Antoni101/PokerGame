
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
    handSize: 0,
    maxHand: 7,
    maxDeck: 25,
    chips: 0
};

function updateHand() {
    let hand = document.getElementById("hand");
    let children = hand.children;
    for (let i = 0; i < children.length; i++) {
        children[i].id = i;
        children[i].setAttribute("onclick", `selectCard(${i})`);
    }
}

function discardCard() {
    for (let i = player.hand.length - 1; i >= 0; i--) {
        if (player.hand[i].active == true) { // IF CARD IS SELECTED
            //console.log(player.hand[i]);
            player.hand[i].active = false;
            player.discards.push(moveCard(i, player.hand)); // PUSHES CARD TO NEW ARRAY
            document.getElementById(i).remove()
        }
    }
    console.log(player.hand);

    updateHand();
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
    console.log(player.deck);
}

function addCards() { /* ADDING CARDS TO HAND IF THERE IS SPACE */
    if (player.hand.length >= player.maxHand) {
        console.log("No space in hand");
    }
    else {
        for (let i = player.hand.length; i < player.maxHand; i++) {
            if (player.deck.length > 0) {
                let getCard = player.deck.shift();
                player.hand.push(getCard);    
                newCard(i)               
                console.log("Card Added (" + player.hand.length + "/" + player.maxHand + ")");
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

    if (player.hand[i].suit == "Heart") {
        card.style.color = "IndianRed"; 
        card.innerHTML += "♥️";
    }
    else if (player.hand[i].suit == "Diamond") {
        card.style.color = "IndianRed"; 
        card.innerHTML += "♦️";
    }
    else if (player.hand[i].suit == "Spade") {
        card.style.color = "DarkSlateGrey"; 
        card.innerHTML += "♠️";
    }
    else if (player.hand[i].suit == "Club") {
        card.style.color = "DarkSlateGrey"; 
        card.innerHTML += "♣️";
    }
}

function cardCount() { // RETURNS AMOUNT OF CARDS ON SCREEN NOT IN ARRAY
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

function playCard() {
    console.log("...")
}
