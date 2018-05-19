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

//A method for authenticating login credentials against the users database
//Takes email and password from login POST req as arguments
UserSchema.statics.authenticateUser = function(email, password, callback) {
    User.findOne({ email: email })
        .exec(function(error, user) {
            //handle server/db errors
            if (error) {
                return callback(error);
            } else if (!user) { //handle fruitless lookups
                const error = new Error('User not found.');
                error.status = 401;
                return next(error);
            }
            //if we're this far, we must have found the user, so authenticate...
            bcrypt.compare(password, user.password, function(error, result) {
                if (result === true) {
                    //if match, return null in place of error and supply the user's info from the db
                    return callback(null, user);
                } else {
                    return callback();
                }
            });
        });
};

//pre 'save' hook to hash password before writing to the db
UserSchema.pre('save', function(next) {
    const user = this;
    //hash the password
    bcrypt.hash(user.password, 10, function(error, hash) {
        if (error) {
            return next(error);
        }
        //overwrite the plaintext pass with the new hash
        user.password = hash;
        next();
    });
});

//instantiate the UserSchema model
const User = mongoose.model('User', UserSchema);

//export so we can use it all over the place
module.exports = User;
