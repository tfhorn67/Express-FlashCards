'use-strict';

//require all the things
const express = require('express'); //Because express is nifty and nice
const app = express(); //this is brevity. It makes it shorter. It saves time and keystrokes.
const bodyParser = require('body-parser'); //For parsing incoming req bodies. Access w/ req.body
const mongoose = require('mongoose'); //For tearing it up w/ MongoDB connections
const userSessions = require('express-sessions'); //For quick and easy session objects
const mongoSeshSaver = require('connect-mongo')(userSesssions); //To use mongo for session storage instead of server RAM
