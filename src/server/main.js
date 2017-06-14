// Base server requirements
const express = require('express')
const chalk = require('chalk')
const path = require('path')
const socketio = require('socket.io')
const http = require('http')
const passport = require('passport')
const session = require('express-session')

// Server constructors
const Handlebars = require('express-handlebars')
const DebugPackage = require('debug')
const RedisStore = require('connect-redis')(session)

const credentials = require(path.resolve(__dirname, '..', '..', 'credentials.js'))

// Wrapping debug in our own handler to append date on all statements
const Debug = name => {
    const d = DebugPackage(`chaos:${name}`)
    return statement => {
        const date = new Date()
        d(date, statement)
    }
}

// Variables to be used in application
const debug = Debug('main')
const port = process.env.PORT || 3000

// App initialization
const app = express()
const server = http.createServer(app)
const io = socketio.listen(server)

// Persistence layer
const database = require(path.resolve(__dirname, 'persistence', 'Database.js'))(Debug)

// Session
if (app.get('env') === 'production') {
    app.set('trust proxy', 1)
    credentials.session.cookie.secure = true
}
credentials.session.store = new RedisStore()

app.use(session(credentials.session))

// Handlebars and public files
app.engine('handlebars', Handlebars({
    defaultLayout: 'main',
    layoutsDir: path.resolve(__dirname, 'handlebars', 'layouts'),
    partialsDir: path.resolve(__dirname, 'handlebars', 'partials'),
}))
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, 'handlebars', 'views'))
app.use(express.static(path.resolve(__dirname, '..', '..', 'public')))

// Authentication
require(path.resolve(__dirname, 'auth', 'passport.js'))(Debug, app, passport, credentials)

// Require server files
require(path.resolve(__dirname, 'routes.js'))(Debug, app, passport)
require(path.resolve(__dirname, 'socket.js'))(Debug, io, database)

// Start application
server.listen(port, () => {
    debug(`${chalk.blue.bold('Chaos')} running on port ${chalk.red.bold(port)}`)
})
