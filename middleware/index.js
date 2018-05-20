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

/*
Use on routes user shouldn't access if already logged in. Redirect to /profile
if logged in user tries to access routes like /register or /login
*/
const loggedIn = function (req, res, next) {
    if (req.session && req.session.userId) {
        return res.redirect('/profile');
    }
    return next();
};

module.exports.requiresLoggedIn = requiresLoggedIn;
module.exports.loggedIn = loggedIn;
