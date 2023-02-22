const passport = require('passport');
const localStrategy = require('passport-local').Strategy

const pool = require('../database')

passport.use('local.signup', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {

    const { email } = req.body
    const newUser = {
        username,
        password,
        email
    }

    const [ result ] = await pool.query('INSERT INTO usuarios SET ?', [newUser])
    newUser.id = result.insertId
    return done(null, newUser)
}))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    const [ row ] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id])
    done(null, row[0])
})