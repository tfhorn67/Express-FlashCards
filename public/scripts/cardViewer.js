'use-strict';

document.addEventListener('DOMContentLoaded', () => {
    const deckDiv = document.getElementById('deckContainer');
    userDeck = JSON.parse(userDeck);
    //if user has decks, display list of names/links to their decks
    if (userDeck.length > 0) {
        for (let i = 0; i < userDeck[0].deckCards.length; i++) {
            deckDiv.innerHTML +=
                `<p>
                    ${userDeck[0].deckCards[i].cardFront} / ${userDeck[0].deckCards[i].cardBack}
                </p>`;
        }
    }
    else {
        deckDiv.innerHTML += `<p>You don't have any cards in this deck right now!</p>`;
    }
});
