module.exports = (Debug, app, passport) => {
    const debug = Debug('routes')
    debug('initializing routes')

    app.get('/', (req, res, next) => {
        if (req.user) {
            res.redirect('/chaos')
        } else {
            next()
        }
    })

    app.get('/login', (req, res) => {
        res.render('login')
    })

    app.get('/login/github', passport.authenticate('github'))

    app.get('/login/github/callback', passport.authenticate('github', {
        failureRedirect: '/login',
    }), (req, res) => {
        res.redirect('/chaos')
    })

    // Logged in users only
    app.use((req, res, next) => {
        if (req.user) {
            next()
        } else {
            res.redirect('/login')
        }
    })

    app.get('/chaos', (req, res) => {
        res.render('chaos')
    })

    app.use(() => {
        throw new Error('Page not found')
    })

    // Error handling
    app.use((err, req, res, next) => {
        res.status(err.status || 404)
        res.render('404')
    })
}
