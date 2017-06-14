import React from 'react'
import { render } from 'react-dom'
import io from 'socket.io-client'

import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'

import UserDrawer from './components/UserDrawer.jsx'

injectTapEventPlugin()

class App extends React.Component {
    constructor() {
        super()

        this.state = {
            users: [],
        }

        this.joinSession = () => {
            if (!this.state.socket) return

            this.state.socket.emit('join', {
                name: this.state.name,
            })
        }

        this.handleChange = (field, value) => {
            if (!field) return

            this.setState({
                [field]: value,
            })
        }

        const socket = io(window.location.pathname)

        socket.on('connect', () => {
            this.setState({ socket })
        })
        socket.on('disconnect', () => {
            this.setState({ socket: null })
        })

        socket.on('listUsers', users => {
            this.setState({
                users,
            })
        })
        socket.on('addUser', user => {
            // This is a fault of noise coming over the socket connection. When this user joins the server emits listUsers and addUser events, duplicating our
            // user. I'll have to add a better observable model later. Open issue: https://github.com/colwynmyself/socket.io-apps/issues/2
            if (this.state.users.some(u => u.id === user.id)) return

            this.setState(lastState => Object.assign({}, lastState, {
                users: lastState.users.concat(user),
            }))
        })
    }
    render() {
        return (<MuiThemeProvider>
            <div>
                <AppBar title="Continuous Integration and Delivery" />
                <UserDrawer handleChange={this.handleChange} joinSession={this.joinSession} users={this.state.users} />
            </div>
        </MuiThemeProvider>)
    }
}

render(<App />, document.getElementById('app'))
