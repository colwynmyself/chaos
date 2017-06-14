const GithubStrategy = require('passport-github').Strategy

module.exports = (Debug, app, passport, credentials) => {
    const debug = Debug('auth:passport')
    debug('initializing passport authentication')

    passport.use(new GithubStrategy({
        clientID: credentials.github.clientID,
        clientSecret: credentials.github.clientSecret,
        callbackURL: 'http://localhost:3000/login/github/callback',
    }, (accessToken, refreshToken, profile, done) => {
        debug(profile._json)
        return done(null, profile._json)
    }))

    passport.serializeUser((user, cb) => {
        cb(null, user)
    })

    passport.deserializeUser((obj, cb) => {
        cb(null, obj)
    })

    app.use(passport.initialize())
    app.use(passport.session())
}
