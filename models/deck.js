'use-strict';

const mongoose = require('mongoose');

//Define the shape of a Card, to be nested into the Deck
const CardSchema = new mongoose.Schema({
    cardNumber: {
        type: Number,
        required: true,
        trim: true
    },
    cardFront: {
        type: String,
        required: true,
        trim: true
    },
    cardBack: {
        type: String,
        required: true,
        trim: true
    }
});

//Define the shape of the decks
const DeckSchema = new mongoose.Schema({
    deckName: {
        type: String,
        required: true,
        trim: true
    },
    deckCards: [CardSchema],
    deckAuthor: {type: String, required: true},
});

//instantiate the DeckSchema into a model
const Deck = mongoose.model('Deck', DeckSchema);

//make it available elsewhere
module.exports = Deck;
