const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login");
const app = express();

router.post("/", loginController.login);

module.exports = router;


