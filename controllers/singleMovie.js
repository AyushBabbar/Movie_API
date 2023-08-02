const movies = require("../models/movie");


exports.getMovieRating = async (req, res) => {
  try {
    const id = req.params.id;
    const movieData = await movies.findOne({ _id: id }, { title: 1, avg_rating: 1, rating_count: 1 });

    //check correctness of provided id
    if (!movieData) {
      return res
        .status(404)
        .json({ message: "No movie have the given id" });
    }

    //Check if the curr movie has ratings from user or not
    if (movieData.rating_count === 0) {
      return res
        .status(200)
        .json({ success: true, message: "This movie has no review" });
    }
    return res
      .status(200)
      .json({ success: true, movie_rating: movieData });
  }
  catch (err) {
    console.error('Error geting Movie:', err);
    return res
      .status(500)
      .json({ success: false, error: 'An error occurred while getting the movie rating.' });
  }
};


exports.addRating = async (req, res) => {
  try {
    const id = req.params.id;
    const movieData = await movies.findById(id);

    //check correctness of id provided
    if (!movieData) {
      return res
        .status(404)
        .json({ message: "No movies match the given id" });

    }

    //valid rating value is between 1 and 5
    const inputRating = req.body.rating;
    if (inputRating > 5 || inputRating < 1) {
      return res
        .status(400)
        .json({ message: "Enter a valid rating" })
    }

    //logic to add curr rating and update the rating and user_count
    const currMovieRating = parseFloat(movieData.avg_rating);
    const currUserRated = parseInt(movieData.rating_count);
    const updatedUserRated = currUserRated + 1;
    const updatedRating =
      (currMovieRating * currUserRated + inputRating) / updatedUserRated;

    movieData.avg_rating = updatedRating;
    movieData.rating_count = updatedUserRated;
    await movieData.save();
    return res
      .status(204);

  }
  catch (err) {
    console.error('Error adding rating:', err);
    return res
      .status(500)
      .json({ success: false, error: 'An error occurred while adding the rating.' });
  }
};