module.exports = (Debug, redis) => {
    const debug = Debug('persistence:redis')
    const client = redis.createClient()

    // Redis event logging
    client.on('warning', warning => {
        debug('redis warning', warning)
    })
    client.on('ready', () => {
        debug('redis ready')
    })
    client.on('reconnecting', (delay, attempt) => {
        debug(`redis connection reconnecting. delay: ${delay}, attempt: ${attempt}`)
    })
    client.on('error', error => {
        debug('redis error', error)
    })

    class Table {
        constructor(table, Model) {
            this.Model = Model
            this.table = table
        }

        async create(data) {
            try {
                const model = new this.Model(data)

                await client.hmset(this.table, model.id, model.jsonString)
                return data
            } catch (e) {
                debug(`Failed to create on ${this.table}`)
                return false
            }
        }

        async findAll() {
            try {
                const hashData = await client.hgetall(this.table)
                const data = []

                for (const key in hashData) {
                    const string = hashData[key]
                    data.push(JSON.parse(string))
                }

                return data
            } catch (e) {
                debug(`Failed to findAll on ${this.table}`)
                return false
            }
        }
    }

    class UserModel {
        constructor(data) {
            this._id = data.id
            this._name = data.name
        }

        static get tableName() { return 'Users' }

        get id() { return this._id }

        get raw() {
            return {
                id: this._id,
                name: this._name,
            }
        }

        get jsonString() {
            return JSON.stringify(this.raw)
        }
    }

    return {
        User: new Table(UserModel.tableName, UserModel),
    }
}
