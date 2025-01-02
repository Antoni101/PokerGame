function updateTxt() { /* UPDATE TEXT VALUES ON THE PAGE FOR USER TO SEE */

    document.getElementById("deckTxt").innerHTML = "Deck: " + player.deck.length + "/" + player.maxDeck;
    document.getElementById("handTxt").innerHTML = "Hand: " + player.hand.length + "/" + player.maxHand;
    document.getElementById("chipTxt").innerHTML = "Chips: " + player.chips;
    document.getElementById("discardTxt").innerHTML = "Discarded: " + player.discards.length;

}

function configAudio() {
    let btn = document.getElementById("audioBtn");
    if (canPlay == true) {
        canPlay = false;
        btn.innerHTML = "Audio OFF";
    }
    else {
        canPlay = true;
        btn.innerHTML = "Audio ON";
    }
}

function playSound(audioFile) {
    if (canPlay == true) {
        let doSound = new Audio(`audio/${audioFile}.mp3`);
        doSound.play();
    }
}

function playMusic(audioFile) {
    let doSound = new Audio(`music/${audioFile}.mp3`);
    doSound.play();
}


/* POP TRANSITION
arg1: element id: document.getElement... 
arg2: speed: 0.1-0.9
arg3: duration: 250-2000 */
function popTransition(element, speed, duration) {
    element.style.transition = `${speed}s`;
    element.style.transform = "scale(1.03)";
    element.style.color = "Red";
    setTimeout(function() {
        element.style.transform = "scale(1.0)";
        element.style.color = "Black";
    }, duration);
}



/* ELEMENT FADE IN / OUT TRANSITION 
arg1: true/false: fadein/out 
arg2: element id: document.getElement... 
arg3: speed: 10-50 
opacityTransition(true, document.getElement... , 30) */
function opacityTransition(makeVisible, e, speed) {
    //console.log(makeVisible, e);
    let opacityAnimation;
    let opacity;
    if (makeVisible == true) {
        e.style.display = "Block";
        e.style.opacity = 0.0;
        opacity = parseInt(e.style.opacity);
        opacityAnimation = setInterval(function () {
            if (opacity < 1.0) {
                opacity += .1;
            }
            else {
                clearInterval(opacityAnimation); 
            }
            e.style.opacity = opacity;
        }, speed);
    }
    else {
        e.style.opacity = 1.0;
        opacity = parseInt(e.style.opacity);
        opacityAnimation = setInterval(function () {
            if (opacity > 0) {
                opacity -= .1;
            }
            else {
                e.style.display = "None";
                clearInterval(opacityAnimation); 
            }
            e.style.opacity = opacity;
        }, speed);
    } 
}
