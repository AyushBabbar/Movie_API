const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String
    },
    language: {
      type: String
    },
    release_date: {
      type: String
    },
    popularity: {
      type: Number
    },
    avg_rating: {
      type: Number,
      default: 0
    },
    rating_count: {
      type: Number,
      default: 0
    },
    is_adult: {
      type: Boolean
    },
    overview: {
      type: String
    }
  }
);

module.exports = mongoose.model('Movie', movieSchema);

