const express = require("express");
const router = express.Router();
const signupController = require("../controllers/signup");
const app = express();

router.post("/", signupController.signup);

module.exports = router;


