import 'whatwg-fetch'
import io from 'socket.io-client'

function createSocket(path = window.location.pathname, connect, disconnect) {
    const socket = io(path)

    socket.on('connect', () => {
        connect(socket)
    })
    socket.on('disconnect', disconnect)

    return socket
}

function request(url, opts) {
    const options = Object.assign({}, opts, {
        credentials: 'include',
    })
    if (!options.method) options.method = 'GET'

    return fetch(url, options)
        .then(res => res.json())
}

export {
    createSocket,
    request,
}
