
let selected;

function playCards() { /* ONCE PLAYER PRESS THE PLAY CARDS BUTTON */
    selected = [];
 
    for (i = 0; i < player.hand.length; i++) { /* GOES THROUGH THE HAND AND CHECKS WHICH ONES WERE SELECTED */
        if (player.hand[i].active == true) {
            selected.push(player.hand[i]);
        }
    }

    if (selected.length > 0) { /* CHECKS IF PLAYER EVEN SELECTED A SINGLE CARD */
        sortCards(selected);
    }
    else {
        console.log("No cards played");
    }
}

// MAKES ARRAYS FOR EVERY SUITS AND SORTS EVERY CARD INTO THEIR SUIT ARRAY
function sortCards(cards) {
    let hearts = [];
    let spades = [];
    let clubs = [];
    let diamonds = [];
    let sortedSuits = [];

    for (i = 0; i < cards.length; i++) {
        if (cards[i].suit == "Heart") { hearts.push(cards[i]) }
        else if (cards[i].suit == "Spade") { spades.push(cards[i]) }
        else if (cards[i].suit == "Diamond") { clubs.push(cards[i]) }
        else if (cards[i].suit == "Club") { diamonds.push(cards[i]) };
    }

    // RETURNS LARGEST NUMBER OF SUITS
    let suitCount = Math.max(hearts.length, spades.length, clubs.length, diamonds.length);
    let largestSuit = [];
    // PUT ALL THE SUIT ARRAYS INTO ONE BIG ARRAY 
    sortedSuits.push(hearts, diamonds, spades, clubs);

    // FINDS THE SUIT THE HAS THE LARGEST NUMBER
    for (i = 0; i < sortedSuits.length; i++) {
        if (sortedSuits[i].length == suitCount) {
            largestSuit = sortedSuits[i];
        }
    }

    checkHands(largestSuit);
}

function checkHands(suitArr) {
    if (suitArr.length >= 2) {
        let counter = 500;
        for (i = 0; i < suitArr.length; i++) {
            getChips(suitArr[i], counter);
            counter += 100;
        }
    } 
}

function getChips(card, timer) { 
    card.id.style.transform = "translate(0, -85px)";
    card.id.classList.add("match");
    setTimeout(function() {
        player.chips += card.chipValue;
        discardCard(card);
    },timer)
}