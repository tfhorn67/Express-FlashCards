'use-strict';

document.addEventListener('DOMContentLoaded', () => {
    userDeck = JSON.parse(userDeck)[0];
    const deckDiv = document.getElementById('deckContainer');
    const cardText = document.getElementById('cardText');
    const nextBtn = document.getElementById('next');
    const prevBtn = document.getElementById('previous');
    const flipCard = document.getElementById('flip');

    //default: display card[0].cardFront
    const card = userDeck.deckCards;
    let number = 0;
    cardText.innerHTML = card[0].cardFront;

    next.addEventListener('click', () => {
        if (number < card.length-1) {
            number++;
            cardText.innerHTML = card[number].cardFront;
        } else {
            number = 0;
            cardText.innerHTML = card[number].cardFront;
        }
    });

    previous.addEventListener('click', () => {
        if (number > 0) {
            number--;
            cardText.innerHTML = card[number].cardFront;
        } else {
            number = card.length-1;
            cardText.innerHTML = card[number].cardFront;
        }
    });

    flipCard.addEventListener('click', () => {
        if (cardText.innerHTML === card[number].cardFront) {
            cardText.innerHTML = card[number].cardBack;
        } else if (cardText.innerHTML === card[number].cardBack) {
            cardText.innerHTML = card[number].cardFront;
        } else {
            cardText.innerHTML = "Oh No! Something went wrong with the deck.;";
        }
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
