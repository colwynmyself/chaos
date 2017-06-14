module.exports = (Debug, io, db) => {
    const debug = Debug('socket')

    debug('initializing socket.io')

    io.on('connection', socket => {
        debug('socket.io connection established')

        // Events
    })
}
