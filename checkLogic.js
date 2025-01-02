
const flushCount = 5;

function playCards() { /* ONCE PLAYER PRESS THE PLAY CARDS BUTTON */
    let selected = [];
 
    for (i = 0; i < player.hand.length; i++) { /* GOES THROUGH THE HAND AND CHECKS WHICH ONES WERE SELECTED */
        if (player.hand[i].active == true) {
            selected.push(player.hand[i]);
        }
    }

    if (selected.length > 0) { /* CHECKS IF PLAYER EVEN SELECTED A SINGLE CARD */
        checkHands(selected);
    }
    else {
        console.log("No cards played");
    }
}

function findModesAndCount(arr) {
    let freq = {}; // Count occurrences
    let maxCount = 0;
    let matches = [];

    // Count frequencies and find the max count
    for (let item of arr) {
        freq[item] = (freq[item] || 0) + 1;
        maxCount = Math.max(maxCount, freq[item]);
    }

    // Find all items with the max count
    for (let item in freq) {
        if (freq[item] === maxCount) {
            matches.push(item); // Add the item to modes
        }
    }

    return { matches, count: maxCount };
}


function checkHands(cards) {
    let hearts = [], spades = [], clubs = [], diamonds = [];
    let sortedSuits = [], sortedRanks = [];

    for (i = 0; i < cards.length; i++) {
        if (cards[i].suit == "Heart") { hearts.push(cards[i]) }
        else if (cards[i].suit == "Spade") { spades.push(cards[i]) }
        else if (cards[i].suit == "Diamond") { clubs.push(cards[i]) }
        else if (cards[i].suit == "Club") { diamonds.push(cards[i]) };
    }

    for (i = 0; i < cards.length; i++) {
        sortedRanks.push(cards[i].rank)
    }

    let largestRank = findModesAndCount(sortedRanks);
    console.log(largestRank);
    let largestSuit = Math.max(hearts.length, spades.length, clubs.length, diamonds.length);

    sortedSuits.push(hearts, diamonds, spades, clubs);

    for (i = 0; i < sortedSuits.length; i++) {
        if (sortedSuits[i].length == largestSuit) {
            largestSuit = sortedSuits[i];
        }
    }
    console.log(largestSuit);

    let flush = checkFlush(largestSuit);

    console.log(flush);
}

function checkFlush(check) {
    let match = false
    if (check.length == flushCount) {
        match = true;
    }
    return match;
}