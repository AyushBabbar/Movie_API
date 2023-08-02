const movies = require("../models/movie");


exports.getAllMovies = async (req, res) => {
  try {
    const movieList = await movies.find();
    //If no movies in the database
    if (movieList.length === 0) {
      return res
        .status(200)
        .json({ message: "No movies in the database" });
    }
    return res
      .status(200)
      .json({ success: true, movies: movieList });
  }
  catch (err) {
    console.error('Error geting MovieList:', err);
    return res
      .status(500)
      .json({ success: false, error: 'An error occurred while getting the movie list.' });
  }
};