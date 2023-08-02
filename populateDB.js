const axios = require('axios');
const movieDB = require('./models/movie');
const mongoose = require("mongoose");
require('dotenv').config()

//setting up url with API_KEY
let apiUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=';
apiUrl += process.env.API_KEY

//conecting database
mongoose.connect(process.env.DB_PORT, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('DB connection successful!'))
  .catch((err) => {
    console.log('DB connection NOT successful!');
    console.log(err);
  });


async function fetchData() {
  try {
    const response = await axios.get(apiUrl);
    const moviesList = response.data.results;

    //iterate over every movie recieved from api
    moviesList.forEach(async (currMovie) => {
      try {

        //create new document for every movie
        const newmovie = new movieDB({
          title: currMovie.title,
          language: currMovie.original_language,
          release_date: currMovie.release_date,
          popularity: currMovie.popularity,
          is_adult: currMovie.adult,
          overview: currMovie.overview
        });
        const savedMovie = await newmovie.save();
        console.log(`Saved ${savedMovie.title} \n`);
      } catch (err) {
        console.error('Error saving movie:', err);
      }
    });
  } catch (err) {
    console.error('Error fetching data from API or saving to MongoDB:', err);
  }
}

fetchData();