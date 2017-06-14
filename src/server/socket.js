module.exports = (Debug, io, db) => {
    const debug = Debug('socket')

    debug('initializing socket.io')
    const userList = new db.UserList()

    io.on('connection', socket => {
        debug('socket.io connection established')

        // Events
        socket.on('join', data => {
            userList.addUser(data)
            io.emit('listUsers', userList.listAll())
        })

        userList.on('addUser', user => {
            io.emit('addUser', user)
        })
    })
}
