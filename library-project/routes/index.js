const express = require('express');
const router  = express.Router();

function requireLogin(req, res, next) {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect('/login');
  }
}

function checkRoles(roles) {
   return function(req, res, next) {
     if (req.session.currentUser &&
       roles.includes(req.session.currentUser.role)) {
       next();
     } else {
       res.redirect('/login');
     }
   };
 }

/* GET home page */
router.get('/', (req, res) => {
  res.render('index', {user: req.session.currentUser});
});

router.get('/private', checkRoles(['Admin', 'Super']), (req, res) => {
  res.render('private');
});


module.exports = router;