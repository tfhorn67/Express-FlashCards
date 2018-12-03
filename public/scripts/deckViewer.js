'use-strict';

/*
To be used on userDecks.pug. Should receive the user's deck information from
the Pug template, iterate over it and render a list of decks from which the user
can choose a particular deck to view.
*/

document.addEventListener('DOMContentLoaded', () => {
    const listDiv = document.getElementById('listContainer');
    userDecks = JSON.parse(userDecks);
    //if user has decks, display list of names/links to their decks
    if (userDecks.length > 0) {
        for (let i = 0; i < userDecks.length; i++) {
            listDiv.innerHTML +=
                `<a href="/userDecks/${userDecks[i]._id}" class="list-group-item list-group-item-action">
                    ${userDecks[i].deckName}
                </a>`;
        }
    }
    else {
        listDiv.innerHTML += `<p>You don't have any decks right now!</p>`;
    }
});
