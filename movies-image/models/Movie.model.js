const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const movieSchema = new Schema({
  title: String,
  description: String,
  imageUrl: String
});

module.exports = model('Movie', movieSchema);