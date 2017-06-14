const redis = require('redis')
const uuid = require('uuid')

module.exports = Debug => {
    const debug = Debug('persistence:database')
    const redisClient = redis.createClient()

    // Redis event logging
    redisClient.on('warning', warning => {
        debug('redis warning', warning)
    })
    redisClient.on('ready', () => {
        debug('redis ready')
    })
    redisClient.on('reconnecting', (delay, attempt) => {
        debug(`redis connection reconnecting. delay: ${delay}, attempt: ${attempt}`)
    })
    redisClient.on('error', error => {
        debug('redis error', error)
    })

    class User {
        constructor(data) {
            this.id = uuid.v4()
            this.data = data
        }
    }

    class UserList {
        constructor() {
            this.id = uuid.v4()
            this.users = []
            this.observers = []
        }

        addUser(data) {
            const user = new User(data)
            this.users.push(user)

            this.observers.filter(o => o.event === 'addUser').forEach(o => {
                o.callback(user)
            })
        }

        listAll() {
            return this.users
        }

        on(event, callback) {
            this.observers.push({
                event,
                callback,
            })
        }
    }

    return {
        User,
        UserList,
    }
}
