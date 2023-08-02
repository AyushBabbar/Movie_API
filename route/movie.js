const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authentication");
const allController = require("../controllers/allMovies");
const singleController = require("../controllers/singleMovie");
const app = express();

router.route("/movie_rating/:id")
  .get(singleController.getMovieRating)
  .patch(authenticate, singleController.addRating);


router.route("/movies")
  .get(authenticate, allController.getAllMovies)


module.exports = router;


