let player = {
    hand: [],
    deck: [],
    upgrades: [],
    chips: 0
};

function loadDeck() {
    console.log("...");
}

function loadHand() {
    for (let i = 0; i < handSize; i++) {
        document.getElementById("hand").innerHTML += `
            <div
                class="cards"
                onclick="selectCard(${i})"
                id="${i}">
                ${i}
            </div>
        `;
    }
}
