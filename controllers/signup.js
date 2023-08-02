const user = require("../models/user");
const bcrypt = require("bcrypt");
const express = require('express');
const jwt = require("jsonwebtoken");
require('dotenv').config()
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const signup = async (req, res) => {
  const email = req.body.email;
  let password = req.body.password;
  //Check if email and password are provided
  if (
    !email ||
    !password
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Missing Parameters" });
  }

  //check if the email is not already registered
  const isUserExist = await user.findOne({ email: email });
  if (isUserExist) {
    return res
      .status(400)
      .json({ success: false, message: "Email Already Registered. Please Login to continue" });
  }
  try {
    password = await bcrypt.hash(password, 8);
    let newUser = new user({
      email: email,
      password: password
    });
    await newUser.save();

    //create JWT
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '10m'
    });
    return res
      .status(201)
      .json({ success: true, message: "User signup Successful. JWT token valid for 10minutes", JWTToken: token });

  } catch (err) {
    console.error('Error adding user:', err);
    return res
      .status(500)
      .json({ success: false, error: 'An error occurred while adding the user.' });
  }
};

module.exports = {
  signup: signup
}