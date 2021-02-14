const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie.model');
const fileUpload = require('../configs/cloudinary');

router.get('/movies/create', (req, res) => {
  res.render('movie-create');
});

router.post('/movies/create', fileUpload.single('image'), (req, res) => {
  const { title, description } = req.body;
  const fileUrlOnCloudinary = req.file.path;
  
  Movie.create({
    title,
    description,
    imageUrl: fileUrlOnCloudinary
  }).then(() => {
    res.redirect('/');
  });
});

router.get('/movies', (req, res) => {
  Movie.find()
    .then((moviesFromDB) => {
      res.render('movies-list', { movies: moviesFromDB});
    });
});

module.exports = router;