const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const login = async (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  //check if email and password are provided
  if (
    !email ||
    !password
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Missing Parameters" });
  }
  try {
    const userInDB = await User.findOne({ email });

    //check if user is presentin db or not
    if (!userInDB) {
      return res
        .status(400)
        .json({ success: false, message: "Email not registered" })
    }

    //check correctness of password
    const correctPassword = await bcrypt.compare(password, userInDB.password);
    if (!correctPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Password Incorrect" })

    }

    //issue JWT
    const token = jwt.sign({ id: userInDB._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '10m'
    })
    return res
      .status(200)
      .json({ success: true, message: "Login Successful. JWT token valid for 10minutes", JWTToken: token });

  } catch (err) {
    console.error('Error loging in:', err);
    return res
      .status(500)
      .json({ success: false, error: 'An error occurred while login.' });
  }
};

module.exports = {
  login: login
}