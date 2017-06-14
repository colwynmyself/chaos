const GithubStrategy = require('passport-github').Strategy

module.exports = (Debug, app, passport, db, credentials) => {
    const debug = Debug('auth:passport')
    debug('initializing passport authentication')

    passport.use(new GithubStrategy({
        clientID: credentials.github.clientID,
        clientSecret: credentials.github.clientSecret,
        callbackURL: 'http://localhost:3000/login/github/callback',
    }, async (accessToken, refreshToken, profile, done) => {
        const json = profile._json
        const user = await db.User.create({
            id: json.id,
            name: json.login,
        })

        if (!user) {
            debug('failed to create user')
            return done('Failed to create user')
        }

        debug(`User logged in. Profile: ${user.name} (${user.id})`)
        return done(null, user)
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
