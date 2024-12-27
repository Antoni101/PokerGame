
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
    upgrades: [],
    handSize: 0,
    maxHand: 5,
    chips: 0
};

function createCard() { /* CREATE RANDOM CARD */
    let randomSuit = Math.floor(Math.random() * suits.length);
    let randomRank = Math.floor(Math.random() * ranks.length);
    let randomCard = {
        suit: suits[randomSuit],
        rank: ranks[randomRank].name, 
        chipValue: ranks[randomRank].value ,
        active: false
    };
    return randomCard;
}

function createDeck() { /* CREATE STARTER DECK OF RANDOM CARDS */
    for (let i = 0; i < 10; i++) {
        player.deck.push(createCard());
    }
    console.log(player.deck);
}

function addCards() { /* ADDING CARDS TO HAND IF THERE IS SPACE */
    for (let i = player.hand.length; i < player.maxHand; i++) {
        let getCard = player.deck.shift();
        player.hand.push(getCard);
    }

    console.log(player.hand);

    loadHand();
}

function loadHand() { /* UPDATE Inner HTML with card */
    document.getElementById("hand").innerHTML = "";
    for (let i = 0; i < player.maxHand; i++) {
        document.getElementById("hand").innerHTML += `
            <div
                class="cards"
                onclick="selectCard(${i})"
                id="${i}">
                ${player.hand[i].rank}
            </div>
        `;

    }
    console.log(player.deck);
}

function loadDeck() {

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
