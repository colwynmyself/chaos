import 'whatwg-fetch'

function request(url, opts) {
    const options = Object.assign({}, opts, {
        credentials: 'include',
    })
    if (!options.method) options.method = 'GET'

    return fetch(url, options)
        .then(res => res.json())
}

export {
    request,
}
