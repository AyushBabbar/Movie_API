const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const user = require("../models/user");
require('dotenv').config()

exports.authenticate = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers["authorization"];
    if (authHeader &&
      authHeader.split(' ')[0] === 'Bearer'
    ) {
      token = authHeader.split(' ')[1];
    }
    //checking if JWT token is provided(in correct format) or not
    if (!token) {
      return res.status(401).json({ success: false, message: "No token recieved." })
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY)

    //If the id of JWT token matches with one of the user from database or not
    const checkUser = await user.findById(decoded.id);
    if (!checkUser) {
      return res
        .status(401)
        .json({ message: "JWT token not valid." })
    }
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: "Authentication Failed" });
  }
  next();
}