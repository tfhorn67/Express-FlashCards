'use-strict';

//Primarily intended for router middleware functions

/*
Use on routes requiring authorization. Throws error when user tries to view an
auth-restricted page without being logged in.
*/
const requiresLoggedIn = function (req, res, next) {
    if (!req.session || !req.session.userId) {
        const error = new Error(`You'll need to be logged in for that, friend.`);
        error.status = 401;
        return next(error);
    } else {
        return next();
    }
};

module.exports.requiresLoggedIn = requiresLoggedIn;
