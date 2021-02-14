const express = require('express');
const router  = express.Router();
const Book = require('../models/Book.model');
const Author = require('../models/Author.model');
const axios = require('axios');

//Route that will be activated
//when the user types on the browser
// http://localhost:3000/books
router.get('/books', (req, res) => {
  //Find all books and pass them to the view
  axios.get('http://localhost:8000/char').then((response) => {

    //...
    Book.find().then((allBooksFromDB) => {
      res.render('books-list', { books: allBooksFromDB });
    });
  });
  
});

//Route that will be activated
//when the user types on the browser
// http://localhost:3000/books/create
router.get('/books/create', (req, res) => {
  //Finding all the authors and send them to the view
  Author.find()
    .then((authorsFromDB) => {
      res.render('book-create', { authors: authorsFromDB});
    });
});

//Route that will be activated
//when the create form gets submitted
// http://localhost:3000/books/create - POST
router.post('/books/create', (req, res) => {
  const { title, author, description, rating } = req.body; //POST req
  console.log('title', title);
  Book.create({ title, author, description, rating })
    .then(() => {
      //Go back to books list
      res.redirect('/books');
  });
});

//Route that will be activated
//when the delete form gets submitted
// http://localhost:3000/books/123/delete - POST
router.post('/books/:bookId/delete', (req, res) => {
  const bookdId = req.params.bookId;
  Book.findByIdAndDelete(bookdId)
    .then(() => {
      res.redirect('/books');
    });
});


//Route that will be activated
//when the user types on the browser
// http://localhost:3000/books/23r423r23/edit
router.get('/books/:bookId/edit', (req, res) => {
  const bookId = req.params.bookId;
  Book.findById(bookId)
    .populate('author')
    .then((theBookFromDB) => {
    Author.find()
      .then((authorsFromDB) => {
         //Server-side rendering
        res.render('book-edit', 
        { 
          book: theBookFromDB,
          authors: authorsFromDB
        });
      });
  });
});


router.post('/books/:bookId/edit', (req, res) => {
  const bookId = req.params.bookId;
  const { title, author, description, rating} = req.body;
  Book.findByIdAndUpdate(bookId, {
    title,
    author,
    description,
    rating
  }).then(() => {
    res.redirect(`/books/${bookId}`);
  });
});


//Route that will be activated
//when the user types on the browser
// http://localhost:3000/books/23r423r23
router.get('/books/:bookId', async (req, res) => {
  const bookId = req.params.bookId;
  let theBookFromDB = await Book.findById(bookId)
    .populate('author');
    //Server-side rendering
    res.render('book-details', { book: theBookFromDB});
});


router.post('/reviews/:bookId/add', (req, res) => {
  const bookId = req.params.bookId;
  const { user, comment } = req.body;
  //Update the book with the user and comments
  //inside the review embed document
  Book.findByIdAndUpdate(bookId, {
    $push: { reviews: { user, comment }}
  }).then(() => {
    res.redirect(`/books/${bookId}`);
  });
});

router.post('/books/:bookId/reviews/:reviewId/delete', (req, res) => {
  const reviewId = req.params.reviewId;  
  const bookId = req.params.bookId;  
  Book.findByIdAndUpdate(bookId, {
    $pull: { reviews: { _id: reviewId }}
  }).then(() => {
    res.redirect(`/books/${bookId}`);
  });
});

module.exports = router;