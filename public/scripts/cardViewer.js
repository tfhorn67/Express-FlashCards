'use-strict';

document.addEventListener('DOMContentLoaded', () => {
    userDeck = JSON.parse(userDeck)[0];
    const deckDiv = document.getElementById('deckContainer');
    const cardText = document.getElementById('cardText');
    const nextBtn = document.getElementById('next');
    const prevBtn = document.getElementById('previous');
    const flipCard = document.getElementById('flip');

    //default: display card1.cardFront
    cardText.innerHTML = userDeck.deckCards[0].cardFront;
    let cardNumber = 0;

    next.addEventListener('click', () => {
        cardNumber++;
        cardText.innerHTML = userDeck.deckCards[cardNumber].cardFront;
        console.log('next clicked!');
    });

    previous.addEventListener('click', () => {
        cardNumber--;
        cardText.innerHTML = userDeck.deckCards[cardNumber].cardFront;
        console.log('previous clicked!');
    });

    flipCard.addEventListener('click', () => {
        if (cardText.innerHTML === userDeck.deckCards[cardNumber].cardFront) {
            cardText.innerHTML = userDeck.deckCards[cardNumber].cardBack;
        } else if (cardText.innerHTML === userDeck.deckCards[cardNumber].cardBack) {
            cardText.innerHTML = userDeck.deckCards[cardNumber].cardFront;
        } else {
            cardText.innerHTML = "Oh No! Something went wrong with the deck.;";
        }
        console.log('flip card clicked!');
    });

    // //if user has decks, display list of names/links to their decks
    // if (userDeck.deckCards) {
    //     for (let i = 0; i < userDeck.deckCards.length; i++) {
    //         deckDiv.innerHTML +=
    //             `<p>
    //                 ${userDeck.deckCards[i].cardFront} / ${userDeck.deckCards[i].cardBack}
    //             </p>`;
    //     }
    // }
    // else {
    //     deckDiv.innerHTML += `<p>You don't have any cards in this deck right now!</p>`;
    // }
});

/*
currently justs dumps the whole deck as a series of p tags a la a bunch of this noise:
<p>${card1.front} / ${card1.back}</p>
<p>${card2.front} / ${card2.back}</p>
 .
 .
 .
 <p>${cardnth.front} / ${cardnth.back}</p>

INSTEAD:
1. load the whole deck object into the DOM
2. render only the side of the current card being viewed.
3. when the user "flips" card, render the other side.
4. when the user "switches" to next/previous, render front of said card
5. maybe throw in a counter to help user track position in deck "card 12 of 37"
 */
