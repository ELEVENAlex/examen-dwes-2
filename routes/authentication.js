const express = require('express');
const passport = require('passport');
const router = express.Router();

const pool = require('../database')


router.get('/signup', (req, res) => {
    res.render('userViews/signup')
})

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/fotos',
    failureRedirect: '/signup'
}))

module.exports = router