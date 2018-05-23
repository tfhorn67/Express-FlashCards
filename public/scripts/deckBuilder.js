/*
Script for building new deck data into a correctly structured object and then
posting it to the server so the backend can do its job.

//boilerplate XMLHttpRequest...

var xhr = new XMLHttpRequest();
xhr.open("POST", '/createDeck', true);

//Send the proper header information along with the request
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

xhr.onreadystatechange = function() {//Call a function when the state changes.
    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        // Request finished. Do processing here.
    }
}

xhr.send(JSON.stringify(deckData-Object));
*/

document.addEventListener('DOMContentLoaded', () => {
    const nameForm = document.getElementById('nameForm');
    const nameInput = document.getElementById('nameInput');
    const cardForm = document.getElementById('cardForm');
    const cardFront = document.getElementById('cardFront');
    const cardBack = document.getElementById('cardBack');
    const deckForm = document.getElementById('deckForm');

    let cardCounter = 0;

    let deckData = {
        deckName: '',
        deckCards: []
    };

    nameForm.addEventListener('submit', (event) => {
        event.preventDefault();
        //Get deck name from user and set it in deckData
        deckData.deckName = nameInput.value;
        console.log(deckData);
    });

    cardForm.addEventListener('submit', (event) => {
        event.preventDefault();
        //Get card data from user and set it to deckData.deckCards[]
        const card = {
            cardNumber: cardCounter,
            cardFront: cardFront.value,
            cardBack: cardBack.value
        }
        deckData.deckCards.push(card);
        cardCounter++;
        console.log(deckData);
    });

    deckForm.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log('deckForm submit button clicked');
        //Stringify the deckData object, send a POST req to /createDeck with deckData as the body
        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/createDeck', true);

        //Send the proper header information along with the request
        xhr.setRequestHeader("Content-type", "application/json");

        xhr.onreadystatechange = function() {//Call a function when the state changes.
            if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                console.log('POST request success!');
            }
        }

        xhr.send(JSON.stringify(deckData));
        console.log('I think this worked...');
    });
});
