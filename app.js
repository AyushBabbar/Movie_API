const express = require("express");
const movie = require("./route/movie");
const login = require("./route/login")
const signup = require("./route/signup")
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use('/login', login);
app.use('/signup', signup);
app.use('/', movie);

module.exports = app;