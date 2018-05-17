'use-strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the model for our user info to be stored on signup
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,  //make sure we don't allow re-use of emails
        trim: true //trim off leading/trailing whitespace
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    }
});

//instantiate the UserSchema model
const User = mongoose.model('User', UserSchema);

//export so we can use it all over the place
module.exports = User;
